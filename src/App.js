import React, {Component} from 'react';

// components
import MainBox from './components/MainBox';

// this is the root component
class App extends Component {
    render() {
        return (
            <div className="App">
                <MainBox/>
            </div>
        );
    }
}

export default App;
