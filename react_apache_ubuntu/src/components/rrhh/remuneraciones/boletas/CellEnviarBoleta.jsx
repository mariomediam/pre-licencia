import { Button, Spinner } from "react-bootstrap";
// import Swal from "sweetalert2";

// import { obtenerNombreMes } from "../../../../utils/varios";
// import { generaBoletasPdf } from "../../../../services/rrhhService";
import { useNavigate } from "react-router-dom";

export const CellEnviarBoleta = ({
  d_ano,
  d_mes,
  c_tippla_id,
  c_plani_nro,
  actual_envio,
}) => {
  const navigate = useNavigate();

  const onClicSelectDestintario = async () => {
    navigate(
      `/rrhh/remuneraciones/select_destinatario/${d_ano}/${d_mes}/${c_tippla_id}/${c_plani_nro}`
    );
    
  };

  if (actual_envio === 0) {
    return (
      <Button variant="outline-primary" disabled>
        <Spinner animation="border" role="status" size="sm" className="me-1">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        Enviando...
      </Button>
    );
  }


  return (
    <Button variant="outline-primary" onClick={onClicSelectDestintario}>
      Enviar boletas
    </Button>
  );
};
