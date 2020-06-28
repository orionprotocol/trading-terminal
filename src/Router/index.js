import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const Home = lazy(() => import(/* webpackChunkName: 'Home' */ "../pages/Home"));
//const Wallet = lazy(() =>
//import(/* webpackChunkName: 'Wallet' */ "../pages/Wallet")
//);
const History = lazy(() =>
  import(/* webpackChunkName: 'History' */ "../pages/History")
);
const Dashboard = lazy(() =>
  import(/* webpackChunkName: 'Dashboard' */ "../pages/Dashboard")
);
//const Swap = lazy(() => import(/* webpackChunkName: 'Swap' */ "../pages/Swap"));

//const SwapNew = lazy(() =>
//import(/* webpackChunkName: 'SwapNew' */ "../pages/SwapNew")
//);

const Router = () => {
  return (
    <Suspense fallback="">
      <Switch>
        <Route path="/trade/:id" component={Home} />
        <Route path="/trade" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/history" component={History} />
        <Route path="/dashboard" component={Dashboard} />
        {/* <Route path="/swap" component={Swap} />
        <Route path="/swap-new" component={SwapNew} />
        <Route path="/wallet" component={Wallet} /> */}
        <Redirect from="/" to="/trade/ETH_BTC" />
      </Switch>
    </Suspense>
  );
};

export default Router;
