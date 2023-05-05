import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { obtenerPlanillaBoleta } from "../../../../services/rrhhService";
import { CellEnviarBoleta } from "./CellEnviarBoleta";

const milisegundos = 5000;

export const ItemBoletasEnviadas = ({
  d_ano,
  d_mes,
  c_tippla_id,
  n_tippla_nombre,
  c_plani_nro,
  q_trabajadores,
  n_plani_carpeta,
  n_user_insert,
  d_datetime,
  f_plani_envio,
}) => {
  const navigate = useNavigate();

  const [estadoPlanillaBoleta, setEstadoPlanillaBoleta] = useState({
    f_plani_envio,
    n_user_insert,
    d_datetime,
    n_plani_carpeta,
  });

  const {
    f_plani_envio: actual_envio,
    n_user_insert: actual_user,
    d_datetime: actual_datetime,
    n_plani_carpeta: actual_carpeta,
  } = { ...estadoPlanillaBoleta };

  const onClicVerDetalle = () => {
    navigate(
      `/rrhh/remuneraciones/detalle_planilla/${d_ano}/${d_mes}/${c_tippla_id}/${c_plani_nro}`
    );
  };

  useEffect(() => {
    const getEstadoPlanilla = async () => {
      const planillaBoleta = await obtenerPlanillaBoleta(
        d_ano,
        d_mes,
        c_tippla_id,
        c_plani_nro
      );

      if (planillaBoleta.f_plani_estado !== 0) {
        setEstadoPlanillaBoleta({
          f_plani_envio: planillaBoleta.f_plani_envio,
          n_user_insert: planillaBoleta.n_user_insert,
          d_datetime: planillaBoleta.d_datetime,
          n_plani_carpeta: planillaBoleta.n_plani_carpeta,
        });
      }
    };

    if (actual_envio === 0) {      
      const intervalId = setInterval(() => {
        getEstadoPlanilla();
      }, milisegundos);

      return () => clearInterval(intervalId);
    }
  }, [actual_envio, d_ano, d_mes, c_tippla_id, c_plani_nro]);

  return (
    <>
      <td className="align-middle m-1 p-1">{n_tippla_nombre}</td>
      <td className="text-center align-middle m-1 p-1">{c_plani_nro}</td>
      <td className="text-center align-middle m-1 p-1">{q_trabajadores}</td>
      <td className="text-center align-middle m-1 p-1">
        <Button variant="outline-primary" onClick={onClicVerDetalle}>
          {" "}
          Ver envios{" "}
        </Button>{" "}
      </td>
      <td
        className={`text-center align-middle m-1 p-1 ${
          actual_envio !== f_plani_envio &&
          "animate__animated animate__zoomIn"
        }`}
      >
        <CellEnviarBoleta
          d_ano={d_ano}
          d_mes={d_mes}
          c_tippla_id={c_tippla_id}
          c_plani_nro={c_plani_nro}
          actual_envio={actual_envio}
          actual_user={actual_user}
          actual_datetime={actual_datetime}
          actual_carpeta={actual_carpeta}
          n_tippla_nombre = {n_tippla_nombre}
          setEstadoPlanillaBoleta={setEstadoPlanillaBoleta}
        />
      </td>
    </>
  );
};
