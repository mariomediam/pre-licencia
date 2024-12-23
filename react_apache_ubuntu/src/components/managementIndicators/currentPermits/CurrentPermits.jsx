import { useEffect, useMemo, useState } from "react";

import { TranspVigente } from "../../../services/indicatorsService";
import MyChart from "../../helpers/MyChart";
import { ViewMore } from "../ViewMore";

export const CurrentPermits = ({ anioSelected, title = "" }) => {
  const [vehiculosVigentes, setVehiculosVigentes] = useState([]);
  const [total, setTotal] = useState(0);
  const [optionChart, setOptionsChart] = useState({});

  const dafaultOption = useMemo(
    () => ({
      tooltip: {
        trigger: "item",
      },
      // legend: {
      //   top: '0%',
      //   left: 'center'
      // },
      series: [
        {
          name: title,
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 0,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [],
        },
      ],
    }),
    [title]
  );

  useEffect(() => {
    const getVehiculosVigentes = async () => {
      try {
        const vehiculos = await TranspVigente();
        setVehiculosVigentes(vehiculos);
      } catch (error) {
        throw error;
      }
    };
    getVehiculosVigentes();
  }, []);

  useEffect(() => {
    let total = 0;
    const data = [];
    vehiculosVigentes.forEach((vehiculo) => {
      data.push({ value: vehiculo.total, name: vehiculo.tipo });
      total += vehiculo.total;
    });
    setTotal(total);
    setOptionsChart({
      ...dafaultOption,
      series: [{ ...dafaultOption.series[0], data }],
    });
  }, [vehiculosVigentes, dafaultOption]);

  return (
    <div
      style={{ maxWidth: "260px" }}
      className="d-flex flex-column flex-grow-1 justify-content-between"
    >
      <div>
        <h6 className="">{title} </h6>

        <div className="d-flex gap-3">
          <h3>{total}</h3>
          <div>
            <MyChart
              option={optionChart}
              widthChart="160px"
              heightChart="100px"
            />{" "}
          </div>
        </div>
      </div>

      <ViewMore url={`/indicadores/autorizaciones-vigentes/${anioSelected}`} />
    </div>
  );
};
