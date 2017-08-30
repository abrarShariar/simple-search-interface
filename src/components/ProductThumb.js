import React, {Component} from 'react';
//component for a product thumb
import './ProductThumb.css';

function ProductTitle(props) {
    let title = props.title;
    if (props.title.length > 20) {
        title = props.title.substring(0, 20);
    }

    return (
        <span>
        <u>
            {title}
        </u>
        </span>
    )
}

class ProductThumb extends React.Component {

    constructor(props) {
        super(props);
        this.addToCartHandler = this.addToCartHandler.bind(this);
    }

    addToCartHandler(e) {
        this.props.addToCartCallback(this.props.productData);
    }

    render() {
        return (
            <div className="ProductThumb">
                <div>
                    <div>
                        <div className="thumbnail">
                            <img src={this.props.productData.thumb} alt="product thumbnail"/>
                            <div className="caption">
                                <div className="ProductTitle">
                                    <ProductTitle title={this.props.productData.title}/>
                                    <br/>
                                    <span>
                                        {this.props.productData.brand}
                                    </span>
                                </div>

                                <p>
                                    <strong> $ {this.props.productData.price} </strong>
                                </p>
                                <p><button className="btn btn-warning" role="button"
                                      onClick={this.addToCartHandler}>Add to Cart</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductThumb;