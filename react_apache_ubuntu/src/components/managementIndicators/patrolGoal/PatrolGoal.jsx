import { useMemo } from "react";

import MyChart from "../../helpers/MyChart";
import { ViewMore } from "../ViewMore";

export const PatrolGoal = ({ anioSelected, title = "" }) => {
  
    const dafaultOption = useMemo(
    () => ({
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["Programado", "Validado"],
      },
      toolbox: {
        show: true,
      },
      calculable: true,
      xAxis: [
        {
          type: "category",
          // prettier-ignore
          data: ['Ago', 'Sep', 'Oct', 'Nov'],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Programado",
          type: "bar",
          data: [341, 330, 341, 330],
          label: {
            show: true,
            position: "top",
          },          
        },
        {
          name: "Validado",
          type: "bar",
          data: [242, 239, 324, 307],
          label: {
            show: true,
            position: "top",
          },
        },
      ],
    }),
    []
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
      <ViewMore url={`/indicadores/ocurrencias-mes/${anioSelected}`} />
    </div>
  );
};
