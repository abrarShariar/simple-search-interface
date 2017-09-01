import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {applyMiddleware, createStore} from 'redux';

import {fetchProducts,getHistory} from './actions/action';

import searchInterfaceApp from './reducers/reducer';
import registerServiceWorker from './registerServiceWorker';


const loggerMiddleware = createLogger()

const store = createStore(searchInterfaceApp, applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
));

store.dispatch(fetchProducts('backpack'))
store.dispatch(fetchProducts('webpack'))

store.dispatch(getHistory())

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
