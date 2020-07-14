import React, { Fragment, useState, useEffect } from 'react';
import FadeIn from 'react-fade-in';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import openNotification from '../../../../../../Notification';
import { FadeLoader } from 'react-spinners';
import { Modal } from 'antd';
import './modalStyle.scss';

const Modal2 = (props) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (_) => {
    if (props.operation === 'Withdraw') {
      if (Number(amount) > Number(props.maxWithdraw)) {
        openNotification({
          message: 'Insufficient balance',
        });
      } else {
        props.submit(amount);
      }
      //-------------------------------------------------------------------------
      // withdraw('wbtc', amount, address);
    } else {
      setLoading(true);
      props.submit(amount);
      //-------------------------------------------------------------------------
      // console.log('deposit', 'WBTC', amount, address);
      // deposit('wbtc', amount, address);
    }
  };

  useEffect(() => {
    if (props.show === false) {
      setLoading(false);
    }
    setAmount('');
  }, [props.show]);

  return (
    <Modal
      wrapClassName={`modal-custom-home-exchange ${props.mode}`}
      centered={true}
      visible={props.show}
      footer={null}
      onCancel={props.toggle}
    >
      <h3>{props.operation}</h3>
      {loading ? (
        <div className="methods">
          <div className="tabs">
            <div className="tab-key tab">
              <div className="private-key wait">
                <span>Please wait . . .</span>
                <div>
                  <FadeLoader
                    height={15}
                    width={5}
                    radius={2}
                    margin={2}
                    color={'#84c8da'}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="custom-modal-container-amount">
            <label>Enter amount</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className="custom-modal-footer">
            <button type="button" onClick={props.toggle}>
              <FontAwesomeIcon icon="angle-left" size="lg" />
              <span>Go back</span>
            </button>
            <button type="submit">
              <span>{props.operation}</span>
            </button>
          </div>
        </form>
      )}
    </Modal>

    /* <Fragment>
      {props.show ? (
        <FadeIn transitionDuration={500}>
          <div className=" deposit-withdraw">
            <div className="popup-body">
              <div className="add-wallet-2">
                <div className="popup-top">
                  <p className="title">{props.operation}</p>
                  {loading ? null : (
                    <img
                      className="close js-close"
                      src="/img/close.png"
                      alt="dash"
                      onClick={props.toggle}
                    />
                  )}
                </div>
                {loading ? (
                  <div className="methods">
                    <div className="tabs">
                      <div className="tab-key tab">
                        <div className="private-key wait">
                          <span>Please wait . . .</span>
                          <div>
                            <FadeLoader
                              height={15}
                              width={5}
                              radius={2}
                              margin={2}
                              color={"#84c8da"}
                              loading={loading}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Fragment>
                    <div className="methods">
                      <div className="tabs">
                        <div className="tab-key tab">
                          <div className="private-key">
                            <span>Enter amount</span>
                            <input
                              type="number"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="btns">
                      <button
                        className="back js-go-back-to-1"
                        onClick={props.toggle}
                      >
                        <FontAwesomeIcon icon="angle-left" size="lg" />
                        <span>Go back</span>
                      </button>
                      <button className="connect" onClick={handleSubmit}>
                        <span>{props.operation}</span>
                      </button>
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      ) : null}
    </Fragment> */
  );
};

export default Modal2;
