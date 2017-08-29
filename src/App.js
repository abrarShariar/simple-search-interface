import React, {Component} from 'react';

//components
import SearchBox from './SearchBox';
import CartBox from './CartBox';

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
