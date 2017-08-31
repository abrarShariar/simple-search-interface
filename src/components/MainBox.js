import React, {Component} from 'react';
import CartBox from './CartBox';
import './MainBox.css';
import ProductThumb from './ProductThumb';
import LoadingComponent from './LoadingComponent';
import HttpService from '../HttpService';
import * as _ from 'underscore';

//component to be displayed with the search box and search results
class MainBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputKey: "",
            isSearchFound: false,
            isSearchBtnClicked: false,
            displayText: "What'll you buy today ?",
            searchResults: [],
            cartItems: [],
            cartBoxText: "You have no item in your cart",
            isShowLoader: false
        };

        this.getInputKey = this.getInputKey.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
    }

    getInputKey(e) {
        this.setState({
            inputKey: e.target.value
        });
    }

    searchHandler() {

        this.setState({
            isSearchBtnClicked: true,
            isShowLoader: true,
            searchResults: []
        });

        if (_.isEmpty(this.state.inputKey)) {
            setTimeout(() => {
                this.setState({
                    isSearchFound: false,
                    searchResults: [],
                    displayText: "Sorry, the thing doesn't seem to exist. Try anything else ?",
                    isShowLoader: false
                })
            }, 2000)
        } else {
            HttpService.searchProduct(this.state.inputKey).then((response) => {
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
                                thumb: item._source['images'][0],
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
                                displayText: "Sorry, the thing doesn't seem to exist. Try anything else ?",
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
        this.state.cartItems.push(productData);
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
                                this.state.isSearchBtnClicked && this.state.isShowLoader ? <LoadingComponent isSearchBtnClicked={this.state.isSearchBtnClicked}/> : null
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
                                {this.state.isSearchBtnClicked && !this.state.isSearchFound && !this.state.isShowLoader ? "Sorry, the thing doesn't seem to exist. Try anything else ?"  : null}
                            </p>

                            <p>
                                {!this.state.isSearchBtnClicked && !this.state.isShowLoader ? "What'll you buy today ?"  : null}
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

export default MainBox;