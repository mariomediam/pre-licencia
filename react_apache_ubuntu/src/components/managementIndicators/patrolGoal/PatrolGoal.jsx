import { useMemo } from "react";

import MyChart from "../../helpers/MyChart";
import { ViewMore } from "../ViewMore";

import upIcon from "../../../assets/images/indicators/thumb-up.png";
import downIcon from "../../../assets/images/indicators/thumb-down.png";

export const PatrolGoal = ({ anioSelected, title = "" }) => {
  const urlUpIcon = `image://${upIcon}`;
  const urlDownIcon = `image://${downIcon}`;

  const rawData = useMemo(
    () => [
      [70, 72, 96, 94],
      [30, 28, 4, 6],
    ],
    []
  );
  const totalData = useMemo(() => [100, 100, 100, 100], []);

  const cumplimientoPorcentajes = rawData[0].map((cumplido, index) => {
    const total = totalData[index];
    return total <= 0 ? 0 : cumplido / total;
  });

  const series = useMemo(
    () => [
      {
        name: "CUMPLIDO",
        type: "bar",
        stack: "total",
        barWidth: "60%",
        label: {
          show: true,
          formatter: (params) => Math.round(params.value * 1000) / 10 + "%",
        },
        data: rawData[0].map((d, did) =>
          totalData[did] <= 0 ? 0 : d / totalData[did]
        ),

        markPoint: {
          data: cumplimientoPorcentajes.map((porcentaje, index) => ({
            xAxis: index,
            y: porcentaje,
            symbol: porcentaje >= 0.75 ? urlUpIcon : urlDownIcon,
            symbolSize: 20,
            symbolOffset: [0, 40],
          })),
          label: {
            show: false,
          },
        },
      },
      {
        name: "FALTANTE",
        type: "bar",
        stack: "total",
        barWidth: "60%",
        label: {
          show: true,
          formatter: (params) => Math.round(params.value * 1000) / 10 + "%",
        },
        data: rawData[1].map((d, did) =>
          totalData[did] <= 0 ? 0 : d / totalData[did]
        ),
      },
    ],
    [rawData, totalData, urlUpIcon, urlDownIcon, cumplimientoPorcentajes]
  );

  const dafaultOption = useMemo(
    () => ({
      legend: {
        selectedMode: false,
      },
      grid: {
        // top: "3%",
        bottom: "5%",
        containLabel: true,
      },
      yAxis: {
        type: "value",
      },
      xAxis: {
        type: "category",
        data: ["Ago", "Sep", "Oct", "Nov"],
      },
      series,
    }),
    [series]
  );

  return (
    <div className="d-flex flex-column flex-grow-1 justify-content-between">
      <div>
        <h6>
          {title} {anioSelected}
        </h6>
        {/* <h3>{totalOccurrences}</h3> */}

        <div className="d-flex justify-content-center align-items-center">
          <MyChart
            option={dafaultOption}
            widthChart="350px"
            heightChart="200px"
          />{" "}
        </div>
        <small style={{fontSize: "0.7rem"}}>
          El patrullaje cumple la meta si el porcentaje es mayor o igual al 75%.
        </small>
      </div>
      <ViewMore url={`/indicadores/patullaje-meta/${anioSelected}`} />
    </div>
  );
};
