import React, {Component} from 'react';
import './CartBox.css';

//component to be displayed on the right to show cart items
class CartBox extends React.Component {

    constructor(props) {
        super(props);
        this.clearCartHandler = this.clearCartHandler.bind(this);
    }

    clearCartHandler(e) {
        this.props.clearCartCallback();
        this.setState({
            displayText: "You have no item in your cart",
        });
    }

    render() {
        return (
            <div className="CartBox">
                <div className="MainGrid">
                    <div className="LeftGrid">
                        <span id="title">Cart</span>
                        <br/><br/>
                    </div>
                    <div className="RightGrid">
                    <span id="clearCart">

                        {this.props.cartItems.length > 0 ? <a type="button" className="btn btn-link" onClick={this.clearCartHandler}>
                            Clear Cart
                        </a> : <a disabled type="button" className="btn btn-link" onClick={this.clearCartHandler}>
                            Clear Cart
                        </a>}


                    </span>
                        <br/><br/>
                    </div>
                </div>

                <div >
                    <ol>
                        {
                            this.props.cartItems.map((item) => {
                                return (
                                    <div className="CartList">
                                        <li>
                                            <div className="productGrid">
                                                <strong>
                                                    {item.title}
                                                </strong>
                                            </div>
                                            <div className="priceGrid">
                                                <strong>
                                                    $ {item.price}
                                                </strong>
                                            </div>

                                            <br/>
                                        </li>
                                        <br/>
                                        <br/>
                                    </div>
                                )
                            })
                        }
                    </ol>
                </div>

                <div className="TextBox">
                    <p>
                        {this.props.displayText}
                    </p>
                </div>


            </div>
        )
    }
}

export default CartBox;