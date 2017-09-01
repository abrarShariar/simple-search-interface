import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import searchInterfaceApp from './reducers/reducer';
import registerServiceWorker from './registerServiceWorker';

// const middleware = applyMiddleware(promise(), thunk, logger())
let store = createStore(searchInterfaceApp);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
