import React, {Component} from 'react';
import ReactLoading from 'react-loading';

//loading component to show on each server request
class LoadingComponent extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        if (this.props.isSearchBtnClicked) {
            return (
                <div></div>
            )
        } else {
            return (
                <div>
                    <ReactLoading type="spin" color="#ff0400" height='100' width='100'/>
                </div>

            )
        }
    }
}

export default LoadingComponent;