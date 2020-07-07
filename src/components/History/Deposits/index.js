import React, { Fragment, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Select } from "antd";
import { useSelector } from "react-redux";
import getSymbol from "../../funtions/getSymbol";
import getSymbolImg from "../../funtions/getSymbolImg";
import dayjs from "dayjs";
import compareValues from "../../funtions/compareValues";
import ReactPaginate from "react-paginate";
import CustomDatePickerInput from "../../CustomDatePickerInput";

import "./index.scss";

const { Option } = Select;

export default function Deposits() {
  const mode = useSelector((state) => state.general.mode);

  const deposits = useSelector((state) => state.history.deposits);
  const [depositsRender, setDepositsRender] = useState([]);
  const [deps, setDeps] = useState([]);
  const [startDateA, setStartDateA] = useState(new Date());
  const [startDateB, setStartDateB] = useState(new Date());
  const [classes, setClasses] = useState({
    date: "angle-up",
    asset: "angle-up",
    amount: "angle-up",
    status: "angle-up",
  });
  const [offset, setOffset] = useState(0);
  const [elements, setElements] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const perPage = 10;

  const handleSort = (type) => {
    let newClasses = {};
    let sortType = "asc";
    for (let e in classes) {
      if (e === type) {
        if (classes[e] === "angle-down") {
          newClasses[e] = "angle-up";
        } else {
          newClasses[e] = "angle-down";
          sortType = "desc";
        }
      } else {
        newClasses[e] = "angle-down";
      }
    }
    setClasses(newClasses);
    let sortKey = "";
    let depsSorted = [];
    switch (type) {
      case "date":
        sortKey = "created_at";
        depsSorted = deps.sort(compareValues(sortKey, sortType));
        setDeps([...depsSorted]);
        break;
      case "asset":
        sortKey = "asset";
        depsSorted = deps.sort(compareValues(sortKey, sortType));
        setDeps([...depsSorted]);
        break;
      case "amount":
        sortKey = "amount";
        depsSorted = deps.sort(compareValues(sortKey, sortType));
        setDeps([...depsSorted]);
        break;
      default:
        break;
    }
  };

  useEffect(
    (_) => {
      // console.log(deposits);
      setDeps(deposits);
    },
    [deposits]
  );

  useEffect(
    (_) => {
      setPageCount(Math.ceil(deps.length / perPage));
      setDepositsRender(
        deps.map((e, i) => {
          const date = dayjs(e.created_at).format("DD.MM.YYYY HH:mm:ss");
          return (
            <Fragment key={i + "ss"}>
              <div className="line">
                <span className="cell time">{date}</span>
                <div className="cell short emp btc">
                  <img
                    src={getSymbolImg(getSymbol(e.asset))}
                    alt="hist"
                    style={{
                      width: "20px",
                      height: "20px",
                    }}
                  />
                  <span>{getSymbol(e.asset)}</span>
                </div>
                <span className="cell amount">
                  <span className="title-m">Amount</span>{" "}
                  <span>{e.amount}</span>
                </span>
                <span className="cell filled status">Filled</span>
              </div>
            </Fragment>
          );
        })
      );
    },
    [deps]
  );

  useEffect(
    (_) => {
      // console.log('length ', depositsRender.length)
      if (depositsRender.length >= 0) {
        setElementsForCurrentPage();
      }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [depositsRender]
  );

  useEffect(
    (_) => {
      let newTime = dayjs(startDateA).unix();
      let timeB = dayjs(startDateB).unix();

      let newDeps = deposits.filter((e) => {
        const time = dayjs(e.created_at).unix();
        return time >= newTime && time <= timeB;
      });

      setDeps(newDeps);
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [startDateA]
  );

  useEffect(
    (_) => {
      let newTime = dayjs(startDateB).unix();
      let timeA = dayjs(startDateA).unix();

      let newDeps = deposits.filter((e) => {
        const time = dayjs(e.created_at).unix();
        return time <= newTime && time >= timeA;
      });

      setDeps(newDeps);
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [startDateB]
  );

  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  };

  const optsClass =
    mode === "Light" ? "option-select emp" : "dark-mode option-select emp";

  const handleAsset = (asset) => {
    if (asset === "ALL") {
      setDeps(deposits);
    } else {
      let newDeps = deposits.filter((e) => {
        const symbol = getSymbol(e.asset);
        return symbol === asset;
      });

      setDeps(newDeps);
    }
  };

  const setElementsForCurrentPage = () => {
    let elements = depositsRender.slice(offset, offset + perPage);
    setElements(elements);
  };

  useEffect(
    (_) => {
      setElementsForCurrentPage();
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPage, offset]
  );

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    const offset = selectedPage * perPage;
    setCurrentPage(selectedPage);
    setOffset(offset);
  };

  const dropdownStyle =
    mode === "Light"
      ? {}
      : {
          backgroundColor: "#2e2e45",
          color: "#e9e9e9a8",
        };

  return (
    <div className="history-table">
      <p className="heading">Deposit History</p>
      <div className="table-wrapper">
        <div className="top">
          <div className="date">
            <div className="date-1">
              <DatePicker
                selected={startDateA}
                onChange={(date) => setStartDateA(date)}
                calendarClassName="date"
                dateFormat="dd.MM.Y"
                onChangeRaw={handleDateChangeRaw}
                customInput={<CustomDatePickerInput />}
                popperPlacement="bottom-center"
              />
            </div>
            <span className="hr" />
            <div className="date-1">
              <DatePicker
                selected={startDateB}
                onChange={(date) => setStartDateB(date)}
                calendarClassName="date"
                dateFormat="dd.MM.Y"
                onChangeRaw={handleDateChangeRaw}
                customInput={<CustomDatePickerInput />}
                popperPlacement="bottom-center"
              />
            </div>
          </div>
          <div className="all">
            <Select
              className="price-card-selector emp"
              defaultValue="ALL"
              style={{
                width: "80px",
                padding: "2px",
                border: "none",
              }}
              onChange={handleAsset}
              dropdownStyle={dropdownStyle}
            >
              <Option value="ALL" className={optsClass}>
                ALL
              </Option>
              <Option value="BTC" className={optsClass}>
                BTC
              </Option>
              <Option value="ETH" className={optsClass}>
                ETH
              </Option>
              <Option value="XRP" className={optsClass}>
                XRP
              </Option>
              <Option value="ERD" className={optsClass}>
                ERD
              </Option>
            </Select>
          </div>
          <div className="all status">
            <Select
              className="price-card-selector emp"
              defaultValue="filled"
              style={{
                width: "100px",
                padding: "2px",
                border: "none",
              }}
              dropdownStyle={dropdownStyle}
            >
              <Option value="filled" className={optsClass}>
                Filled
              </Option>
              <Option value="open" className={optsClass}>
                Open
              </Option>
              <Option value="cancel" className={optsClass}>
                Cancel
              </Option>
            </Select>
          </div>
        </div>
        <div className="table-content">
          <div className="titles">
            <div className="title" onClick={(_) => handleSort("date")}>
              <span>Date</span>
              <FontAwesomeIcon icon={classes.date} />
            </div>
            <div className="title short" onClick={(_) => handleSort("asset")}>
              <span className="short">Asset</span>
              <FontAwesomeIcon icon={classes.asset} />
            </div>
            <div className="title" onClick={(_) => handleSort("amount")}>
              <span>Amount</span>
              <FontAwesomeIcon icon={classes.amount} />
            </div>
            <div className="title status">
              <span>Status</span>
              <FontAwesomeIcon icon={classes.status} />
            </div>
          </div>
          <div className="lines">{elements}</div>
        </div>
        <div className="pagination">
          {depositsRender.length > 0 && (
            <ReactPaginate
              previousLabel={
                <FontAwesomeIcon className="arrow-prev" icon="angle-left" />
              }
              nextLabel={
                <FontAwesomeIcon className="arrow-next" icon="angle-right" />
              }
              breakLabel={<span className="gap">...</span>}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              forcePage={currentPage}
              containerClassName={"pagination"}
              disabledClassName={"disabled"}
              activeClassName={"num active"}
              pageLinkClassName="num"
            />
          )}
        </div>
      </div>
    </div>
  );
}
