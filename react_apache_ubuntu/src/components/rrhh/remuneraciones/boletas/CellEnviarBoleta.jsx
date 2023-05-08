import { Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

import { obtenerNombreMes } from "../../../../utils/varios";
import { generaBoletasPdf } from "../../../../services/rrhhService";
import { useNavigate } from "react-router-dom";

export const CellEnviarBoleta = ({
  d_ano,
  d_mes,
  c_tippla_id,
  c_plani_nro,
  actual_envio,
  actual_user,
  actual_datetime,
  actual_carpeta,
  n_tippla_nombre,
  setEstadoPlanillaBoleta,
}) => {
  const navigate = useNavigate();

  const onClicSelectDestintario = async () => {
    navigate(
      `/rrhh/remuneraciones/select_destinatario/${d_ano}/${d_mes}/${c_tippla_id}/${c_plani_nro}`
    );

    // const result = await Swal.fire({
    //   title: `¿Seguro de enviar boletas de la planilla ${obtenerNombreMes(
    //     d_mes
    //   )} ${d_ano} - ${n_tippla_nombre} ${c_plani_nro}?`,
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Si",
    //   cancelButtonText: "No",
    //   reverseButtons: true,
    // });

    // if (result.isConfirmed) {
    //   // Aqui llamar procedimiento de Marcos para generar boletas
    //   setEstadoPlanillaBoleta((value) => ({ ...value, f_plani_envio: 0 }));
    //   try {
    //     await generaBoletasPdf(d_ano, d_mes, c_tippla_id, c_plani_nro);
    //   } catch (error) {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Error generando boletas",
    //       text: error.response.data.message,
    //     });
    //     setEstadoPlanillaBoleta((value) => ({
    //       ...value,
    //       f_plani_envio: 1,
    //     }));
    //   }
    // }
  };

  if (actual_envio === 0) {
    return (
      <Button variant="outline-primary" disabled>
        <Spinner animation="border" role="status" size="sm" className="me-1">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        Generando...
      </Button>
    );
  }

  //   if (actual_envio === 1) {
  //     return (
  //       <small>
  //         <div>Generado por: {actual_user}</div>
  //         <div>Fecha: {transformarFecha(actual_datetime)}</div>
  //         <div>Carpeta: {actual_carpeta}</div>
  //       </small>
  //     );
  //   }

  return (
    <Button variant="outline-primary" onClick={onClicSelectDestintario}>
      Enviar boletas
    </Button>
  );
};
