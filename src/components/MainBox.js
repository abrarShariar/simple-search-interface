import React, {Component} from 'react';
import CartBox from './CartBox';
import './MainBox.css';
import ProductThumb from './ProductThumb';
import LoadingComponent from './LoadingComponent';
import HttpService from '../HttpService';
import * as _ from 'underscore';
//react-redux stuffs
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/action';

let searchResults = [];
let currentTime = 0;
let totalHits = 0;
let currentQuery = "";
let isSearchBtnClicked = false;
let isShowLoader = false;
let isSearchFound = false;
let cartItems = [];
let cartBoxText = "You have no item in your cart";


class MainBox extends React.Component {
    constructor(props) {
        super(props);

        isSearchFound = false;
        isSearchBtnClicked = false;
        // searchResults = [];
        cartItems = [];
        cartBoxText = "You have no item in your cart";
        isShowLoader = false;

        this.getInputKey = this.getInputKey.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
        this.goBackHandler = this.goBackHandler.bind(this);
        this.goForwardHandler = this.goForwardHandler.bind(this);
    }

    getInputKey(e) {
        // this.props.actions.setInputKey(e.target.value);
    }

    searchHandler() {
        totalHits++;
        currentTime++;
        searchResults = [];
        isSearchBtnClicked = true;
        isShowLoader = true;

        currentQuery = document.getElementById('search-input').value;
        if (_.isEmpty(currentQuery)) {
            isShowLoader = false;
            setTimeout(() => {
                isSearchFound = false;
                searchResults = [];
                isShowLoader = false;
                this.props.actions.toggleLoader();
            }, 2000)
        }
        else {
            this.props.actions.fetchProducts(currentQuery)
                .then((data) => {
                    let result = this.props.actions.receiveProducts(currentQuery, data.hits);
                    _.each(result.searchResults.hits, (item) => {
                        let product = {
                            id: item['_id'],
                            title: item._source['title'],
                            price: item._source['price'],
                            listPrice: item._source['listPrice'],
                            salePrice: item._source['salePrice'],
                            brand: item._source['brand'],
                            thumb: item._source['images'][0]
                        };
                        searchResults.push(product);
                    });
                    setTimeout(() => {
                        isSearchFound = true;
                        isShowLoader = false;
                        this.props.actions.saveSearchResults(currentQuery, searchResults, cartItems);
                    }, 2000)
                })
                .catch((err) => {
                    if (err) {
                        console.log("Promise error");
                    }
                });
        }
    }

    //callback to pass from child component - ProductThumb
    getAddToCartEvent = (productData) => {
        totalHits++;
        currentTime++;
        cartBoxText = "";

        this.props.actions.addToCart(productData);

        // cartItems = this.props.actions.getHistory(currentTime).payload.history.cartItems;

        let duplicateProduct = _.find(cartItems, (item) => {
            return item.id === productData.id;
        });
        if (!duplicateProduct) {
            productData['quantity'] = 1;
            cartItems.push(productData);
        } else {
            _.each(cartItems, (item, index) => {
                if (item.id === productData.id) {
                    item.quantity++;
                    cartItems[index] = item;
                }
            });
        }
        this.props.actions.toggleLoader();
        // this.props.actions.addToCart(currentQuery, searchResults, cartItems)
    }

    //callback to pass from child component - CartBox
    clearCartEvent = () => {
        cartBoxText = "You have no item in your cart";
        cartItems = [];
        this.props.actions.clearCart(currentTime);
    }

    //go back handler
    goBackHandler() {
        searchResults = [];
        currentTime--;
        if (currentTime < 0) {
            currentTime = 0;
        } else {
            searchResults = this.props.actions.getHistory(currentTime).payload.history.searchResults;
            currentQuery = this.props.actions.getHistory(currentTime).payload.history.searchQuery;
            cartItems = this.props.actions.getHistory(currentTime).payload.history.cartItems;
            document.getElementById("search-input").value = currentQuery;
        }

    }

    //go back handler
    goForwardHandler() {
        searchResults = [];
        currentTime++;
        if (currentTime > totalHits) {
            currentTime = totalHits;
        } else {
            searchResults = this.props.actions.getHistory(currentTime).payload.history.searchResults;
            currentQuery = this.props.actions.getHistory(currentTime).payload.history.searchQuery;
            cartItems = this.props.actions.getHistory(currentTime).payload.history.cartItems;
            document.getElementById("search-input").value = currentQuery;
        }

    }

    render() {
        return (
            <div className="MainBox">
                <div className="LeftGridFull">
                    <div className="ArrowBox">
                        <button onClick={this.goBackHandler}>
                            <span className="glyphicon glyphicon-chevron-left"></span>
                        </button>
                        <button onClick={this.goForwardHandler}>
                            <span className="glyphicon glyphicon-chevron-right"></span>
                        </button>
                    </div>
                    <div className="LeftBox">
                        <div className="searchBox">
                            <div className="input-group">
                                <input type="text" className="form-control" onKeyUp={this.getInputKey}
                                       placeholder="Search..." name="search" id="search-input"/>
                                <div className="input-group-btn">
                                    <button className="btn btn-success" type="button" onClick={this.searchHandler}>
                                        Search
                                    </button>
                                </div>
                            </div>
                            <br/>
                        </div>
                        <div className="LoadingBox">
                            {
                                isSearchBtnClicked && isShowLoader ? <LoadingComponent/> : null
                            }
                        </div>
                        <div className="SearchResultContainer">
                            {
                                searchResults.map((item) => {
                                    return (
                                        <div className="ProductThumbContainer">
                                            <ProductThumb
                                                productData={item}
                                                addToCartCallback={this.getAddToCartEvent}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="MainTextBox">
                            <p>
                                {isSearchBtnClicked && !isSearchFound && !isShowLoader ? "Sorry, the thing doesn't seem to exist. Try anything else ?" : null}
                            </p>
                            <p>
                                {currentTime === 0 ? "What'll you buy today ?" : null}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="RightBox">
                    <CartBox displayText={cartBoxText} cartItems={cartItems}
                             clearCartCallback={this.clearCartEvent}/>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        store: state,
        searchResults: {}
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainBox);