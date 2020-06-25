import React, { Fragment } from 'react';
import Router from './Router';
import Services from './services';

import './css/common.scss';

function App() {
    return (
        <Fragment>
            <Services/>
            <Router />
        </Fragment>
    );
}

export default App;
