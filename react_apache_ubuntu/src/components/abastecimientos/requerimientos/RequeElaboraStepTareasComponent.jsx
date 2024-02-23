import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { obtenerRequeSaldoPresupDepen } from "../../../services/abastecService";
import { RequeElaboraStepTareasItemComponent } from "./RequeElaboraStepTareasItemComponent";
import Loading from "../../Loading";

export const RequeElaboraStepTareasComponent = () => {
  const [tareas, setTareas] = useState([]);

  const { currentReque } = useSelector((state) => state.requerimiento);
  const { C_anipre, C_sf_dep, C_biesertipo } = currentReque;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const obtenerTareas = async () => {
      if (C_anipre && C_sf_dep && C_biesertipo) {
        const formato = "reque";
        const tareasTmp = await obtenerRequeSaldoPresupDepen(
          C_anipre,
          C_sf_dep,
          C_biesertipo,
          formato
        );
        setTareas(tareasTmp || []);
      }

      setIsLoading(false);
    };

    obtenerTareas();
  }, [C_anipre, C_sf_dep, C_biesertipo]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        tareas.map((tarea, i) => (
          <RequeElaboraStepTareasItemComponent
            key={i}
            tarea={tarea}
            active={i === 0}
          />
        ))
      )}
    </div>
  );
};
