import React, {Component} from 'react';
import CartBox from './CartBox';
import MainTextBox from './MainTextBox';
import './MainBox.css';

import HttpService from '../HttpService';

//component to be displayed with the search box and search results
class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputKey: "",
            isSearchFound: false,
            isSearchBtnClicked: false
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
            isSearchBtnClicked: true
        });

        HttpService.searchProduct(this.state.inputKey).then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        let stateStep = 1;
        if(this.state.isSearchFound && this.state.isSearchBtnClicked){
            stateStep = 3;
        }else if(!this.state.isSearchFound && this.state.isSearchBtnClicked){
            stateStep = 4;
        }

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
                            <p>{this.state.inputKey}</p>
                        </div>

                        <MainTextBox stateStep={stateStep}/>

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