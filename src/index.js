import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as Sentry from "@sentry/react";
import * as serviceWorker from "./serviceWorker";
import WebfontLoader from "@dr-kobros/react-webfont-loader";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, combineReducers } from "redux";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faArrowUp,
  faArrowDown,
  faExchangeAlt,
  faPlus,
  faSearch,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { Provider } from "react-redux";
import balances from "./reducers/balances.js";
import general from "./reducers/general.js";
import responsive from "./reducers/responsive.js";
import wallet from "./reducers/wallet.js";
import history from "./reducers/history.js";
import "antd/dist/antd.css";
/* import "./css/loader.css"; */

if (
  process.env.NODE_ENV === "production" &&
  !process.env.REACT_APP_SENTRY_DNS &&
  !process.env.REACT_APP_SENTRY_ENVIRONMENT
) {
  throw Error("REACT_APP_SENTRY_DNS or REACT_APP_SENTRY_ENVIRONMENT not set");
}

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DNS,
  environment: process.env.REACT_APP_SENTRY_ENVIRONMENT,
});

const reducer = combineReducers({
  balances,
  general,
  responsive,
  wallet,
  history,
});

const store = createStore(reducer);

library.add(
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faArrowUp,
  faArrowDown,
  faExchangeAlt,
  faPlus,
  faSearch,
  faStar,
  farStar
);

const config = {
  google: {
    families: ["Montserrat:500,600,700"],
  },
};

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <WebfontLoader config={config}>
        <App />
      </WebfontLoader>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
