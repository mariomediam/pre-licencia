import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { InfraccionesTransporte } from "../../../services/indicatorsService";
import MyChart from "../../helpers/MyChart";

export const TransportationTicketsAnual = () => {
  const [optionChart, setOptionsChart] = useState({});
  const [formatData, setFormatData] = useState([]);
  const { anio: anioSelected } = useParams();

  const defaultOption = useMemo(
    () => ({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {},
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
      },
      yAxis: {
        type: "category",
      },
      series: [],
    }),
    []
  );

  useEffect(() => {
    const getVehiculosVigentes = async () => {
      try {
        const infracciones = await InfraccionesTransporte();
        setFormatData(infracciones);
        const listAnios = infracciones.map(({ anio }) => anio).reverse(); // Orden descendente        
        const series = [
          {
            name: "Infracciones",
            type: "bar",
            stack: "total",
            label: {
              show: true,
              position: "right",
               
            },
            itemStyle: {
              color: "#FF7070",
            },
            emphasis: {
              focus: "series",
            },
            data: infracciones.map(({ q_total }) => q_total).reverse(),
          },
        ];

        setOptionsChart({
          ...defaultOption,
          yAxis: {
            ...defaultOption.yAxis,
            data: listAnios,
          },
          series,
        });
      } catch (error) {
        console.error(error);
      }
    };
    getVehiculosVigentes();
  }, [anioSelected, defaultOption]);

  return (
    <div className="d-flex flex-column flex-grow-1 justify-content-between">
      <div className="d-flex flex-column align-items-center gap-2">
        <div className="d-flex gap-5 flex-wrap justify-content-center">
          <MyChart
            option={optionChart}
            widthChart="400px"
            heightChart="600px"
          />
          <div className="d-flex justify-content-center">
            <table className="table">
              <thead>
                <tr>
                  <th className="px-3">Año</th>
                  <th className="px-3">Infracciones</th>
                </tr>
              </thead>
              <tbody>
                {formatData?.map(({ anio, q_total }, index) => (
                  <tr key={anio} className="py-0 my-0">
                    <td className="py-0 text-end">{anio}</td>
                    <td className="py-0 text-end">{q_total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
