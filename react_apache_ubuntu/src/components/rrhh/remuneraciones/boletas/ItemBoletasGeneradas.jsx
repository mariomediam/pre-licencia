import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { transformarFecha } from "../../../../utils/varios";

export const ItemBoletasGeneradas = ({
  d_ano,
  d_mes,
  c_tippla_id,
  n_tippla_nombre,
  c_plani_nro,
  q_trabajadores,
  generado,
  n_plani_carpeta,
  n_user_insert,
  d_datetime,
}) => {
  const navigate = useNavigate();
  
  const onClicVerDetalle = () => {
    navigate(
      `/rrhh/remuneraciones/detalle_planilla/${d_ano}/${d_mes}/${c_tippla_id}/${c_plani_nro}`
    );
  };

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
      <td className="text-center align-middle m-1 p-1">
        {generado ? (
          <small>
            <div>Generado por: {n_user_insert}</div>
            <div>Fecha: {transformarFecha(d_datetime)}</div>
            <div>Carpeta: {n_plani_carpeta}</div>
          </small>
        ) : (
          <Button variant="outline-primary">Generar boletas</Button>
        )}
      </td>
    </>
  );
};
