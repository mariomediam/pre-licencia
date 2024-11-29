import { useEffect, useMemo, useState } from "react";

import { OcurrenciasxAnio } from "../../../services/indicatorsService";
import MyChart from "../../helpers/MyChart";
import { ViewMore } from "../ViewMore";

export const OccurrencesType = ({ anioSelected, title = "" }) => {
  const [dataOccurrence, setDataOccurrence] = useState([]);
  const [totalOccurrences, setTotalOccurrences] = useState(0)
  const [optionChart, setOptionsChart] = useState({});
  const [colors, setColors] = useState([]);

  const dafaultOption = useMemo(
    () => ({
      series: [
        {
          type: "treemap",
          roam: false,
          nodeClick: false,
          data: [
            // {
            //   name: "NodeA",
            //   value: 100,
            // },
            // {
            //   name: 'nodeB',
            //   value: 200,
            // }
            // ,
            // {
            //   name: 'nodeC',
            //   value: 300,
            // }
          ],
          breadcrumb: {
            show: false, // Esto oculta el toolbar de nivel
          },
          label: {
            show: true,
            fontSize: 10,
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
          opcion: "01",
        };
        const dataOccurrence = await OcurrenciasxAnio(params);

        // Agrupar por tipo de apoyo
        const objTipoApoyo = Object.groupBy(
          dataOccurrence,
          ({ tipo_de_apoyo }) => tipo_de_apoyo
        );

        // Sumar los totales de cada tipo de apoyo
        const data = [];
        let sumOccurrences = 0;
        for (const key in objTipoApoyo) {
          if (Object.hasOwnProperty.call(objTipoApoyo, key)) {
            const element = objTipoApoyo[key];
            const total = element.reduce(
              (acc, { q_total }) => acc + q_total,
              0
            );
            data.push({ name: key, value: total });
            sumOccurrences += total ;
          }
        }
        setTotalOccurrences(sumOccurrences)

        // Ordenar de mayor a menor
        data.sort((a, b) => b.value - a.value);

        // Tomar los 3 primeros y el resto sumarlos en "otros"
        const dataTop3 = data.slice(0, 3);
        const dataOthers = data.slice(3);
        const totalOthers = dataOthers.reduce(
          (acc, { value }) => acc + value,
          0
        );
        dataTop3.push({ name: "OTROS", value: totalOthers });

        setDataOccurrence(dataTop3);
      } catch (error) {
        throw error;
      }
    };
    getOccurrences();
  }, [anioSelected]);

  useEffect(() => {
    setOptionsChart({
      ...dafaultOption,
      series: [{ ...dafaultOption.series[0], data: dataOccurrence }],
    });
  }, [dataOccurrence, dafaultOption]);

  return (
    <div
      style={{ maxWidth: "350px" }}
      className="d-flex flex-column flex-grow-1 justify-content-between"
    >
      <div>
        <h6>{title} </h6>
        <h3>{totalOccurrences}</h3>
        <div className="d-flex gap-0 flew-wrap flex-column">
          <div className="d-flex align-items-center">
            
            <table>
              <tbody>
                {dataOccurrence.map(({ value, name }, index) => (
                  <tr key={name} className="py-0 my-0">
                    {/* <td
                      className="py-0 my-0"
                      style={{ verticalAlign: "baseline" }}
                    >
                      <h6 className="p-0 m-0">{value}</h6>
                    </td> */}
                    <td
                      className=" my-0 ps-3"
                      style={{ verticalAlign: "baseline" }}
                    >
                      <div className="d-flex ">
                      <span
                        className="circle-icon me-1 "
                        style={{
                          backgroundColor: colors[index],
                          width: "12px",
                          height: "12px",
                          flexShrink: 0,
                        }}
                      ></span>
                      <p
                        style={{ fontSize: "0.7rem", lineHeight: "1.2" }}
                        className="py-0 m-0"
                        title={name}
                      >
                        <span className="fw-bold">{value}</span> {name}
                      </p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center pt-0 mt-0">
            <MyChart
              option={optionChart}
              widthChart="320px"
              heightChart="100px"
              onColorsChange={setColors}
            />{" "}
          </div>
        </div>
      </div>
      <ViewMore url={`/indicadores/antiguedad-vehiculos/${anioSelected}`} />
    </div>
  );
};
