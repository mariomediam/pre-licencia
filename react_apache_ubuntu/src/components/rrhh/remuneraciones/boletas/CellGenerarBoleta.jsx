import { Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

import { transformarFecha, obtenerNombreMes } from "../../../../utils/varios";

export const CellGenerarBoleta = ({
  d_ano,
  d_mes,
  c_tippla_id,
  c_plani_nro,
  actual_estado,
  actual_user,
  actual_datetime,
  actual_carpeta,
  n_tippla_nombre,
  setEstadoPlanillaBoleta,
}) => {
  const onClicGenerarBoletas = async () => {
    Swal.fire({
      title: `¿Seguro de generar boletas de la planilla ${obtenerNombreMes(d_mes)} ${d_ano} - ${n_tippla_nombre} ${c_plani_nro}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Aqui llamar procedimiento de Marcos para generar boletas
        setEstadoPlanillaBoleta((value) => ({ ...value, f_plani_estado: 0 }));
      }
    });
  };

  if (actual_estado === 0) {
    return (
      <Button variant="outline-primary" disabled>
        <Spinner animation="border" role="status" size="sm" className="me-1">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        Generando...
      </Button>
    );
  }

  if (actual_estado === 1) {
    return (
      <small>
        <div>Generado por: {actual_user}</div>
        <div>Fecha: {transformarFecha(actual_datetime)}</div>
        <div>Carpeta: {actual_carpeta}</div>
      </small>
    );
  }

  return (
    <Button variant="outline-primary" onClick={onClicGenerarBoletas}>
      Generar boletas
    </Button>
  );
};
