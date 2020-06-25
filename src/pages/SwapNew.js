import React, { memo } from 'react';
import TopMenu from '../components/TopMenu';
import Sidebar from '../components/Sidebar';
import SwapSelector from '../components/Swap';

const Swap = memo(() => {
    return (
        <div className="page">
            <Sidebar />
            <div className="page__content">
            </div>
        </div>
    );
});

export default Swap;
