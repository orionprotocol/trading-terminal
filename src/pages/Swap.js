import React, { memo } from 'react';
import TopMenu from '../components/TopMenu';
import Sidebar from '../components/Sidebar';
import SwapSelector from '../components/Swap';

const Swap = memo(() => {
    return (
        <div>
            <TopMenu />
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
