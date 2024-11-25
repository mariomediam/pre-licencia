import { useEffect, useMemo, useState } from "react";

import { AntiguedadVehiculos } from "../../../services/indicatorsService";
import MyChart from "../../helpers/MyChart";
import { ViewMore } from "../ViewMore";

export const OldVehicles = ({ anioSelected, title = "" }) => {
  const [yearManufacture, setYearManufacture] = useState([]);
  const [optionChart, setOptionsChart] = useState({});

  const dafaultOption = useMemo(
    () => ({
      series: [
        {
          type: "treemap",
          roam: false,
          nodeClick: false,
          data: [
            // {
            //   name: {title},
            //   value: 10,
            // },
            // {
            //   name: 'nodeB',
            //   value: 20,
            // }
            // ,
            // {
            //   name: 'nodeC',
            //   value: 30,
            // }
          ],
          breadcrumb: {
            show: false, // Esto oculta el toolbar de nivel
          },
          label: {
            show: true,
            // textStyle: {
            //   fontSize: 10, // Ajusta el tamaño de la fuente aquí
            // },
            fontSize: 10,
          },
        },
      ],
    }),
    []
  );

  useEffect(() => {
    const getGrouped = ({ M_Vehic_AnoFab }) => {
      const age = new Date().getFullYear() - M_Vehic_AnoFab;
      if (age <= 3) {
        return "0-3 años";
      }
      if (age <= 6) {
        return "4-6 años";
      }
      if (age <= 10) {
        return "7-10 años";
      }
      return "> 10 años";
    };

    const getYearManufacture = async () => {
      try {
        const dataYearManufacture = await AntiguedadVehiculos();
        const objGrouped = Object.groupBy(dataYearManufacture, getGrouped);
        const data = [];
        for (const key in objGrouped) {
          if (Object.hasOwnProperty.call(objGrouped, key)) {
            const element = objGrouped[key];
            const total = element.reduce(
              (acc, { q_total }) => acc + q_total,
              0
            );
            data.push({ value: total, name: key });
          }
        }
        setYearManufacture(data);
      } catch (error) {
        throw error;
      }
    };
    getYearManufacture();
  }, []);

  useEffect(() => {
    const data = yearManufacture.map(({ value, name }) => ({
      name: name.replace(" años", ""),
      value,
    }));
    setOptionsChart({
      ...dafaultOption,
      series: [{ ...dafaultOption.series[0], data }],
    });
  }, [yearManufacture, dafaultOption]);

  return (
    <div style={{ maxWidth: "260px" }} className="d-flex flex-column flex-grow-1 justify-content-between">
      <div>
      <h6>{title} </h6>
      <div className="d-flex gap-3">
        <div className="d-flex align-items-center">
          <table>
            <tbody>
            {yearManufacture.map(({ value, name }) => (
              <tr key={name} className="py-0 my-0">
                <td className="py-0 my-0" style={{ verticalAlign: "baseline" }}>
                  <h5 className="p-0 m-0">{value}</h5>
                </td>
                <td className="py-0 my-0" style={{ verticalAlign: "baseline" }}>
                  <small className="py-0 ps-2 m-0">{name}</small>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div>
          <MyChart
            option={optionChart}
            widthChart="110px"
            heightChart="130px"
          />{" "}
        </div>
      </div>

      </div>
      <ViewMore />
    </div>
  );
};
