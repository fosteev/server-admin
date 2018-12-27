import React, {Component} from 'react'
import {Provider} from 'react-redux';
import AppReducer from './reducers';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {composeWithDevTools} from 'redux-devtools-extension';

export const store = createStore(AppReducer, composeWithDevTools(applyMiddleware(thunk)));

import './App.css';
import App from './screens';

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }

}

export default Root;
