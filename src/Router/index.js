import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import Wallet from '../pages/Wallet';
import History from '../pages/History';
import Dahsboard from '../pages/Dashboard';
import Swap from '../pages/Swap';
import SwapNew from '../pages/SwapNew';
const Router = () => {
 
    return (
        <Fragment>
            <Switch>
                <Route path="/trade/:id" component={Home} />
                <Route path="/trade" component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/history" component={History} />
                <Route path="/dashboard" component={Dahsboard} />
                <Route path="/swap" component={Swap} />
                <Route path="/swap-new" component={SwapNew} />
                <Route path="/wallet" component={Wallet} />
                <Redirect from="/" to="/trade/ETH_BTC" />
            </Switch>
        </Fragment>
    );
};

export default Router;
