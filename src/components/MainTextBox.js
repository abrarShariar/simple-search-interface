import React, {Component} from 'react';
import './MainBox.css';

class MainTextBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayText: ""
        }


        if(this.props.stateStep === 1){
            this.setState({
                displayText: "What'll you buy today ?"
            });
        }else if(this.props.stateStep === 2 || props.stateStep === 3){
            this.setState({
                displayText: ""
            });
        }else if(this.props.stateStep === 4){
            this.setState({
                displayText: "Sorry, the thing doesn't seem to exist. Try anything else ?"
            });
        }
    }



    render() {

        return (
            <div className="MainTextBox">
                <p>
                    {this.state.displayText}
                </p>
            </div>
        )
    }
}

export default MainTextBox;