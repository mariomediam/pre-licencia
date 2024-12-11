import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { MontosPapeleta } from "../../../services/indicatorsService";
import MyChart from "../../helpers/MyChart";
import { formatNumber, obtenerNombreMes } from "../../../utils/varios";
import XIcon from "../../../icons/XIcon";

export const AmountsTransitTicketsDetail = () => {
  const navigate = useNavigate();
  const { anio: urlYear } = useParams();

  const [collection, setCollection] = useState([]);
  const [total, setTotal] = useState(0);
  const [optionChart, setOptionsChart] = useState({});
  const [isLoadingCollection, setIsLoadingCollection] = useState(false);

  const defaultOption = useMemo(
    () => ({
      grid: {
        left: "20%",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: {
        type: "category",
        // boundaryGap: true,
        // data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        // show: true,
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: function (value) {
            return value; // Muestra el valor tal cual es
            // return value.toFixed(2); // Muestra dos decimales
          },
        },
      },
      series: [
        {
          //   data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "bar",
          name: "Direct",
          //   areaStyle: {},
        },
      ],
    }),
    []
  );

  useEffect(() => {
    const getAmounts = async () => {
      try {
        setIsLoadingCollection(true);
        const params = {
          anio: urlYear,
          tipo: "OM",
        };

        const data = await MontosPapeleta(params);

        setCollection(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingCollection(false);
      }
    };
    getAmounts();
  }, [urlYear]);

  useEffect(() => {
    let total = 0;

    total = collection.reduce((acc, { Total }) => acc + Total, 0);
    setTotal(total);

    const xAxisData = collection.map(({ Mes }) => obtenerNombreMes(Mes));

    const seriesData = collection.map(({ Total }) => Total);

    setOptionsChart({
      ...defaultOption,
      xAxis: { ...defaultOption.xAxis, data: xAxisData },
      series: [{ ...defaultOption.series[0], data: seriesData }],
    });
  }, [collection, defaultOption]);

  const onClickClose = () => {
    navigate(-1);
  };

  return (
    <div className="p-3">
      <header className="d-flex justify-content-between">
        <div className="d-flex gap-0">
          <div className="m-0 p-0">
            <p className="m-0 p-0 fs-5 fw-bold">Indicadores de gestión</p>
            <p
              className="p-0"
              style={{ marginTop: "-5px", marginBottom: "0px" }}
            >
              {`Transportes / Recaudación por infracciones de transportes ${urlYear}`}
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
      {isLoadingCollection ? (
        <div className="d-flex justify-content-center align-items-center pt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <main>
          <div className="d-flex flex-column flex-grow-1 align-items-center justify-content-between">
            <div className="d-flex flex-column align-items-center gap-2">
              <h3 className="m-0 pt-4 pb-0">
                {" "}
                Recaudado S/. {formatNumber(total, 2)}
              </h3>
              <div className="d-flex gap-0 flex-wrap justify-content-center align-items-center">
                <MyChart
                  option={optionChart}
                  widthChart="400px"
                  heightChart="450px"
                />{" "}
                <div className="d-flex justify-content-center ">
                  <table className="table ">
                    <thead>
                      <tr>
                        <th>Mes</th>
                        <th className="text-end">Recaudado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {collection.map(({ Mes, Total }) => (
                        <tr key={Mes}>
                          <td className="py-0">{obtenerNombreMes(Mes)}</td>
                          <td className="py-0 text-end">
                            <small className="text-muted">S/.</small>{" "}
                            {formatNumber(Total)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};
