import { useEffect, useState } from "react";
import { obtenerProyectosProgramacionMensual } from "../../../services/siafService";
import { SeguimentoProyectoMesItem } from "./SeguimentoProyectoMesItem";

export const SeguimientoProyectoMes = ({ selectedAnio, selectedMonth }) => {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    const getProyectos = async () => {
      const data = await obtenerProyectosProgramacionMensual({
        anio_eje: selectedAnio,
        mes_eje: selectedMonth,
        sec_ejec: process.env.REACT_APP_SEC_EJEC,
      });
      setProyectos(data);
    };
    getProyectos();
  }, [selectedAnio, selectedMonth]);
  return (
    <div className="mt-3">
      
      
      {proyectos.map((proyecto) => (
        <SeguimentoProyectoMesItem key={proyecto.c_proinv} proyecto={proyecto} />
      ))}
    </div>
  );
};
