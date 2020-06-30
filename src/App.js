import React, { lazy, Fragment, Suspense } from "react";
import Router from "./Router";
import "./css/common.scss";

const Services = lazy(() =>
  import(/* webpackChunkName: 'Services' */ "./services")
);

function App() {
  return (
    <Fragment>
      <Suspense fallback="">
        <Services />
      </Suspense>
      <Router />
    </Fragment>
  );
}

export default App;
