import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { TranspVigente } from "../../../services/indicatorsService";
import MyChart from "../../helpers/MyChart";

import XIcon from "../../../icons/XIcon";

export const CurrentPermitDetail = () => {
  const navigate = useNavigate();
  // const { anio: urlYear } = useParams();

  const [vehiculosVigentes, setVehiculosVigentes] = useState([]);
  const [total, setTotal] = useState(0);
  const [optionChart, setOptionsChart] = useState({});
  const [colors, setColors] = useState([]);

  const onClickClose = () => {
    navigate(-1);
  };

  const dafaultOption = useMemo(
    () => ({
      title: {
        text: `Autorizaciones vigentes`,
        subtext: `${total}`,
        left: "center",
        top: "45%",
        textStyle: {
          fontSize: 10,
        },
        subtextStyle: {
          fontSize: 25,
        },
      },
      series: [
        {
          name: "Autoizaciones vigentes",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 0,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
            formatter: "{d}%", // Muestra el nombre y el porcentaje
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "12",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: true,
          },
          data: [],
        },
      ],
    }),
    [total]
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
    <div className="p-3">
      <header className="d-flex justify-content-between">
        <div className="d-flex gap-0">
          <div className="m-0 p-0">
            <p className="m-0 p-0 fs-5 fw-bold">Indicadores de gestión</p>
            <p
              className="p-0"
              style={{ marginTop: "-5px", marginBottom: "0px" }}
            >
              {`Transportes / Autorizaciones vigentes`}
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
      <div className="d-flex flex-column align-items-center gap-1 flex-wrap justify-content-center pt-4">
        <div className="pb-0 mb-0">
          {vehiculosVigentes.map((vehiculo, index) => (
            <div
              key={vehiculo.tipo}
              className="d-flex justify-content-between gap-5"
            >
              <div className="d-flex align-items-center">
                <span
                  className="circle-icon me-1 "
                  style={{
                    backgroundColor: colors[index],
                    width: "16px",
                    height: "16px",
                  }}
                ></span>

                <span style={{ fontSize: "0.8rem" }}>{vehiculo.tipo}</span>
              </div>

              <span style={{ fontSize: "0.8rem" }}>{vehiculo.total}</span>
            </div>
          ))}
        </div>
        <MyChart
          option={optionChart}
          widthChart="400px"
          heightChart="400px"
          onColorsChange={setColors}
        />{" "}
      </div>
    </div>
  );
};
