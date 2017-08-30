import React, {Component} from 'react';
import CartBox from './CartBox';
import './MainBox.css';
import ProductThumb from './ProductThumb';
import HttpService from '../HttpService';
import * as _ from 'underscore';

//component to be displayed with the search box and search results
class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputKey: "",
            isSearchFound: false,
            isSearchBtnClicked: false,
            displayText: "What'll you buy today ?",
            searchResults: []
        };

        this.getInputKey = this.getInputKey.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
    }

    getInputKey(e) {
        this.setState({
            inputKey: e.target.value
        });

       console.log(this.state.inputKey);
    }

    searchHandler() {
        this.setState({
            isSearchBtnClicked: true
        });

        HttpService.searchProduct(this.state.inputKey).then((response) => {
            if (response.status === 200 && response.statusText === "OK") {
                if (response.data.hits.hits.length > 0 && response.data.hits.total !== 0) {
                    this.setState({
                        isSearchFound: true,
                        displayText: ""
                    });

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

                    this.setState({
                        searchResults: searchResults,
                        displayText: ""
                    })
                } else {
                    this.setState({
                        isSearchFound: false,
                        searchResults: [],
                        displayText: "Sorry, the thing doesn't seem to exist. Try anything else ?"
                    })
                }
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <div className="MainBox">
                <div className="LeftGridFull">
                    <div className="LeftBox">
                        <div className="container searchBox">
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

                        <div className="SearchResultContainer">
                            {
                                this.state.searchResults.map((item, index) => {
                                   return(
                                   <div className="ProductThumbContainer">
                                       <ProductThumb productData={item} />
                                   </div>
                                   )
                                })
                            }
                        </div>

                        <div className="MainTextBox">
                            <p>
                                {this.state.displayText}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="RightBox">
                    <CartBox/>
                </div>
            </div>
        )
    }
}

export default SearchBox;