import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Line from './components/line';
import CheckBox from './components/checkBox';
import compareValues from '../../funtions/compareValues';
import './walletsTable.scss';

const WalletsTable = (props) => {
  /* Redux */
  const assets = useSelector((state) => state.wallet.assets);
  const mode = useSelector((state) => state.general.mode);
  const balances = useSelector((state) => state.balances);
  /* Redux */

  const [contract, setContract] = useState({});
  const [wallet, setWallet] = useState({});
  const [classes, setClasses] = useState({
    token: 'angle-down',
    wallet: 'angle-down',
    contract: 'angle-down',
    open: 'angle-down',
  });

  const [lines, setLines] = useState([]);
  const [initialLines, setinitialLines] = useState([]);
  const [filterCheck, setfilterCheck] = useState(false);
  const [searcher, setsearcher] = useState('');
  console.log(lines);
  useEffect(
    (_) => {
      let newContract = {},
        newWallet = {};
      for (let a in assets) {
        a = a.toUpperCase();
        newContract[a] = 0;
        newWallet[a] = 0;
      }
      setContract(newContract);
      setWallet(newWallet);
    },
    [assets]
  );

  useEffect(
    (_) => {
      let linesArray = Object.keys(contract).map((a) => {
        // console.log(wallet[a.toUpperCase()]);
        if (typeof wallet[a.toUpperCase()] === 'number') {
          return {
            token: a.toUpperCase(),
            wallet: wallet[a.toUpperCase()].toFixed(8),
            contract: contract[a.toUpperCase()].toFixed(8),
            open: 0,
            img: `/img/icons/currencies_highlight/${a.toLowerCase()}.svg`,
          };
        } else {
          return {
            token: null,
            wallet: null,
            contract: null,
            open: 0,
            img: null,
          };
        }
      });
      setLines(linesArray);
      setinitialLines(linesArray);
    },
    [contract, wallet]
  );

  useEffect(
    (_) => {
      try {
        const { contractBalances, walletBalances } = balances;
        if (contractBalances && walletBalances) {
          let newContract = {},
            newWallet = {};

          for (let a in assets) {
            if (Number(contractBalances[assets[a.toUpperCase()]]) >= 0) {
              newContract[a.toUpperCase()] = Number(contractBalances[assets[a.toUpperCase()]]);
            } else {
              newContract[a.toUpperCase()] = 0;
            }

            if (Number(walletBalances[assets[a.toUpperCase()]]) >= 0) {
              newWallet[a.toUpperCase()] = Number(walletBalances[assets[a.toUpperCase()]]);
            } else {
              newWallet[a.toUpperCase()] = 0;
            }
          }

          setContract({
            // ...contract,
            ...newContract,
          });

          setWallet({
            // ...contract,
            ...newWallet,
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [balances]
  );
  useEffect(() => {
    if (filterCheck) {
      let AuxLines = lines.filter((e) => {
        let replace = '^' + searcher;
        let regex = new RegExp(replace, 'i');
        return regex.test(e.token);
      });
      setLines(
        AuxLines.filter((e) => {
          if (parseFloat(e.contract) !== 0 && parseFloat(e.wallet) !== 0) return e;
        })
      );
    } else {
      if (searcher !== '') {
        setLines(
          initialLines.filter((e) => {
            let replace = '^' + searcher;
            let regex = new RegExp(replace, 'i');
            return regex.test(e.token);
          })
        );
      } else {
        setLines(initialLines);
      }
    }
  }, [filterCheck]);

  const handleSort = (type) => {
    // let newLines = []

    let newClasses = {};
    let sortType = 'asc';
    for (let e in classes) {
      if (e === type) {
        if (classes[e] === 'angle-down') {
          newClasses[e] = 'angle-up';
        } else {
          newClasses[e] = 'angle-down';
          sortType = 'desc';
        }
      } else {
        newClasses[e] = 'angle-down';
      }
    }
    setClasses(newClasses);
    setLines([]);

    setTimeout(() => {
      let newLines = lines.sort(compareValues(type, sortType));
      setLines(newLines);
    }, 0);
  };

  /* HANDLE CHANGE FOR SEARCH FILTER */
  const handleChange = (e) => {
    let field = e.target.value;
    setsearcher(e.target.value);
    if (field === '') {
      setLines(initialLines);
    } else {
      setLines(
        lines.filter((e) => {
          let replace = '^' + field;
          let regex = new RegExp(replace, 'i');
          return regex.test(e.token);
        })
      );
    }
  };
  /*END  HANDLE CHANGE FOR SEARCH FILTER */

  return (
    <Col xs={24} className="wallets-table">
      <div className={`header-table-wallets ${mode}`}>
        <div className="left">
          <div className="title">Deposit to start Trading</div>
          <ul className="list">
            <li>
              <div className="circle"></div>Choose a token and click on deposit.
            </li>
            <li>
              {' '}
              <div className="circle"></div>Send asset to Contract Balance
            </li>
            <li>
              {' '}
              <div className="circle"></div>Start trading in a few minute
            </li>
          </ul>
        </div>
        <div className="right">
          <button type="button">Learn more</button>
        </div>
      </div>

      <div className={`titles ${mode}`}>
        <div className="title" onClick={(_) => handleSort('token')}>
          <span>Token</span>
          <FontAwesomeIcon icon={classes.token} size="sm" />
        </div>
        <div className="title" onClick={(_) => handleSort('wallet')}>
          <span>Wallet</span>
          <FontAwesomeIcon icon={classes.wallet} size="sm" />
        </div>
        <div className="title" onClick={(_) => handleSort('contract')}>
          <span>Contract</span>
          <FontAwesomeIcon icon={classes.contract} size="sm" />
        </div>
        <div className="title" onClick={(_) => handleSort('open')}>
          <span>In open order</span>
          <FontAwesomeIcon icon={classes.open} size="sm" />
        </div>

        <div className={`title actions `}>
          <div className="zero-filter">
            <CheckBox filterCheck={filterCheck} setfilterCheck={setfilterCheck} />
            <span>Hide zero</span>
          </div>

          <div className="search">
            <div className="input">
              <input type="text" placeholder="Search..." onChange={handleChange} value={searcher} />
              <FontAwesomeIcon icon="search" />
            </div>
          </div>
        </div>
      </div>

      <div className="lines">
        {lines.map((e, i) => (
          <Line
            lines={lines}
            key={i}
            currency={e.token}
            wallet={e.wallet}
            contract={e.contract}
            img={e.img}
            history={props.history}
            open={e.open}
          />
        ))}
      </div>
    </Col>
  );
};

export default WalletsTable;
