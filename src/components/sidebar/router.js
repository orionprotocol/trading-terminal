import React,{Fragment} from 'react'
import { Route } from 'react-router-dom'

import Home from '../../components/home'
import Dashboard from '../../components/dashboard'
import History from '../../components/history'

export default function Router(){
    return(
        <Fragment>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/history" component={History} />
        </Fragment>
    )
}