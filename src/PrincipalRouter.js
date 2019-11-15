import React, {Fragment} from 'react';
import {Switch, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';

const PrincipalRouter = () => {
  return(
    <Fragment>
        <Switch>
          <Route  path='/' component={Sidebar} />
        </Switch>
    </Fragment>
  )
}

export default PrincipalRouter;
