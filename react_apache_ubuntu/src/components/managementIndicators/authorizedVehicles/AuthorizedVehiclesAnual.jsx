import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ComparacionVehiculosAutorizados } from "../../../services/indicatorsService";
import MyChart from "../../helpers/MyChart";

export const AuthorizedVehiclesAnual = () => {
  const [optionChart, setOptionsChart] = useState({});
  const [formatData, setFormatData] = useState({});
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
        const vehiculos = await ComparacionVehiculosAutorizados(0, 0, 0, 0, 2);
        const objAnios = Object.groupBy(vehiculos, ({ anio }) => anio);
        const objTipos = Object.groupBy(vehiculos, ({ grouped }) => grouped);

        const listTipos = Object.keys(objTipos);
        const listAnios = Object.keys(objAnios).reverse(); // Orden descendente

        const series = listTipos.map((keyTipo) => {
          const objAniosporTipo = Object.groupBy(
            objTipos[keyTipo],
            ({ anio }) => anio
          );
          return {
            name: keyTipo,
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: listAnios.map((anio) =>
              objAniosporTipo[anio]
                ? objAniosporTipo[anio].reduce(
                    (acc, { q_total }) => acc + q_total,
                    0
                  )
                : 0
            ),
          };
        });

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

  useEffect(() => {
    if (!optionChart.series || optionChart.series.length === 0) return;

    const seriesData = optionChart.series.map((serie) => ({
      ...serie,
      data: serie.data.reverse(),
    }));

    const tipos = seriesData.map((serie) => serie.name);
    tipos.push("TOTAL");    

    seriesData.push({
      name: "TOTAL",
      type: "line",
      stack: "total",
      label: {
        show: true,
      },
      emphasis: {
        focus: "series",
      },
      data: seriesData.reduce(
        (acc, { data }) => data.map((value, index) => acc[index] + value),
        Array(seriesData[0].data.length).fill(0)
      ),
    });

    setFormatData({
      tipos: tipos,
      anios: [...optionChart.yAxis.data].reverse(),
      series: seriesData,
    });
  }, [optionChart]);

  return (
    <div className="d-flex flex-column flex-grow-1 justify-content-between">
      <div className="d-flex flex-column align-items-center gap-2">
        <div className="d-flex gap-5 flex-wrap justify-content-center">
          <MyChart
            option={optionChart}
            widthChart="400px"
            heightChart="400px"
          />
          <div className="d-flex justify-content-center">
            <table className="table">
              <thead>
                <tr>
                  <th className="px-3"></th>
                  {formatData?.tipos?.map((tipo) => (
                    <th key={tipo} className="px-3">
                      {tipo}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {formatData?.anios?.map((anio, index) => (
                  <tr key={anio} className="py-0 my-0">
                    <td className="py-0 text-end">{anio}</td>
                    {formatData?.series?.map((serie) => (
                      <td key={serie.name} className="py-0 text-end">
                        {serie.data[index]}
                      </td>
                    ))}
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
