import React, { lazy, memo } from "react";
import SwapSelector from "../components/Swap";

const Sidebar = lazy(() =>
  import(/* webpackChunkName: 'Sidebar' */ "../components/Sidebar")
);

const Swap = memo(() => {
  return (
    <div className="page">
      <Sidebar />
      <div className="page__content"></div>
    </div>
  );
});

export default Swap;
