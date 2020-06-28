import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import compareValues from "../../funtions/compareValues";

const Subtable = (props) => {
  const [subOrders, setSubOrders] = useState([]);

  const [classes, setClasses] = useState({
    exchange: "angle-down",
    id: "angle-down",
    amount: "angle-down",
    price: "angle-down",
    status: "angle-down",
  });

  useEffect(
    (_) => {
      if (Array.isArray(props.data)) {
        setSubOrders([...props.data]);
      }
    },
    [props]
  );

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
    let subOrdersSorted = [];
    switch (type) {
      case "exchange":
        sortKey = "exchange";
        subOrdersSorted = subOrders.sort(compareValues(sortKey, sortType));
        setSubOrders([...subOrdersSorted]);
        break;
      case "id":
        sortKey = "id";
        subOrdersSorted = subOrders.sort(compareValues(sortKey, sortType));
        setSubOrders([...subOrdersSorted]);
        break;
      case "amount":
        sortKey = "subOrdQty";
        subOrdersSorted = subOrders.sort(compareValues(sortKey, sortType));
        setSubOrders([...subOrdersSorted]);
        break;
      case "price":
        sortKey = "price";
        subOrdersSorted = subOrders.sort(compareValues(sortKey, sortType));
        setSubOrders([...subOrdersSorted]);
        break;
      case "status":
        sortKey = "status";
        subOrdersSorted = subOrders.sort(compareValues(sortKey, sortType));
        setSubOrders([...subOrdersSorted]);
        break;
      default:
        break;
    }
  };

  const displayStatus = (status) => {
    switch (status) {
      case "NEW":
        return "New";
      case "Partially_filled":
        return "Partial";
      case "FILLED":
        return "Filled";
      case "Canceled":
        return "Canceled";
      default:
        return status;
    }
  };

  return (
    <div className="subtable active" id="subtable0">
      <div className="subline">
        <div className="subtitles">
          <div className="subtitle" onClick={(_) => handleSort("exchange")}>
            <span>Exchange</span>
            <FontAwesomeIcon icon={classes.exchange} />
          </div>
          <div className="subtitle right" onClick={(_) => handleSort("id")}>
            <span>ID</span>
            <FontAwesomeIcon icon={classes.id} />
          </div>
          <div className="subtitle right" onClick={(_) => handleSort("amount")}>
            <span>Amount</span>
            <FontAwesomeIcon icon={classes.amount} />
          </div>
          <div className="subtitle right" onClick={(_) => handleSort("price")}>
            <span>Price</span>
            <FontAwesomeIcon icon={classes.price} />
          </div>
          <div className="subtitle right" onClick={(_) => handleSort("status")}>
            <span>Status</span>
            <FontAwesomeIcon icon={classes.status} />
          </div>
        </div>

        <div className="subcontent">
          {subOrders.map((data, i) => (
            <div className="subline-d" key={i}>
              <span>{data.exchange}</span>
              <span className="right">{data.id}</span>
              <span className="right">{data.subOrdQty}</span>
              <span className="right">{data.price}</span>
              <span className="right filled">{displayStatus(data.status)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subtable;
