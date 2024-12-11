import { useEffect, useMemo, useState } from "react";

import {
  MontosPapeleta,
  ComparacionMontosPapeleta,
} from "../../../services/indicatorsService";
import MyChart from "../../helpers/MyChart";
import { formatNumber, obtenerNombreMes } from "../../../utils/varios";
import ChevronUp from "../../../icons/ChevronUp";
import { ViewMore } from "../ViewMore";

export const AmountsTransitTickets = ({ anioSelected, title = "" }) => {
  const [collection, setCollection] = useState([]);
  const [total, setTotal] = useState(0);
  const [optionChart, setOptionsChart] = useState({});
  const [variation, setVariation] = useState(0);
  const [isLoadingCollection, setIsLoadingCollection] = useState(false);
  const [isLoadingComparation, setIsLoadingComparation] = useState(false);

  const isPositive = variation >= 0;

  const dafaultOption = useMemo(
    () => ({
      grid: {
        top: "20%",
        bottom: "5%",
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        // data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        show: true,
        nameTextStyle: {
            fontSize: 8
          }
      },
      yAxis: {
        type: "value",
        show: false,
      },
      series: [
        {
          //   data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "bar",
        //   areaStyle: {},
        },
      ],
    }),
    []
  );

  useEffect(() => {
    const getAmounts = async () => {
      try {
        setIsLoadingCollection(true);
        const params = {
          anio: anioSelected,
          tipo: "OM",
        };

        const data = await MontosPapeleta(params);

        setCollection(data);        
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingCollection(false);
      }
    };
    getAmounts();
  }, [anioSelected]);

  useEffect(() => {
    let total = 0;

    total = collection.reduce((acc, { Total }) => acc + Total, 0);
    setTotal(total);

    const xAxisData = collection.map(({ Mes }) => obtenerNombreMes(Mes)[0]);    
    const seriesData = collection.map(({ Total }) => Total);

    setOptionsChart({
      ...dafaultOption,
      xAxis: { ...dafaultOption.xAxis, data: xAxisData },
      series: [{ ...dafaultOption.series[0], data: seriesData }],
    });
  }, [collection, dafaultOption]);

  useEffect(() => {
    const getComparacionVehiculosAutorizados = async () => {
      try {
        setIsLoadingComparation(true);
        const currentDate = new Date();
        const dia =
          anioSelected === currentDate.getFullYear()
            ? currentDate.getDate()
            : 31;
        const mes =
          anioSelected === currentDate.getFullYear()
            ? currentDate.getMonth() + 1
            : 12;

        const params = {
          dia,
          mes,
          anio01: anioSelected - 1,
          anio02: anioSelected,
        };

        const { total1, total2 } = await ComparacionMontosPapeleta(params);
        

        let percentVariation = 0;
        if (total1 !== 0) {
          percentVariation = ((total2 - total1) / total1) * 100;
        }
        setVariation(percentVariation);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingComparation(false);
      }
    };
    getComparacionVehiculosAutorizados();
  }, [anioSelected]);

  return (
    <div
      className="d-flex flex-column flex-grow-1 justify-content-between"
      style={{ maxWidth: "260px" }}
    >
      <div>
        <h6>
          {title} {anioSelected}
        </h6>

        {isLoadingCollection || isLoadingComparation ? (
          <div className="d-flex align-items-center justify-content-center h-100 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="d-flex gap-3">
            <div style={{ maxWidth: "100px" }}>
              <div className="d-flex">
                <span className="text-muted" style={{ fontSize: "0.7rem" }}>
                  S/
                </span>
                <h5>{formatNumber(total, 2).split(".")[0]}</h5>
              </div>
              <span
                className="circle-icon me-1"
                style={{
                  backgroundColor: isPositive ? "#67FD09" : "#F6D5AF",
                  transform: `rotate(${isPositive ? 0 : 180}deg)`,
                }}
              >
                <ChevronUp
                  width={14}
                  height={14}
                  className={isPositive ? "text-success" : "text-danger"}
                />
              </span>
              <small className={isPositive ? "text-success" : "text-danger"}>
                {formatNumber(variation, 2)}%{" "}
              </small>
              <p
                style={{ lineHeight: 1 }}
                className={isPositive ? "text-success" : "text-danger"}
              >
                <small style={{ fontSize: "0.7rem" }}>
                  Comparado con el año anterior
                </small>
              </p>
            </div>
            <div>
              <MyChart
                option={optionChart}
                widthChart="150px"
                heightChart="100px"
              />{" "}
            </div>
          </div>
        )}
      </div>
      <ViewMore url={`/indicadores/montos-papeleta/${anioSelected}`} />
    </div>
  );
};
