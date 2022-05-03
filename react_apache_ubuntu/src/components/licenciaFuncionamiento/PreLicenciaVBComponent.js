// import { useState, useEffect } from "react";
// import { obtenerPrecalificacionPorId } from "../../services/licFuncService";
import { Navbar, Container, Tabs, Tab } from "react-bootstrap";
import PreLicenciaVBNRComponent from "./PreLicenciaVBNRComponent"

export const PreLicenciaVBComponent = ({ precalId }) => {
  // const [dlVbEval, setDlVbEval] = useState(0);
  // const [soliciSimula, setSoliciSimula] = useState("");
  // const [dlVbObserv, setDlVbObserv] = useState("");
  // const [dcVbEval, setDcVbEval] = useState(0);
  // const [dcVbObserv, setDcVbObserv] = useState("");

  // const verPrecalificacion = async () => {
  //   const {
  //     precalDlVbEval,
  //     precalSoliciSimulacion,
  //     precalDlVbObs,
  //     precalDcVbEval,
  //     precalDcVbObs,
  //   } = await obtenerPrecalificacionPorId(precalId);

  //   setDlVbEval(precalDlVbEval);
  //   setSoliciSimula(precalSoliciSimulacion);
  //   setDlVbObserv(precalDlVbObs);
  //   setDcVbEval(precalDcVbEval);
  //   setDcVbObserv(precalDcVbObs);
  // };

  // useEffect(() => {
  //     console.log("Se ejecuto verPrecalificacion")
  //   verPrecalificacion();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [precalId]);

  return (
    <div>
      <div
        className="mt-2 color-header1"
        style={{ border: "1px solid rgb(40, 116, 166)" }}
      >
        <Navbar className="color-header1" variant="dark">
          <Container fluid>
            <Navbar.Brand href="#home">
              <i className="far fa-check-circle me-1"></i> Vistos buenos para
              ingresar expediente
            </Navbar.Brand>
          </Container>
        </Navbar>
        
      </div>
      <div className="p-2" style={{ border: "1px solid rgb(40, 116, 166)" }}>
          <Tabs
            defaultActiveKey="NR"
            id="uncontrolled-tab-example"
            className="mb-3"
            fill
            justify
          >
            <Tab eventKey="NR" title="Oficina de Defensa Civil">
              <PreLicenciaVBNRComponent
                precalId={precalId}                
              />
            </Tab>
            {/* {mostrarCU && (
              <Tab
                eventKey="profile"
                title="Compatibilidad de uso"
                style={{ color: "yellow !important" }}
              >
                <PreLicenciaCompatibComponent
                  precalId={precalId}
                  verPrecalificacion={verPrecalificacion}
                />
              </Tab>
            )}

            {mostarReq && (
              <Tab eventKey="contact" title="Requisitos">
                <PreLicenciaRequisitosComponent
                  precalId={precalId}
                  verPrecalificacion={verPrecalificacion}
                />
              </Tab>
            )} */}
          </Tabs>
        </div>
    </div>
  );
};
