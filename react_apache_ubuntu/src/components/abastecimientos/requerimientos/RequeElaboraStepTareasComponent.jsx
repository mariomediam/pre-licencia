import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { obtenerRequeSaldoPresupDepen } from "../../../services/abastecService";
import { RequeElaboraStepTareasItemComponent } from "./RequeElaboraStepTareasItemComponent";
import Loading from "../../Loading";

export const RequeElaboraStepTareasComponent = () => {
  const [tareas, setTareas] = useState([]);

  const { currentReque } = useSelector((state) => state.requerimiento);
  const { C_anipre, C_sf_dep, C_biesertipo, tipo_dependencia} = currentReque;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const obtenerTareas = async () => {
      if (C_anipre && C_sf_dep && C_biesertipo) {

        const formato = "reque";
        const c_secfun = tipo_dependencia === 1 ? C_sf_dep : undefined;

        const tareasTmp = await obtenerRequeSaldoPresupDepen(
          C_anipre,
          C_sf_dep,
          C_biesertipo,
          formato,
          c_secfun
        );
        setTareas(tareasTmp || []);
      }

      setIsLoading(false);
    };

    obtenerTareas();
  }, [C_anipre, C_sf_dep, C_biesertipo, tipo_dependencia]);

  return (
    <div>
      {(isLoading)? (
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
