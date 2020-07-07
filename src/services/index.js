import React, { Fragment, useEffect, useState } from 'react';
import Sockets from './Sockets';
import WanmaskVerification from './WanmaskVerification';
import OrionWanchain from './OrionWanchain';
import Metamask from './Metamask';
import Fortmatic from './Fortmatic';
import Coinbase from './Coinbase';
import Assests from './possibleAssests';
import { useSelector } from 'react-redux';

const Index = (_) => {
  const wanmaskConnected = useSelector((state) => state.wallet.wanmaskConnected);

  const [render, setRender] = useState(null);

  useEffect(
    (_) => {
      if (window.wan3 !== undefined && wanmaskConnected) {
        setRender(
          <Fragment>
            <WanmaskVerification />
          </Fragment>
        );
      }
    },
    [wanmaskConnected]
  );

  return (
    <Fragment>
      <Sockets />
      <Metamask />
      <OrionWanchain />
      <Fortmatic />
      <Coinbase />
      <Assests />
      {render}
    </Fragment>
  );
};

export default Index;
