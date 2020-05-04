import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import balances from './reducers/balances.js';
import general from './reducers/general.js';
import responsive from './reducers/responsive.js';
import wallet from './reducers/wallet.js';
import history from './reducers/history.js';
import 'antd/dist/antd.css';
import './css/loader.css'

const reducer = combineReducers({
	balances,
	general,
	responsive,
	wallet,
	history
});

const store = createStore(reducer);

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
