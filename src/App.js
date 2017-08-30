import React, {Component} from 'react';

// components
import SearchBox from './components/MainBox';

// this is the root component
class App extends Component {
    render() {
        return (
            <div className="App">
                <SearchBox/>
            </div>
        );
    }
}

export default App;
