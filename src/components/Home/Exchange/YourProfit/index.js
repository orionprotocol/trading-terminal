import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel, { consts } from "react-elastic-carousel";
import "./index.css";
const urlBase = process.env.REACT_APP_BACKEND;

const YourProfit = () => {
  const { symbol, qtyForm, sideForm, mode, symbolB } = useSelector(
    (state) => state.general
  );
  const [profits, setProfits] = useState("");
  const [profits2, setProfits2] = useState([]);

  let style;
  if (mode === "Dark") {
    style = { color: "white" };
  } else {
    style = { color: " rgb(139, 139, 139)" };
  }

  const myArrow = () => {
    return <></>;
  };

  const loadBenefits = () => {
    let quantity = qtyForm;
    if (qtyForm === "") quantity = 0;
    let url = `${urlBase}/api/v1/order-benefits?symbol=${symbol}&ordQty=${quantity}&side=${sideForm}`;
    let aux = [],
      result;

    axios
      .get(url)
      .then((res) => {
        result = res.data;

        for (let key in result) {
          if (Number(result[key].benefitPct) !== 0) {
            aux.push({
              name: key,
              benefitBtc: parseFloat(result[key].benefitBtc).toFixed(8),
              benefitPct: parseFloat(result[key].benefitPct).toFixed(8),
            });
          }
        }
        aux = aux.sort(function (a, b) {
          if (b.benefitBtc > a.benefitBtc) {
            return 1;
          }
          if (b.benefitBtc < a.benefitBtc) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        if (aux.length > 0) {
          /* setProfits(createProfits(aux)) */
          setProfits2(aux);
        } else {
          /* setProfits('') */
          setProfits2([]);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  useEffect(
    (_) => {
      loadBenefits();
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [symbol, qtyForm, sideForm]
  );

  let prof = profits2.map((res, key) => {
    return (
      <span key={key}>
        <label
          style={{
            color: `rgb(120,133,169)`,
            fontWeight: "900",
            fontSize: "18px",
          }}
        >
          {res.name}
        </label>
        <label style={{ fontSize: "12px" }}>+ {res.benefitPct} %</label>
        <label style={{ fontSize: "12px" }}>+ {res.benefitBtc} BTC </label>
      </span>
    );
  });

  if (profits2.length === 0) {
    return (
      <section className="your-profit">
        <div>
          <h2 style={{ textAlign: "center" }}>
            Enter an amount to get your profits
          </h2>
        </div>
      </section>
    );
  }

  if (prof === "") {
    return (
      <section className="your-profit">
        <div>
          <h2 style={{ textAlign: "center" }}>
            Enter an amount to get your profits
          </h2>
        </div>
      </section>
    );
  }
  return (
    <section className="your-profit">
      <h2>Your Profits</h2>

      <div className={`your-profit-data`}>
        <Carousel
          renderArrow={myArrow}
          enableAutoPlay
          autoPlaySpeed={5000}
          itemsToShow={1}
          renderPagination={() => {
            return <div></div>;
          }}
        >
          {prof}
        </Carousel>
      </div>
    </section>
  );
};

export default YourProfit;
