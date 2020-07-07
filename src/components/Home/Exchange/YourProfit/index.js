import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './index.css';
const urlBase = process.env.REACT_APP_BACKEND;

const YourProfit = () => {
  const symbol = useSelector((state) => state.general.symbol);
  const qtyForm = useSelector((state) => state.general.qtyForm);
  const sideForm = useSelector((state) => state.general.sideForm);
  const mode = useSelector((state) => state.general.mode);
  const [profits, setProfits] = useState('');
  const [profits2, setProfits2] = useState([]);

  let style;
  if (mode === 'Dark') {
    style = { color: 'white' };
  } else {
    style = { color: ' rgb(139, 139, 139)' };
  }

  /* FORMATING NUMBERS STATE*/
  //Aca inicia las funciones que se encargan de darle un formato a cada valor que se muestra en pantalla
  //a traves de la data que viene del back end
  const initialState = {
    minQty: 0,
    maxQty: 0,
    minPrice: 0,
    maxPrice: 0,
    pricePrecision: 0,
    qtyPrecision: 0,
    baseAssetPrecision: 0,
    quoteAssetPrecision: 0,
  };
  const [formatingPair, setformatingPair] = useState(initialState);

  useEffect(() => {
    setformatingPair(initialState);
  }, [symbolA, symbolB]);

  useEffect(() => {
    if (supportTradingPairs.length > 0) {
      if (formatingPair.pricePrecision === 0 && formatingPair.maxPrice === 0) {
        supportTradingPairs.forEach((pair) => {
          if (pair.symbolA === symbolA && pair.symbolB === symbolB) {
            setformatingPair({
              ...formatingPair,
              minQty: pair.minQty,
              maxQty: pair.maxQty,
              minPrice: pair.minPrice,
              maxPrice: pair.maxPrice,
              pricePrecision: pair.pricePrecision,
              qtyPrecision: pair.qtyPrecision,
              baseAssetPrecision: pair.baseAssetPrecision,
              quoteAssetPrecision: pair.quoteAssetPrecision,
            });
          }
        });
      }
    }
  }, [supportTradingPairs, formatingPair]);
  /* END OF FORMATING NUMBERS STATE SECTION*/

  const loadBenefits = () => {
    let quantity = qtyForm;
    if (qtyForm === '') quantity = 0;
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
              benefitBtc: parseFloat(result[key].benefitBtc).toFixed(
                formatingPair.quoteAssetPrecision
              ),
              benefitPct: parseFloat(result[key].benefitPct).toFixed(
                formatingPair.quoteAssetPrecision
              ),
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
        console.log('err: ', err);
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
      <Slide key={key} index={key} className="slide">
        <p
          style={{
            color: `rgb(120,133,169)`,
            fontWeight: '900',
            fontSize: '18px',
          }}
        >
          {res.name}
        </p>
        <p style={{ fontSize: '12px' }}>+ {res.benefitPct} %</p>
        <p style={{ fontSize: '12px' }}>+ {res.benefitBtc} BTC </p>
      </Slide>
    );
  });

  if (profits2.length === 0) {
    return (
      <section className="your-profit">
        <div>
          <h2 style={{ textAlign: 'center' }}>Enter an amount to get your profits</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="your-profit">
      <h2>Your Profits</h2>

      <div className={`your-profit-data`}>
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={25}
          totalSlides={3}
          interval={5000}
          isPlaying
          infinite
        >
          <Slider>{prof}</Slider>
        </CarouselProvider>
      </div>
    </section>
  );
};

export default YourProfit;
