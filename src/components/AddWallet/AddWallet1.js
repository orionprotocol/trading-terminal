import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";

const AddWallet1 = (props) => {
  const dispatch = useDispatch();
  const setWalletOpt = useCallback(
    (payload) => dispatch({ type: "SetWalletOpt", payload }),
    [dispatch]
  );

  const handleClick = (opt) => {
    setWalletOpt(opt);

    props.show2();
  };

  return (
    <div className="popup-wrapper js-add-wallet-1">
      <div className="popup-body">
        <div className="add-wallet-1">
          <div className="popup-top">
            <p className="title">Add Wallet</p>
            <div className="steps">
              <span className="active">1</span>
              <span>2</span>
            </div>
            <img
              className="close js-close"
              src="/img/close.png"
              alt="dash"
              onClick={props.hide1}
            />
          </div>
          <div className="choose-wallet">
            <div
              className="item js-next-step"
              onClick={(_) => handleClick("ethereum")}
            >
              <img className="icon" src="/img/big-eth.png" alt="dash" />
              <div className="text">
                <p className="name">Ethereum</p>
                <p className="desc">Ethereum is the solution</p>
              </div>
              <FontAwesomeIcon className="next" icon="angle-right" size="2x" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWallet1;
