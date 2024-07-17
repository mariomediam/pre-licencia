import { Accordion } from "react-bootstrap";
import { TributoArchivoTipoOpeComponent } from "./TributoArchivoTipoOpeComponent";

export const TributoArchivoContribComponent = ({ tributo }) => {
  const { C_Contrib, N_Contrib, detalle } = tributo;

  return (
    <Accordion className="mb-3">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <div className="row flex-grow-1 me-3 ">
            <div className="col-7">
              {N_Contrib} <br />
              <small className="text-muted"> Cód. {C_Contrib}</small>
            </div>
            <div className="col-5 text-end">
              <h5>S/. 100.00</h5>
            </div>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          {
            detalle.map((listTipoOperacion) => (
                    <TributoArchivoTipoOpeComponent key={`${C_Contrib}_${listTipoOperacion.C_TipOpe}`} 
                    C_Contrib={C_Contrib}
                    N_Contrib={N_Contrib}
                    listTipoOperacion={listTipoOperacion} />

            ))
          }
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
