import { useEffect, useMemo, useState } from "react";

import {
  VehiculosAutorizadosMes,
  ComparacionVehiculosAutorizados,
} from "../../../services/indicatorsService";
import MyChart from "../../helpers/MyChart";
import { obtenerNombreMes } from "../../../utils/varios";
import ChevronUp from "../../../icons/ChevronUp";
import { ViewMore } from "../ViewMore";

export const AuthorizedVehicles = ({ anioSelected, title = "" }) => {
  const [vehicles, setVehicles] = useState([]);
  const [total, setTotal] = useState(0);
  const [optionChart, setOptionsChart] = useState({});
  const [variation, setVariation] = useState(0);

  const isPositive = variation > 0;

  const dafaultOption = useMemo(
    () => ({
      xAxis: {
        type: "category",
        boundaryGap: false,
        // data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        show: false,
      },
      yAxis: {
        type: "value",
        show: false,
      },
      series: [
        {
          //   data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          areaStyle: {},
        },
      ],
    }),
    []
  );

  useEffect(() => {
    const getVehiculosVigentes = async () => {
      try {
        const vehiculos = await VehiculosAutorizadosMes(anioSelected);
        const result = Object.groupBy(vehiculos, ({ mes }) => mes);
        const data = [];
        for (const key in result) {
          if (Object.hasOwnProperty.call(result, key)) {
            const element = result[key];
            const total = element.reduce(
              (acc, { q_total }) => acc + q_total,
              0
            );
            data.push({ value: total, name: obtenerNombreMes(key) });
          }
        }

        setVehicles(data);
      } catch (error) {
        console.error(error);
      }
    };
    getVehiculosVigentes();
  }, [anioSelected]);

  useEffect(() => {
    let total = 0;

    total = vehicles.reduce((acc, { value }) => acc + value, 0);
    setTotal(total);

    const xAxisData = vehicles.map(({ name }) => name);
    const seriesData = vehicles.map(({ value }) => value);

    setOptionsChart({
      ...dafaultOption,
      xAxis: { ...dafaultOption.xAxis, data: xAxisData },
      series: [{ ...dafaultOption.series[0], data: seriesData }],
    });
  }, [vehicles, dafaultOption]);

  useEffect(() => {
    const getComparacionVehiculosAutorizados = async () => {
      try {
        const currentDate = new Date();
        const dia =
          anioSelected === currentDate.getFullYear()
            ? currentDate.getDate()
            : 31;
        const mes =
          anioSelected === currentDate.getFullYear()
            ? currentDate.getMonth() + 1
            : 12;

        const { total1, total2 } = await ComparacionVehiculosAutorizados(
          dia,
          mes,
          anioSelected - 1,
          anioSelected
        );

        let percentVariation = 0;
        if (total1 !== 0) {
          percentVariation = ((total2 - total1) / total1) * 100;
        }
        setVariation(percentVariation);
      } catch (error) {
        console.error(error);
      }
    };
    getComparacionVehiculosAutorizados();
  }, [anioSelected]);

  return (
    <div className="d-flex flex-column flex-grow-1 justify-content-between">
      <div>
        <h6>{title} {anioSelected}</h6>
        <div className="d-flex gap-3">
          <div style={{ maxWidth: "100px" }}>
            <h3>{total}</h3>
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
              {Math.round(variation)}%{" "}
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
      </div>
      <ViewMore />
    </div>
  );
};
