import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, CloseButton } from "react-bootstrap";

import Header from "../../../components/Header";
import { DetallePlanillaComponent } from "../../../components/rrhh/remuneraciones";

export const DetallePlanillaView = () => {
  const { anio, mes, tipo, numero } = useParams();

  const navigate = useNavigate();

  const onClicBack = () => {
    navigate(`/rrhh/remuneraciones/generar_boleta/${anio}/${mes}`);
  };

  return (
    <div>
      <Header />
      <div className="ps-3">
        <Breadcrumb>
          <Breadcrumb.Item active>Recursos humanos</Breadcrumb.Item>
          <Breadcrumb.Item active>Generar boletas</Breadcrumb.Item>
          <Breadcrumb.Item active>Resumen planilla</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <hr className="p-0 m-0" />

      <div className="container">
        
        <div className="row justify-content-center">
        
          <div
            className="align-items-center p-2 col-sm-12 col-lg-8"
            style={{ border: "0px solid black" }}
          >
            <div className="d-flex justify-content-end m-0 p-0">
          <CloseButton onClick={onClicBack}/>
        </div>
            <h3 className="mt-0 text-center">
              <i className="fas fa-money-bill-wave me-2"></i>
              Resumen planilla de pago
            </h3>
          </div>
        </div>
      </div>
      <DetallePlanillaComponent
        d_ano={anio}
        d_mes={mes}
        c_tippla_id={tipo}
        c_plani_nro={numero}
      />
    </div>
  );
};
