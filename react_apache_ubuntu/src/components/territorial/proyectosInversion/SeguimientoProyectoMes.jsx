import { useEffect, useState } from "react";
import { obtenerProyectosProgramacionMensual } from "../../../services/siafService";
import { SeguimentoProyectoMesItem } from "./SeguimentoProyectoMesItem";

export const SeguimientoProyectoMes = ({
  selectedAnio,
  selectedMonth,
  searchTerm,
}) => {
  const [proyectos, setProyectos] = useState([]);
  const [filteredProyectos, setFilteredProyectos] = useState([]);

  useEffect(() => {
    const filterProyectos = (data) => {
      if (searchTerm) {
        if (!isNaN(searchTerm)) {
          return data.filter((proyecto) =>
            proyecto.c_proinv_codigo.includes(searchTerm)
          );
        } else {
          return data.filter((proyecto) =>
            proyecto.n_proinv_nombre
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
        }
      }
      return data;
    };
    const filteredData = filterProyectos(proyectos);
    setFilteredProyectos(filteredData);
  }, [searchTerm, proyectos]);

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
      {filteredProyectos.map((proyecto) => (
        <SeguimentoProyectoMesItem
          key={proyecto.c_proinv}
          proyecto={proyecto}
        />
      ))}
    </div>
  );
};
