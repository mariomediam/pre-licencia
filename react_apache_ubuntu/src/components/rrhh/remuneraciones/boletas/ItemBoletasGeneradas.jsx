import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { obtenerPlanillaBoleta } from "../../../../services/rrhhService";
import { CellGenerarBoleta } from "./CellGenerarBoleta";

const milisegundos = 5000;

export const ItemBoletasGeneradas = ({
  d_ano,
  d_mes,
  c_tippla_id,
  n_tippla_nombre,
  c_plani_nro,
  q_trabajadores,
  n_plani_carpeta,
  n_user_insert,
  d_datetime,
  f_plani_estado,
}) => {
  const navigate = useNavigate();

  const [estadoPlanillaBoleta, setEstadoPlanillaBoleta] = useState({
    f_plani_estado,
    n_user_insert,
    d_datetime,
    n_plani_carpeta,
  });

  const {
    f_plani_estado: actual_estado,
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
          f_plani_estado: planillaBoleta.f_plani_estado,
          n_user_insert: planillaBoleta.n_user_insert,
          d_datetime: planillaBoleta.d_datetime,
          n_plani_carpeta: planillaBoleta.n_plani_carpeta,
        });
      }
    };

    if (actual_estado === 0) {      
      const intervalId = setInterval(() => {
        getEstadoPlanilla();
      }, milisegundos);

      return () => clearInterval(intervalId);
    }
  }, [actual_estado, d_ano, d_mes, c_tippla_id, c_plani_nro]);

  return (
    <>
      <td className="align-middle m-1 p-1">{n_tippla_nombre}</td>
      <td className="text-center align-middle m-1 p-1">{c_plani_nro}</td>
      <td className="text-center align-middle m-1 p-1">{q_trabajadores}</td>
      <td className="text-center align-middle m-1 p-1">
        <Button variant="outline-primary" onClick={onClicVerDetalle}>
          {" "}
          Ver detalle{" "}
        </Button>{" "}
      </td>
      <td
        className={`text-center align-middle m-1 p-1 ${
          actual_estado !== f_plani_estado &&
          "animate__animated animate__zoomIn"
        }`}
      >
        <CellGenerarBoleta
          d_ano={d_ano}
          d_mes={d_mes}
          c_tippla_id={c_tippla_id}
          c_plani_nro={c_plani_nro}
          actual_estado={actual_estado}
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
