import React, {Component} from 'react';
import './CartBox.css';

//component to be displayed on the right to show cart items
class CartBox extends React.Component {


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="CartBox">
                <div className="MainGrid">
                    <div className="LeftGrid">
                        <span id="title">Cart</span>
                    </div>

                    <div className="RightGrid">
                    <span id="clearCart">
                        <a href="#">
                            Clear Cart
                        </a>
                    </span>
                    </div>
                </div>

                <div className="TextBox">
                    <p>
                        You have no item in your cart
                    </p>
                </div>
            </div>


        )
    }
}

export default CartBox;