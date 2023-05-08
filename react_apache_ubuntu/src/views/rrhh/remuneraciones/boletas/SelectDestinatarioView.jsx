import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, CloseButton } from "react-bootstrap";

import Header from "../../../../components/Header";
import { SelectDestinatarioComponent } from "../../../../components";
import { useEffect, useState } from "react";
import { obtenerTipoPlanillaXTipo } from "../../../../services/rrhhService";
import { obtenerNombreMes } from "../../../../utils/varios";


export const SelectDestinarioView = () => {
  const { anio, mes, tipo, numero } = useParams();

  const [nombrePlanilla, setNombrePlanilla] = useState("")

  const navigate = useNavigate();

  const onClicBack = () => {
    navigate(`/rrhh/remuneraciones/enviar_boleta/${anio}/${mes}`);
  };

  

  useEffect(() => {
    const getEncabezado = async () => {
      const { n_tippla_nombre }=  await obtenerTipoPlanillaXTipo(tipo);
        setNombrePlanilla(n_tippla_nombre);   
    };
    getEncabezado();
  }, [tipo]);



  return (
    <div>
      <Header />
      <div className="ps-3">
        <Breadcrumb>
          <Breadcrumb.Item active>Recursos humanos</Breadcrumb.Item>
          <Breadcrumb.Item active>Enviar boletas</Breadcrumb.Item>
          <Breadcrumb.Item active>Seleccionar destinatarios</Breadcrumb.Item>
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
            <h4 className="mt-0 text-center">
              <i className="fas fa-mail-bulk me-2"></i>
              {`Enviar boletas de planilla ${obtenerNombreMes(mes)} ${anio} - ${nombrePlanilla} ${numero}`}
            </h4>
          </div>
        </div>
      </div>
      <SelectDestinatarioComponent d_ano={anio}
        d_mes={mes}
        c_tippla_id={tipo}
        c_plani_nro={numero}
        />  
    </div>
  );
};
