import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AntiguedadVehiculos } from "../../../services/indicatorsService";
import MyChart from "../../helpers/MyChart";
import XIcon from "../../../icons/XIcon";

export const OldVehiclesDetail = () => {
  const navigate = useNavigate();

  const [yearManufacture, setYearManufacture] = useState([]);
  const [optionChart, setOptionsChart] = useState({});

  const dafaultOption = useMemo(
    () => ({
      series: [
        {
          type: "treemap",
          data: [],
          label: {
            position: "insideTopLeft",
            formatter: function (params) {
              const total = params.treePathInfo[0].value;
              const percent = ((params.value / total) * 100).toFixed(2);
              let arr = [
                "{name|" + params.name + "}",
                "{hr|}",
                "{value|" + params.value + "}{name| vehículos}",
                "{name|" + percent + "}{name|%}",
              ];
              return arr.join("\n");
            },
            rich: {
              value: {
                fontSize: 22,
                lineHeight: 30,
                // color: 'yellow'
              },
              name: {
                fontSize: 12,
                color: "#fff",
              },
              hr: {
                width: "100%",
                borderColor: "rgba(255,255,255,0.2)",
                borderWidth: 0.5,
                height: 0,
                lineHeight: 10,
              },
            },
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

      if (age <= 14) {
        return "11-14 años";
      }

      if (age <= 18) {
        return "15-18 años";
      }
      if (age <= 22) {
        return "19-22 años";
      }

      return "> 22 años";
    };

    const getYearManufacture = async () => {
      try {
        const dataYearManufacture = await AntiguedadVehiculos();
        const objGrouped = Object.groupBy(dataYearManufacture, getGrouped);
        const totalVehicles = dataYearManufacture.reduce(
          (acc, { q_total }) => acc + q_total,
          0
        );

        const data = [];
        for (const key in objGrouped) {
          if (Object.hasOwnProperty.call(objGrouped, key)) {
            const element = objGrouped[key];
            const total = element.reduce(
              (acc, { q_total }) => acc + q_total,
              0
            );
            data.push({
              value: total,
              name: key,
              percent: (total / totalVehicles) * 100,
            });
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
      name,
      value,
    }));
    setOptionsChart({
      ...dafaultOption,
      series: [{ ...dafaultOption.series[0], data }],
    });
  }, [yearManufacture, dafaultOption]);

  const onClickClose = () => {
    navigate(-1);
  };

  return (
    <div className="px-3 pt-3 pb-0">
      <header className="d-flex justify-content-between">
        <div className="d-flex gap-0">
          <div className="m-0 p-0">
            <p className="m-0 p-0 fs-5 fw-bold">Indicadores de gestión</p>
            <p
              className="p-0"
              style={{ marginTop: "-5px", marginBottom: "0px" }}
            >
              {`Transportes / Antigüedad de vehículos con autorización vigente`}
            </p>
          </div>
        </div>

        <div
          className="d-flex align-items-center gap-2 "
          role="button"
          onClick={onClickClose}
        >
          <XIcon className="cursor-pointer" />
        </div>
      </header>
      <div className="d-flex flex-column align-items-center gap-1 flex-wrap justify-content-center pt-0">
        <div className="mychart">
          <MyChart option={optionChart} widthChart="100%" heightChart="550px" />{" "}
        </div>
      </div>
    </div>
  );
};
