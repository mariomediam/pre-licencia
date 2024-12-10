import { useMemo } from "react";

import MyChart from "../../helpers/MyChart";
import { ViewMore } from "../ViewMore";

export const PatrolGoal = ({ anioSelected, title = "" }) => {
  const rawData = [
    [70, 72, 96, 94],
    [30, 28, 4, 6],
  ];
  const totalData = [100, 100, 100, 100];

  const series = ["Cumplido", "Faltante"].map((name, sid) => {
    return {
      name,
      type: "bar",
      stack: "total",
      barWidth: "60%",
      label: {
        show: true,
        formatter: (params) => Math.round(params.value * 1000) / 10 + "%",
        fontSize: 10,
      },
      data: rawData[sid].map((d, did) =>
        totalData[did] <= 0 ? 0 : d / totalData[did]
      ),
    };
  });

  const dafaultOption = useMemo(
    () => ({
      legend: {
        selectedMode: false,
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
      </div>
      <ViewMore url={`/indicadores/patullaje-meta/${anioSelected}`} />
    </div>
  );
};
