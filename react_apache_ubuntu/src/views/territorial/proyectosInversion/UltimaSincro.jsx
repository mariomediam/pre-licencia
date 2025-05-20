import { useEffect, useState } from "react";
import { obtenerUltimaSincro } from "../../../services/siafService";
import { transformarFecha } from "../../../utils/varios";
import ExclamationCircleIcon from "../../../icons/ExclamationCircleIcon";

const defaultClassName = "bg-secondary text-white rounded-pill px-2 py-1 my-2";

export const UltimaSincro = ({
  ano_eje,
  sec_ejec,
  classNameParam = defaultClassName,
}) => {
  const [ultimaSincro, setUltimaSincro] = useState(null);

  useEffect(() => {
    const obtenerSincro = async () => {
      const params = { ano_eje, sec_ejec };
      const response = await obtenerUltimaSincro(params);
      setUltimaSincro(response);
    };
    if (ano_eje && sec_ejec) {
      obtenerSincro();
    }
  }, [ano_eje, sec_ejec]);

  return (
    <div className={classNameParam}>
      <ExclamationCircleIcon /> Ejecución del gasto presupuestal actualizado al{" "}
      {transformarFecha(ultimaSincro?.ultima_actualizacion)}{" "}
    </div>
  );
};
