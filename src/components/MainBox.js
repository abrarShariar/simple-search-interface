import React, {Component} from 'react';
import CartBox from './CartBox';
import './MainBox.css';
//component to be displayed with the search box and search results

class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputKey: ""
        };
        this.getInputKey = this.getInputKey.bind(this);
    }

    getInputKey(e) {
        this.setState({
            inputKey: e.target.value
        })
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
                                    <button className="btn btn-success" type="button">Search</button>
                                </div>
                            </div>
                            <br/>
                            <p>{this.state.inputKey}</p>
                        </div>

                        <div className="MainTextBox">
                            <p>
                                What'll you buy today ?
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