import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

import { contarProyectosPorAnio, obtenerMontosPorAnio } from "../../../services/siafService";
import { CardIndicatorItem } from "./CardIndicatorItem";
import { formatMoney, obtenerNombreMes } from "../../../utils/varios";
import CashIcon from "../../../icons/CashIcon";
import WreckingBallIcon from "../../../icons/WreckingBallIcon";
import TrendingUpIcon from "../../../icons/TrendingUpIcon";
import FilesIcon from "../../../icons/FilesIcon";

export const CardIndicator = ({ anio, sec_ejec }) => {
  const [montos, setMontos] = useState({});
  const [porcAvance, setporcAvance] = useState(0);
  const [totalProyectos, setTotalProyectos] = useState(0);
  const [isLoading, setIsLoading] = useState(false);



  const {
    MONTO_PIM: pim = 0,
    MONTO_DEVENGADO: devengado = 0,
    MES_EJE: mes_eje = 0,
  } = montos;

  useEffect(() => {
    if (pim > 0) {
      const porcAvance = (devengado / pim) * 100;
      setporcAvance(porcAvance);
    } else {
      setporcAvance(0);
    }
  }, [devengado, pim]);

  useEffect(() => {
    const obtenerMontos = async () => {
      try {
        setIsLoading(true);
        const montos = await obtenerMontosPorAnio({
          anio: anio,
          sec_ejec: sec_ejec,
        });
        setMontos(montos);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    obtenerMontos();
  }, [anio, sec_ejec]);

  useEffect(() => {
    const contarProyectos = async () => {
      try { 
        setIsLoading(true);
        const proyectos = await contarProyectosPorAnio({ anio: anio, sec_ejec: sec_ejec });
        const total = proyectos.total || 0;
        setTotalProyectos(total);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    contarProyectos();
  }, [anio, sec_ejec]);

  return (
    <div className="w-100">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner
            animation="border"
            role="status"
            className="me-1"
            variant="primary"
          ></Spinner>
        </div>
      ) : (
        <div className="row g-3 animate__animated animate__fadeIn">
          <div className="col-12 col-md-6 col-xl-3">
            <CardIndicatorItem
              titulo={`PIM`}
              subTitulo={`${formatMoney(pim)}`}
              pie={`Presupuesto asignado ${anio}`}
              icono={<CashIcon />}
              colorBorde="#1976d2"
            />
          </div>
          <div className="col-12 col-md-6 col-xl-3">
            <CardIndicatorItem
              titulo={`Ejecución`}
              subTitulo={`${formatMoney(devengado)}`}
              pie={`Ejecución Enero - ${obtenerNombreMes(mes_eje)} ${anio}`}
              icono={<WreckingBallIcon />}
              colorBorde="#1976d2"
            />
          </div>
          <div className="col-12 col-md-6 col-xl-3">
            <CardIndicatorItem
              titulo={`Avance`}
              subTitulo={`${porcAvance.toFixed(2)}%`}
              pie={`Año ${anio}`}
              icono={<TrendingUpIcon />}
              colorBorde="#1976d2"
            />
          </div>
          <div className="col-12 col-md-6 col-xl-3">
            <CardIndicatorItem
              titulo={`Total Proyectos`}
              subTitulo={`${totalProyectos}`}
              pie={`Proyectos en seguimiento - ${anio}`}
              icono={<FilesIcon />}
              colorBorde="#1976d2"
            />
          </div>
        </div>
      )}
    </div>
  );
};
