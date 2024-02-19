import { useEffect, useState } from "react"

import { useSelector } from "react-redux";
import { obtenerRequeSaldoPresupDepen } from "../../../services/abastecService";
import { RequeElaboraStepTareasItemComponent } from "./RequeElaboraStepTareasItemComponent";




export const RequeElaboraStepTareasComponent = () => {

  const [tareas, setTareas] = useState([])

  const { currentReque } = useSelector((state) => state.requerimiento);
  const { C_anipre, C_sf_dep, C_biesertipo } = currentReque;

  useEffect(() => {

    const obtenerTareas = async () => {
      const formato = "reque"
      const tareasTmp = await obtenerRequeSaldoPresupDepen(C_anipre, C_sf_dep, C_biesertipo, formato);
      setTareas(tareasTmp || []);
      
    };

    obtenerTareas();
    
  }, [C_anipre, C_sf_dep, C_biesertipo])
  

  return (
    <div>
        {
          tareas.map((tarea, i) => (
           <RequeElaboraStepTareasItemComponent key={i} tarea={tarea} active={i === 0}/>
          ))
        }

    </div>
  )
}
