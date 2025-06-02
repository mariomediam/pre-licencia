import { useEffect, useMemo, useState } from "react";
import { obtenerEjecucionMes } from "../../../services/siafService";
import MyChart from "../../helpers/MyChart";

export const ChartEjecucionPorMes = ({ anio, sec_ejec }) => {
  const [optionChart, setOptionsChart] = useState({});

  const defaultOption = useMemo(
    () => ({
      title: {
        text: "Ejecución por mes",
        textStyle: {
          fontSize: 20,
        },
        padding: [10, 10, 10, 10],
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dic",
        ],
      },
      yAxis: {
        type: "value",
      },
      legend: {
        data: ["Ejecución"],
        padding: [10, 10, 10, 10],
        
      },
      series: [],
    }),
    []
  );

  useEffect(() => {
    const getOptionsChart = async () => {
      const ejecucion = await obtenerEjecucionMes({ anio, sec_ejec });

      const serieEjecucion = {
        data: ejecucion.map((item) => item.MONTO_DEVENGADO),
        type: "bar",
        name: "Ejecución",
      };

      const series = [serieEjecucion];

      console.log("series", series);

      setOptionsChart({
        ...defaultOption,
        series: series,
      });
    };
    getOptionsChart();
  }, [anio, sec_ejec, defaultOption]);

  return (
    <div
      className="mt-3 p-1 border bg-white"
      style={{ width: "100%", height: "400px" }}
    >
      <MyChart option={optionChart} widthChart="100%" heightChart="400px" />
    </div>
  );
};
