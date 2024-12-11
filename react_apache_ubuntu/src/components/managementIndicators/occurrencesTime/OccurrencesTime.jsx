import { useEffect, useMemo, useState } from "react";

import { OcurrenciasxAnio } from "../../../services/indicatorsService";
import MyChart from "../../helpers/MyChart";
import { obtenerNombreMes } from "../../../utils/varios";
import { ViewMore } from "../ViewMore";

export const OccurrencesTime = ({ anioSelected, title = "" }) => {
  const [dataOccurrence, setDataOccurrence] = useState([]);
  const [totalOccurrences, setTotalOccurrences] = useState(0);
  const [optionChart, setOptionsChart] = useState({});

  const dafaultOption = useMemo(
    () => ({
      // tooltip: {
      //   trigger: "axis",
      //   axisPointer: { type: "cross" },
        
      // },
      xAxis: {
        type: "category",
        // boundaryGap: false,
        // data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        show: true,
      },
      grid: {
        top: "8%",
        bottom: "15%",
        // left: "10%", // 
        containLabel: true,

      },
      yAxis: {
        type: "value",
        show: true,

      },
      series: [
        {
          //   data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "bar",
          // areaStyle: {},
          // smooth: true,
          barWidth: "60%",
          label: {
            show: true,
            position: "top",
            // formatter: (params) => Math.round(params.value * 1000) / 10 + "%",
          },
        },
      ],
    }),
    []
  );

  useEffect(() => {
    const getOccurrences = async () => {
      try {
        const params = {
          anio: anioSelected,
          opcion: "02",
        };
        const dataOccurrence = await OcurrenciasxAnio(params);

        // Agrupar por mes
        const objMes = Object.groupBy(dataOccurrence, ({ mes }) => mes);

        // Sumar los totales de cada mes
        const data = [];
        let sumOccurrences = 0;
        for (const key in objMes) {
          if (Object.hasOwnProperty.call(objMes, key)) {
            const element = objMes[key];
            const total = element.reduce(
              (acc, { q_total }) => acc + q_total,
              0
            );
            data.push({ name: obtenerNombreMes(key), value: total });
            sumOccurrences += total;
          }
        }
        setTotalOccurrences(sumOccurrences);
        setDataOccurrence(data);
      } catch (error) {
        throw error;
      }
    };
    getOccurrences();
  }, [anioSelected]);

  useEffect(() => {
    const xAxisData = dataOccurrence.map(({ name }) => name);
    const seriesData = dataOccurrence.map(({ value }) => value);

    setOptionsChart({
      ...dafaultOption,
      xAxis: { ...dafaultOption.xAxis, data: xAxisData },
      series: [{ ...dafaultOption.series[0], data: seriesData }],
    });
  }, [dataOccurrence, dafaultOption]);

  return (
    <div className="d-flex flex-column flex-grow-1 justify-content-between">
      <div>
        <h6>
          {title} {anioSelected}
        </h6>
        <h3>{totalOccurrences}</h3>

        <div className="d-flex justify-content-center align-items-center">
          <MyChart
            option={optionChart}
            widthChart="350px"
            heightChart="200px"
          />{" "}
        </div>
      </div>
      <ViewMore url={`/indicadores/ocurrencias-mes/${anioSelected}`} />
    </div>
  );
};
