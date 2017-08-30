import React, {Component} from 'react';
//component for a product thumb
class ProductThumb extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ProductThumb">
                <div>
                    <div>
                        <div className="thumbnail">
                            <img src={this.props.productData.thumb} alt="product thumbnail"/>
                            <div className="caption">
                                <span>{this.props.productData.title}</span>
                                <p>...</p>
                                <p><a href="#" className="btn btn-warning" role="button">Add to Cart</a>
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