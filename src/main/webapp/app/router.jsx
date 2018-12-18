import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import MainDasboard from "./client/pages/main_dashboard"


class Router extends React.Component {

    constructor() {
        super();
        this.state = {
        }
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
                <div className="wrapper">
                    <div className="content-wrapper" style={{padding: 10}}>
                        <Switch>
                            <Route exact path="/"
                                   render={props => <MainDasboard userInfo={this.state.userInfo} {...props}/>}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
;

export default Router;