import React, {Component} from 'react';


//component to be displayed on the right to show cart items

class CartBox extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="CartBox">
                <h1>This is the Cart Box</h1>
            </div>
        )
    }
}

export default CartBox;