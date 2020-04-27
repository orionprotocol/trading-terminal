import React, { Fragment } from 'react';
import Router from './Router';
import Services from './services';

import './css/chart.css';

function App() {
    return (
        <Fragment>
            <Services />
            <Router />
        </Fragment>
    );
}

export default App;
