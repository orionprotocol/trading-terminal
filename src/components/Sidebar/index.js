import React, {
  lazy,
  useCallback,
  useEffect,
  useState,
  Fragment,
  Suspense,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Dark, Light } from "../funtions/handleMode";
import FadeIn from "react-fade-in";
import { ethereum } from "../../services/Coinbase";
import "./sidebar.scss";

const AddWallet1 = lazy(() => import("../AddWallet/AddWallet1"));
const AddWallet2 = lazy(() => import("../AddWallet/AddWallet2"));

const Sidebar = (props) => {
  const dispatch = useDispatch();

  const setMode = useCallback(
    (payload) => dispatch({ type: "SetMode", payload }),
    [dispatch]
  );
  const setAddWallet = useCallback(
    (payload) => dispatch({ type: "SetAddWallet", payload }),
    [dispatch]
  );
  const setWanmaskConnect = useCallback(
    (payload) => dispatch({ type: "SetWanmaskConnect", payload }),
    [dispatch]
  );
  const setFortmaticConnect = useCallback(
    (payload) => dispatch({ type: "SetFortmaticConnect", payload }),
    [dispatch]
  );
  const SetCoinbaseConnect = useCallback(
    (payload) => dispatch({ type: "SetCoinbaseConnect", payload }),
    [dispatch]
  );
  // const setEthAddress = useCallback(
  //     payload => dispatch({ type: 'SetEthAddress', payload }),
  //     [dispatch]
  // );

  const setMetamaskConnect = useCallback(
    (payload) => dispatch({ type: "SetMetamaskConnect", payload }),
    [dispatch]
  );

  const [actives, setActives] = useState(["active", "", "", ""]);
  const wanActive = useSelector((state) => state.wallet.wanActive);
  const walletOpt = useSelector((state) => state.wallet.walletOpt);
  const wanmaskConnected = useSelector(
    (state) => state.wallet.wanmaskConnected
  );
  const metamaskConnected = useSelector(
    (state) => state.wallet.metamaskConnected
  );
  const fortmaticConnected = useSelector(
    (state) => state.wallet.fortmaticConnected
  );
  const coinbaseConnected = useSelector(
    (state) => state.wallet.coinbaseConnected
  );
  const addWallet = useSelector((state) => state.wallet.addWallet);
  const mode = useSelector((state) => state.general.mode);
  const symbolA = useSelector((state) => state.general.symbolA);
  const symbolB = useSelector((state) => state.general.symbolB);
  const [walletActive, setWalletActive] = useState(false);
  const [addWalletOpt, setAddWalletOpt] = useState(false);

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  // const history = useHistory();

  const handleShow2 = (_) => {
    setShow1(false);
    setTimeout(() => {
      setShow2(true);
    }, 100);
  };

  const handleShow1 = (_) => {
    setShow2(false);
    setTimeout(() => {
      setShow1(true);
    }, 100);
  };

  useEffect(
    (_) => {
      setWalletActive(wanActive);
      // switch (walletOpt) {
      // 	case 'wanchain':
      // 		setWalletActive(wanActive);
      // 		break;

      // 	default:
      // 		setWalletActive(false);
      // 		break;
      // }

      // const { pathname } = window.location;
      // if (!wanActive && pathname !== '/home') {
      // 	history.push('/home');
      // }

      const wanmask =
        localStorage.getItem("wanmaskConnected") === "true" ? true : false;
      const metamask =
        localStorage.getItem("metamaskConnected") === "true" ? true : false;
      const fortmatic =
        localStorage.getItem("fortmaticConnected") === "true" ? true : false;
      const coinbase =
        localStorage.getItem("coinbaseConnected") === "true" ? true : false;

      if (wanmask || wanmaskConnected) {
        setAddWalletOpt(true);
        setWanmaskConnect(true);
        setWalletActive(true);
      }

      if (metamask || metamaskConnected) {
        setAddWalletOpt(true);
        setMetamaskConnect(true);
        setWalletActive(true);
      }

      if (fortmatic || fortmaticConnected) {
        // console.log('fm connected', ethAddress);
        setAddWalletOpt(true);
        setFortmaticConnect(true);
        setWalletActive(true);
      }
      if (coinbase || coinbaseConnected) {
        // console.log('fm connected', ethAddress);
        setAddWalletOpt(true);
        SetCoinbaseConnect(true);
        setWalletActive(true);
      }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [
      wanActive,
      walletOpt,
      wanmaskConnected,
      metamaskConnected,
      fortmaticConnected,
      coinbaseConnected,
    ]
  );

  useEffect((_) => {
    let lastmode = localStorage.getItem("mode");

    if (lastmode === "Dark" || !lastmode) {
      Dark();
      setMode("Dark");
    } else {
      Light();
      setMode("Light");
    }

    let { pathname } = window.location;

    switch (pathname) {
      case "/home":
        setActives(["active", "", "", ""]);
        break;
      case "/dashboard":
        setActives(["", "active", "", ""]);
        break;
      case "/swap":
        setActives(["", "", "active", ""]);
        break;
      case "/history":
        setActives(["", "", "", "active"]);
        break;
      default:
        break;
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let onClick = (_) => {
    document.querySelector(".navbar").classList.toggle("open");
  };

  // const onMouseOver = _ => {
  //     document.querySelector('.js-sidebar-wrapper').classList.add('open');
  //     // const div = document.querySelector('#js-wrapper-pair');
  //     // if (div) div.classList.add('active');
  //     const arrow = document.querySelector('.link.js-pair-link');
  //     const drop = document.querySelector('.pair-drop.js-pair-drop');
  //     if(arrow && drop ){
  //         if(arrow.classList.length===3 ||drop.classList.length===3){
  //             arrow.classList.remove('active');
  //             drop.classList.remove('active');
  //         }
  //     }
  //     /* const arrow = document.querySelector('.link.js-pair-link');
  //     arrow.classList.toggle('active');
  //
  //     const drop = document.querySelector('.pair-drop.js-pair-drop');
  //     drop.classList.toggle('active'); */
  //
  // };

  // const onMouseLeave = _ => {
  //
  //     document.querySelector('.js-sidebar-wrapper').classList.remove('open');
  //     // const div = document.querySelector('#js-wrapper-pair');
  //     // if (div) div.classList.remove('active');
  // };

  const handleMode = (_) => {
    if (mode === "Light") {
      Dark();
      setMode("Dark");
    } else if (mode === "Dark") {
      Light();
      setMode("Light");
    }
  };

  const handleAddWallet = (_) => {
    setShow1(!show1);
  };

  const clearLocalStorage = (_) => {
    localStorage.removeItem("wanmaskConnected");
    localStorage.removeItem("metamaskConnected");
    localStorage.removeItem("fortmaticConnected");
    localStorage.removeItem("coinbaseConnected");
    localStorage.removeItem("ethAddress");
    localStorage.removeItem("address");
  };

  const handleDisconnect = (_) => {
    if (localStorage.getItem("coinbaseConnected")) {
      ethereum.close();
    }
    clearLocalStorage();

    setTimeout(() => {
      window.location.replace("/");
    }, 1000);
  };

  useEffect(
    (_) => {
      if (addWallet) {
        handleAddWallet();
      }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [addWallet]
  );

  useEffect(
    (_) => {
      if (show1 === false || show2 === false) {
        setAddWallet(false);
      }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [show1, show2]
  );

  return (
    <div
      className="navbar js-navbar"
      // onMouseLeave={onMouseLeave}
      // onMouseOver={onMouseOver}
    >
      <Suspense fallback="">
        {show1 ? (
          <FadeIn transitionDuration={10}>
            <AddWallet1 show2={handleShow2} hide1={(_) => setShow1(false)} />
          </FadeIn>
        ) : null}

        {show2 ? (
          <FadeIn transitionDuration={10}>
            <AddWallet2 show1={handleShow1} hide2={(_) => setShow2(false)} />
          </FadeIn>
        ) : null}
      </Suspense>
      <div className="navbar__top">
        <a className="logo" href="/">
          <img src="/img/svg/orion_full.svg" alt="home" />
        </a>
        <div className="navbar__toggle" onClick={onClick}></div>
      </div>
      <div className="navbar__wrapper">
        <div className="navbar__list">
          <div
            className="themeSwicher js-toggler-dark-mode"
            onClick={handleMode}
          >
            <div className="themeSwicher__icon">
              <i className="icon_moon"></i>
            </div>
            <div className="themeSwicher__item">
              <div className="themeSwicher__text">Dark Mode</div>
              <div className="themeSwicher__trigger"></div>
            </div>
          </div>
          <ul className="nav">
            <li className="nav__item">
              <Link
                className={`nav__link ${actives[0]}`}
                to={`/trade/${symbolA}_${symbolB}`}
              >
                <span className="icon_chart" />
                <span className="nav__text">Trading Terminal</span>
              </Link>
            </li>

            {walletActive && (
              <Fragment>
                {/* <li className="nav__item">
                  <Link className={`nav__link ${actives[2]}`} to="/swap">
                    <span className="icon_swap"></span>
                    <span className="nav__text">Swap</span>
                  </Link>
                </li> */}
                <li className="nav__item">
                  <Link className={`nav__link ${actives[1]}`} to="/dashboard">
                    <span className="icon_grid" />
                    <span className="nav__text">Dashboard</span>
                  </Link>
                </li>
                <li className="nav__item">
                  <Link className={`nav__link ${actives[3]}`} to="/history">
                    <span className="icon_clock" />
                    <span className="nav__text">History</span>
                  </Link>
                </li>
              </Fragment>
            )}
          </ul>
          <ul className="addedWallet">
            {wanmaskConnected ? (
              <li className="addedWallet__item">
                <div className="addedWallet__link">
                  <span className="addedWallet__icon icon_wanchain" />
                  <span className="addedWallet__text">Wanchain</span>
                </div>
              </li>
            ) : null}

            {metamaskConnected || fortmaticConnected || coinbaseConnected ? (
              <li className="addedWallet__item">
                <div className="addedWallet__link">
                  <span className="addedWallet__icon icon_ethereum" />
                  <span className="addedWallet__text">Ethereum</span>
                </div>
              </li>
            ) : null}
            {
              // <li className="addedWallet__item">
              //     <div className="addedWallet__link">
              //         <span className="addedWallet__icon icon_bitcoin" />
              // 		<span className="addedWallet__text">Bitcoin</span>
              // 	</div>
              // </li>
            }
            {
              // <li className="addedWallet__item">
              //     <div className="addedWallet__link">
              //         <span className="addedWallet__icon icon_dash" />
              // 		<span className="addedWallet__text">Dash</span>
              // 	</div>
              // </li>
            }
          </ul>
        </div>
        <div className="addWallet">
          {addWalletOpt ? (
            <Fragment>
              <span className="addWallet__btn" onClick={handleDisconnect}>
                <i className="addWallet__icon">
                  <i className="icon_minus"></i>
                </i>
                <span className="addWallet__text">Disconnect</span>
              </span>
            </Fragment>
          ) : (
            <Fragment>
              <span className="addWallet__btn" onClick={handleAddWallet}>
                <i className="addWallet__icon">
                  <i className="icon_add"></i>
                </i>
                <span className="addWallet__text">Add Wallet</span>
              </span>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
