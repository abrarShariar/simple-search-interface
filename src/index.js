import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//redux stuffs
import { createStore } from 'redux';
import searchInterfaceApp from './reducers/reducer';
let store = createStore(searchInterfaceApp);


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
