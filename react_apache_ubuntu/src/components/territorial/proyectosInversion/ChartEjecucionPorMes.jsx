import { useEffect, useMemo, useState } from "react";
import {
  obtenerEjecucionMes,  
  obtenerMontosPorAnio,
} from "../../../services/siafService";
import MyChart from "../../helpers/MyChart";

export const ChartEjecucionPorMes = ({ anio, sec_ejec }) => {
  const [optionChart, setOptionsChart] = useState({});

  const defaultOption = useMemo(
    () => ({
        title: {
            text: 'Ejecución acumulada por mes',            
            textStyle: {
                fontSize: 20
            },
            padding: [10, 10, 10, 10]

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
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ["PIM", "Ejecución acumulada"],
        
      },
      series: [
        //   {
        //     name: 'PIM',
        //     type: 'line',
        //     stack: 'Total',
        //     data: [120, 132, 101, 134, 90, 230, 210]
        //   },
        //   {
        //     name: 'Ejecución',
        //     type: 'line',
        //     stack: 'Total',
        //     data: [220, 182, 191]
        //   },
      ],
    }),
    []
  );

  const acumuladoPorMes = (ejecucion) => {
    let acumulado = 0;
    return ejecucion.map((item) => {
      acumulado += item.MONTO_DEVENGADO;
      return {
        ...item,
        MONTO_DEVENGADO_ACUM: acumulado,
      };
    });
  };

  useEffect(() => {
    const getOptionsChart = async () => {
      const ejecucion = await obtenerEjecucionMes({ anio, sec_ejec });      
      const montosPorAnio = await obtenerMontosPorAnio({ anio, sec_ejec });

      const pim = montosPorAnio.MONTO_PIM;

      const seriePim = {
        data: Array.from({ length: 12 }, () => pim),
        type: "line",
        name: 'PIM',
      };

      const serieEjecucion = {
        data: acumuladoPorMes(ejecucion).map(
          (item) => item.MONTO_DEVENGADO_ACUM.toFixed(2)
        ),
        type: "line",
        name: 'Ejecución acumulada',
      };

    //   const serieEjecucionEsperada = {
    //     data: acumuladoPorMes(ejecucionEsperada).map(
    //       (item) => item.MONTO_MAXIMO
    //     ),
    //     type: "line",
    //   };

      console.log(ejecucion);
      

      const series = [seriePim, serieEjecucion];

      console.log(series);

      setOptionsChart({
        ...defaultOption,
        // xAxis: xAxis,
        series: series,
      });
    };
    getOptionsChart();
  }, [anio, sec_ejec, defaultOption]);

  return (
    <div className="mt-5 p-1 border bg-white" style={{ width: "100%", height: "400px" }}>
      <MyChart option={optionChart} widthChart="100%" heightChart="400px"/>
    </div>
  );
};
