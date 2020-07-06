import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Line from "../Line2";
import { compareValuesLTH, compareValuesHTL } from "../functions/compareValues";
import "./index.scss";

const PairDrop2 = ({ handleWrapper, History }) => {
  /* REDUX */
  const dispatch = useDispatch();
  const tickers = useSelector((state) => state.general.tickers);
  const assets = useSelector((state) => state.general.assets);

  const setChange = useCallback(
    (data) => dispatch({ type: "SetChange", payload: data }),
    [dispatch]
  );
  const setHigh = useCallback(
    (data) => dispatch({ type: "SetHigh", payload: data }),
    [dispatch]
  );
  const setLow = useCallback(
    (data) => dispatch({ type: "SetLow", payload: data }),
    [dispatch]
  );
  const setVol = useCallback(
    (data) => dispatch({ type: "SetVol", payload: data }),
    [dispatch]
  );
  const setLastPrice = useCallback(
    (data) => dispatch({ type: "SetLastPrice", payload: data }),
    [dispatch]
  );
  const setSymbolA = useCallback(
    (data) => dispatch({ type: "SetSymbolA", payload: data }),
    [dispatch]
  );
  const setSymbolB = useCallback(
    (data) => dispatch({ type: "SetSymbolB", payload: data }),
    [dispatch]
  );
  /* REDUX */

  /* ESTADOS DEL MODULO */
  const [assetsRender, setAssets] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(
    ""
  ); /* ES EL FILTRO QUE VOY A USAR PARA MOSTRAR LAS FILAS */
  const [lines, setLines] = useState([]);
  const [, /* linesSetted */ setlinesSetted] = useState(false);
  const [favs, setFavs] = useState(false);
  const [searcher, setsearcher] = useState("");
  /* ESTADOS DEL MODULO */

  useEffect(
    /* Este useeffect se encargar de settear por primera vez el symbol B que se va a usar para mostrar las lineas */
    (_) => {
      if (localStorage.getItem("currentQuote") && assets.assets1) {
        setCurrentQuote(localStorage.getItem("currentQuote"));
      } else if (assets.assets1) {
        setCurrentQuote(assets.assets1[0]);
      }
    },
    [assets]
  );

  useEffect(() => {
    /* Este use Effect se encargara de construir el array que genere todos las filas  */
    let auxpairs = [],
      linesSorted;
    if (tickers) {
      for (const pair in tickers) {
        let fav = false;
        if (
          localStorage.getItem("fav") &&
          JSON.parse(localStorage.getItem("fav"))[pair]
        ) {
          fav = JSON.parse(localStorage.getItem("fav"))[pair];
        }
        let symbol = pair.split("-");
        auxpairs.push({
          symbolA: symbol[0],
          symbolB: symbol[1],
          pair,
          change24h: tickers[pair].change24h,
          lastPrice: parseFloat(tickers[pair].lastPrice),
          vol24h: parseFloat(tickers[pair].vol24h),
          fav,
        });
      }

      function auxChoose(compareFunction, auxpairs) {
        linesSorted = compareFunction(
          JSON.parse(localStorage.getItem("sortLines")).name,
          JSON.parse(localStorage.getItem("sortLines")).sortType,
          auxpairs
        );
      }

      if (localStorage.getItem("sortLines")) {
        if (JSON.parse(localStorage.getItem("sortLines")).order === "asc") {
          /* se mantiene ascente */
          auxChoose(compareValuesLTH, auxpairs);
        } else {
          /* se mantiene descendente */
          auxChoose(compareValuesHTL, auxpairs);
        }

        /*  linesSorted = compareValuesLTH(JSON.parse(localStorage.getItem('sortLines')).name, JSON.parse(localStorage.getItem('sortLines')).sortType, auxpairs) */

        if (searcher !== "") {
          setLines(
            linesSorted.filter((e) => {
              let replace = "^" + searcher;
              let regex = new RegExp(replace, "i");
              return regex.test(e.symbolA);
            })
          );
        } else {
          setLines([...linesSorted]);
        }
      } else {
        if (searcher === "") setLines([...auxpairs]);
      }

      setlinesSetted(true);
    }
  }, [
    tickers["BTC-USDT"],
    tickers["XRP-USDT"],
    tickers["ERD-USDT"],
    tickers["ETH-BTC"],
    tickers["XRP-BTC"],
    searcher,
    favs,
  ]);

  useEffect(() => {
    /* Este se encargara de volver a renderizar los assets, para saber quien esta activo o no */
    updateRenderAssets();
  }, [currentQuote]);

  const updateRenderAssets = (_) => {
    /* Esta funcion se encarga de renderizar los symbolos B que existen con todo y su efecto de activo, trabaja con esto  const [assetsRender, setAssets] = useState([]); */
    const changeSymbolB = (symbol) => {
      localStorage.setItem("currentQuote", symbol);
      if (localStorage.getItem("sortLines"))
        localStorage.removeItem("sortLines");
      setCurrentQuote(symbol);
      setlinesSetted(false);
    };
    let auxTab = ["FAVS"];
    auxTab = auxTab.concat(assets.assets1);
    setAssets(
      /*   <span className="active" key={i} onClick={_ => changeSymbolB(e)}> */
      auxTab.map((res, key) => {
        let QUOTE = res;
        if (res === "FAVS") {
          if (currentQuote === "FAVS") {
            QUOTE = (
              <FontAwesomeIcon icon="star" style={{ color: "#00bbff" }} />
            );
          } else {
            QUOTE = <FontAwesomeIcon icon={["far", "star"]} />;
          }
        }
        return (
          <span
            key={key}
            className={currentQuote === res ? "active" : ""}
            key={key}
            onClick={(_) => changeSymbolB(res)}
          >
            {QUOTE}
          </span>
        );
      })
    );
  };

  const handleChange = (e) => {
    /* Este handle change es para la barra de busqueda */
    let field = e.target.value;
    setsearcher(e.target.value);
    if (field === "") {
      setlinesSetted(false);
    } else {
      setLines(
        lines.filter((e) => {
          let replace = "^" + field;
          let regex = new RegExp(replace, "i");
          return regex.test(e.symbolA);
        })
      );
    }
  };

  /* Esta funcion cambia el par acutal, se debe de usar en cada linea */
  const handlePair = (symbolA, symbolB) => {
    setChange(0);
    setLow(0);
    setHigh(0);
    setVol(0);
    setLastPrice(0);
    setSymbolA(symbolA);
    setSymbolB(symbolB);
    History.history.push(`/trade/${symbolA}_${symbolB}`);
    /* localStorage.setItem('actualPair',`${symbolA}-${currentQuote}`) */
    handleWrapper();
  };

  /* Esta funcion se encarga de ordenar las filas segun el boton que se toque */
  const handleSort = (name, sortType) => {
    let linesSorted = [];
    function auxChoose(compareFunction, order) {
      linesSorted = compareFunction(name, sortType, lines);
      setLines([...linesSorted]);
      localStorage.setItem(
        "sortLines",
        JSON.stringify({ name, sortType, order })
      );
    }
    /* Se tomara del local estorage el tipo de sort que halla, y dependiendo de un asc o des se ordenara de esa manera */
    if (JSON.parse(localStorage.getItem("sortLines"))) {
      if (JSON.parse(localStorage.getItem("sortLines")).sortType === sortType) {
        if (JSON.parse(localStorage.getItem("sortLines")).order === "asc") {
          /* Si es igual y esta ascendente se guarda descendente */
          auxChoose(compareValuesHTL, "des");
        } else {
          /* Si es igual y esta descentende se guarda ascendente */
          auxChoose(compareValuesLTH, "asc");
        }
      } else {
        auxChoose(compareValuesLTH, "asc");
        /* Si no es igual y esta ascendente se guarda ascendete */
        console.log(
          "no son iguales se guarde ascendente",
          JSON.parse(localStorage.getItem("sortLines"))
        );
      }
    } else {
      /* Si no existe se crea */
      auxChoose(compareValuesLTH, "asc");
    }
  };

  return (
    <div className="pair-drop js-pair-drop">
      <div className="titles">{assetsRender}</div>
      <div className="search">
        <div className="input">
          <input
            type="text"
            placeholder="Search pair"
            onChange={handleChange}
            value={searcher}
          />
          <FontAwesomeIcon icon="search" />
        </div>
      </div>
      <div className="pair-table">
        <div className="titles-p" style={{ marginBottom: "0" }}>
          <div
            className="title"
            style={{ display: "flex", justifyContent: "center" }}
            onClick={(_) => handleSort("symbolA", "letter")}
          >
            <span>Pair</span>
            <FontAwesomeIcon icon="angle-down" size="lg" />
          </div>
          <div
            className="title short"
            style={{ display: "flex", justifyContent: "center" }}
            onClick={(_) => handleSort("lastPrice", "number")}
          >
            <span>Last Pr.</span>
            <FontAwesomeIcon icon="angle-down" size="lg" />
          </div>
          <div
            className="title short"
            style={{ display: "flex", justifyContent: "center" }}
            onClick={(_) => handleSort("vol24h", "number")}
          >
            <span>24h Vol</span>
            <FontAwesomeIcon icon="angle-down" size="lg" />
          </div>
          <div
            className="title chg"
            style={{ display: "flex", justifyContent: "center" }}
            onClick={(_) => handleSort("change24h", "number")}
          >
            <span>24h Change</span>
            <FontAwesomeIcon icon="angle-down" size="lg" />
          </div>
        </div>

        <div className="lines">
          <div className="part">
            {lines.map((res, key) => {
              if (currentQuote === "FAVS" && res.fav === true) {
                return (
                  <Line
                    key={key}
                    handlePair={handlePair}
                    favourite={favs}
                    setFavs={setFavs}
                    data={res}
                  />
                );
              }
              if (currentQuote === res.symbolB) {
                return (
                  <Line
                    key={key}
                    handlePair={handlePair}
                    favourite={favs}
                    setFavs={setFavs}
                    data={res}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PairDrop2;
