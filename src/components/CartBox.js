import React, {Component} from 'react';
import './CartBox.css';

//component to be displayed on the right to show cart items
class CartBox extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps() {
        // console.log(this.props.cartItems);
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
                        <a href="#">
                            Clear Cart
                        </a>
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
                        You have no item in your cart
                    </p>
                </div>
            </div>
        )
    }
}

export default CartBox;