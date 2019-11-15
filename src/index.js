import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css'
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import balances from './reducers/balances.js';
import 'antd/dist/antd.css'

const reducer = combineReducers({
	balances
});

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

