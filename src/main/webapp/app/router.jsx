import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import MainDasboard from "./client/pages/main_dashboard"
import Balance from "./client/pages/balances"

import Menu from "./client/pages/parts/menu"

class Router extends React.Component {

    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
        // fetch('/app/client.ftl/user/info/',
        //     {
        //         credentials: 'same-origin',
        //     }
        // ).then(results => {
        //     return results.json();
        // }).then(data => {
        //     this.setState({userInfo: data})
        // })
    }

    render() {
        return (
            <BrowserRouter>
                <div className="row" >
                    <Menu/>
                    <div className="col-md-11" style={{paddingLeft:'20px', paddingRight:'35px'}}>
                        <Switch>
                            <Route exact path="/"
                                   render={props => <MainDasboard userInfo={this.state.userInfo} {...props}/>}/>
                        </Switch>
                        <Switch>
                            <Route exact path="/balance"
                                   render={props => <Balance userInfo={this.state.userInfo} {...props}/>}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
;

export default Router;