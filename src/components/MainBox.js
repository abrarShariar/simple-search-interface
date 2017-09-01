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


class MainBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputKey: "",
            isSearchFound: false,
            isSearchBtnClicked: false,
            searchResults: [],
            cartItems: [],
            cartBoxText: "You have no item in your cart",
            isShowLoader: false
        };

        this.getInputKey = this.getInputKey.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
    }

    getInputKey(e) {
        this.props.actions.setInputKey(e.target.value);
    }

    searchHandler() {
        let searchData = this.props.actions.getInputKey();
        // this.props.actions.fetchProducts(searchData.payload.key).then(() => {
        //     console.log(this.props.store.getState());
        // })

        this.setState({
            isSearchBtnClicked: true,
            isShowLoader: true,
            searchResults: []
        });

        if (_.isEmpty(searchData.payload.key)) {
            setTimeout(() => {
                this.setState({
                    isSearchFound: false,
                    searchResults: [],
                    isShowLoader: false
                })
            }, 2000)
        } else {
            HttpService.searchProduct(searchData.payload.key).then((response) => {
                if (response.status === 200 && response.statusText === "OK") {
                    if (response.data.hits.hits.length > 0 && response.data.hits.total !== 0) {
                        let searchResults = [];
                        _.each(response.data.hits.hits, (item) => {
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
                            this.setState({
                                isSearchFound: true,
                                searchResults: searchResults,
                                displayText: "",
                                isShowLoader: false
                            })
                        }, 2000)
                    } else {
                        setTimeout(() => {
                            this.setState({
                                isSearchFound: false,
                                searchResults: [],
                                isShowLoader: false
                            })
                        }, 2000)
                    }
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    //callback to pass from child component - ProductThumb
    getAddToCartEvent = (productData) => {
        let duplicateProduct = _.find(this.state.cartItems, (item) => {
            return item.id === productData.id;
        });
        if (!duplicateProduct) {
            productData['quantity'] = 1;
            this.state.cartItems.push(productData);
        } else {
            _.map(this.state.cartItems, (item, index) => {
                if (item.id === productData.id) {
                    item.quantity++;
                    this.state.cartItems[index] = item;
                }
            });
        }
        this.setState({
            cartItems: this.state.cartItems,
            cartBoxText: ""
        });
    }

    //callback to pass from child component - CartBox
    clearCartEvent = () => {
        this.setState({
            cartItems: [],
            cartBoxText: "You have no item in your cart"
        });
    }

    render() {
        return (
            <div className="MainBox">
                <div className="LeftGridFull">
                    <div className="ArrowBox">
                        <button>
                            <span className="glyphicon glyphicon-chevron-left"></span>
                        </button>
                        <button>
                            <span className="glyphicon glyphicon-chevron-right"></span>
                        </button>
                    </div>

                    <div className="LeftBox">
                        <div className="searchBox">
                            <div className="input-group">
                                <input type="text" className="form-control" onKeyUp={this.getInputKey}
                                       placeholder="Search..." name="search"/>
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
                                this.state.isSearchBtnClicked && this.state.isShowLoader ? <LoadingComponent/> : null
                            }
                        </div>
                        <div className="SearchResultContainer">
                            {
                                this.state.searchResults.map((item, index) => {
                                    return (
                                        <div className="ProductThumbContainer">
                                            <ProductThumb productData={item}
                                                          addToCartCallback={this.getAddToCartEvent}/>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div className="MainTextBox">
                            <p>
                                {this.state.isSearchBtnClicked && !this.state.isSearchFound && !this.state.isShowLoader ? "Sorry, the thing doesn't seem to exist. Try anything else ?" : null}
                            </p>

                            <p>
                                {!this.state.isSearchBtnClicked && !this.state.isShowLoader ? "What'll you buy today ?" : null}
                            </p>
                        </div>

                    </div>
                </div>
                <div className="RightBox">
                    <CartBox displayText={this.state.cartBoxText} cartItems={this.state.cartItems}
                             clearCartCallback={this.clearCartEvent}/>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        store: state.store
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainBox);