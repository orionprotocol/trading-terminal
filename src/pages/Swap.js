import React, { lazy, memo } from "react";
import SwapSelector from "../components/Swap";

const Sidebar = lazy(() =>
  import(/* webpackChunkName: 'Sidebar' */ "../components/Sidebar")
);

const Swap = memo(() => {
  return (
    <div>
      <div className="history">
        <Sidebar />

        <div className="my-container">
          <SwapSelector />
        </div>
      </div>
    </div>
  );
});

export default Swap;
