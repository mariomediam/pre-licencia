import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { VehiculosAutorizadosMes } from "../../../services/indicatorsService";
import MyChart from "../../helpers/MyChart";
import { obtenerNombreMes } from "../../../utils/varios";

export const AuthorizedVehiclesMonthly = () => {
  const [total, setTotal] = useState(0);
  const [optionChart, setOptionsChart] = useState({});
  const [formatData, setFormatData] = useState({});

  const { anio: anioSelected } = useParams();

  const defaultOption = useMemo(
    () => ({
      // title: {
      //   text: 'Autorizaciones emitidas por mes',
      // },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        // data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [],
    }),
    []
  );

  useEffect(() => {
    const getVehiculosVigentes = async () => {
      try {
        const vehiculos = await VehiculosAutorizadosMes(anioSelected);

        let total = 0;

        total = vehiculos.reduce((acc, { q_total }) => acc + q_total, 0);
        setTotal(total);

        const objTipos = Object.groupBy(vehiculos, ({ tipo }) => tipo);
        const objMeses = Object.groupBy(vehiculos, ({ mes }) => mes);

        const listTipos = Object.keys(objTipos);
        const listMeses = Object.keys(objMeses);

        const series = [];
        for (const keyTipo of listTipos) {
          if (Object.hasOwnProperty.call(objTipos, keyTipo)) {
            const objMesesporTipo = Object.groupBy(
              objTipos[keyTipo],
              ({ mes }) => mes
            );
            const serie = {
              name: keyTipo,
              data: [],
              type: "line",
              stack: "Total",
              areaStyle: {},
              emphasis: {
                focus: "series",
              },
            };
            for (const mes of listMeses) {
              let monto = 0;
              if (Object.hasOwnProperty.call(objMesesporTipo, mes)) {
                monto = objMesesporTipo[mes].reduce(
                  (acc, { q_total }) => acc + q_total,
                  0
                );
              }
              serie.data.push(monto);
            }
            series.push(serie);
          }
        }

        setOptionsChart({
          ...defaultOption,
          legend: { data: listTipos },
          xAxis: {
            ...defaultOption.xAxis,
            data: listMeses.map((mes) => obtenerNombreMes(mes)),
          },
          series: series,
        });

        setFormatData({ tipos: listTipos, meses: listMeses, series: series });
      } catch (error) {
        console.error(error);
      }
    };
    getVehiculosVigentes();
  }, [anioSelected, defaultOption]);

  return (
    <div className="d-flex flex-column flex-grow-1 justify-content-between">
      <div className="d-flex flex-column align-items-center gap-2">
        <h6> {total} autorizaciones emitidas</h6>
        <div className="d-flex gap-5 flex-wrap justify-content-center">
          <MyChart
            option={optionChart}
            widthChart="400px"
            heightChart="400px"
          />{" "}
          <div className="d-flex justify-content-center">
            <table class="table">
              <thead>
                <tr>
                  <th className="px-3"></th>
                  {formatData?.tipos?.map((tipo) => (
                    <th className="px-3">{tipo}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {formatData?.meses?.map((mes, index) => (
                  <tr className="py-0 my-0">
                    <td className="py-0">{obtenerNombreMes(mes)}</td>
                    {formatData?.series?.map((serie) => (
                      <td className="px-3 py-0 text-end">
                        {serie.data[index]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* <small>{JSON.stringify(formatData)}</small> */}
          </div>
        </div>
      </div>
    </div>
  );
};
