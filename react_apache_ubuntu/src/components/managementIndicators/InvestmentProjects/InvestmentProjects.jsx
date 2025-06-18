import { useEffect, useMemo, useState } from "react";

import MyChart from "../../helpers/MyChart";
import { ViewMore } from "../ViewMore";
import {
  obtenerMontosPorAnio,
  obtenerUltimaSincro,
} from "../../../services/siafService";

import { transformarFecha } from "../../../utils/varios";
import { Spinner } from "react-bootstrap";

export const InvestmentProjects = ({ anioSelected, title = "" }) => {
  const [montos, setMontos] = useState({});
  const [porcAvance, setporcAvance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [ultimaSincro, setUltimaSincro] = useState(null);

  useEffect(() => {
    const obtenerSincro = async () => {
      const params = {
        ano_eje: anioSelected,
        sec_ejec: process.env.REACT_APP_SEC_EJEC,
      };
      const response = await obtenerUltimaSincro(params);
      setUltimaSincro(response);
    };
    if (anioSelected) {
      obtenerSincro();
    }
  }, [anioSelected]);

  useEffect(() => {
    const { MONTO_PIM: pim = 0, MONTO_DEVENGADO: devengado = 0 } = montos;

    if (pim > 0) {
      const porcAvance = (devengado / pim) * 100;
      setporcAvance(porcAvance.toFixed(1));
    } else {
      setporcAvance(0);
    }
  }, [montos, anioSelected]);

  useEffect(() => {
    const obtenerMontos = async () => {
      try {
        setIsLoading(true);
        const montos = await obtenerMontosPorAnio({
          anio: anioSelected,
        });
        setMontos(montos);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    obtenerMontos();
  }, [anioSelected]);

  const dafaultOption = useMemo(
    () => ({
      series: [
        {
          type: "gauge",
          radius: "95%",
          progress: {
            show: true,
            width: 12,
          },
          axisLine: {
            lineStyle: {
              width: 12,
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            length: 4,
            lineStyle: {
              width: 2,
              color: "#999",
            },
          },
          axisLabel: {
            distance: 16,
            color: "#999",
            fontSize: 8,
          },
          anchor: {
            show: true,
            showAbove: true,
            size: 6,
            itemStyle: {
              borderWidth: 6,
            },
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            fontSize: 24,
            offsetCenter: [0, "70%"],
            formatter: "{value}%",
          },
          data: [
            {
              value: porcAvance || 0,
            },
          ],
        },
      ],
    }),
    [porcAvance]
  );

  return (
    <div className="d-flex flex-column flex-grow-1 justify-content-between">
      <div>
        <h6>
          {title} {anioSelected}
        </h6>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" size="sm" />
          </div>
        ) : (
          <>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ padding: 0 }}
            >
              <MyChart
                option={dafaultOption}
                widthChart="200px"
                heightChart="200px"
              />{" "}
            </div>
            <div style={{ fontSize: "0.6rem", maxWidth: "230px" }}>
              Ejecución del gasto presupuestal actualizado al{" "}
              {transformarFecha(ultimaSincro?.ultima_actualizacion)}{" "}
            </div>
          </>
        )}
      </div>
      <ViewMore url={`/indicadores/proyectos-inversion/${anioSelected}`} />
    </div>
  );
};
