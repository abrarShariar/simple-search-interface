import React, {Component} from 'react';

//components
import SearchBox from './components/SearchBox';
import CartBox from './components/CartBox';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="col-md-12">
                    <div className="col-md-8">
                        <SearchBox/>
                    </div>
                    <div className="col-md-4">
                        <CartBox/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
