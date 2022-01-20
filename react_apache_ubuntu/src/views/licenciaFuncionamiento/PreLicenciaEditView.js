import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import Header from "../../components/Header";
import PreLicenciaDatosComponent from "../../components/licenciaFuncionamiento/PreLicenciaDatosComponent";
import PreLicenciaCuestionarioComponent from "../../components/licenciaFuncionamiento/PreLicenciaCuestionarioComponent";
import PreLicenciaNRComponent from "../../components/licenciaFuncionamiento/PreLicenciaNRComponent";
import PreLicenciaCompatibComponent from "../../components/licenciaFuncionamiento/PreLicenciaCompatibComponent";
import PreLicenciaRequisitosComponent from "../../components/licenciaFuncionamiento/PreLicenciaRequisitosComponent";
import { obtenerPrecalificacionPorId } from "../../services/licFuncService";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import {
  Accordion,
  Card,
  Navbar,
  Container,
  Tabs,
  Tab,
  Button,
} from "react-bootstrap";

export default function PreLicenciaEditView() {

  const {precalId} = useParams()

  const [mostrarCU, setMostrarCU] = useState(false)
  const [mostarReq, setMostrarReq] = useState(false)

  const verPrecalificacion = async () => {
        
    const { precalRiesgoEval, precalCompatCU } = await obtenerPrecalificacionPorId(
        precalId
    );

    if (precalRiesgoEval===1){
      setMostrarCU(true)  
      if (precalCompatCU===1){
        setMostrarReq(true)    
      }
    }

  };

  useEffect(() => {
    verPrecalificacion();  
    // eslint-disable-next-line react-hooks/exhaustive-deps      
  }, [precalId]);
  
  
  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("totally custom!")
    );

    return (
  
      <Navbar
        expand="lg"
        className="color-header1"
        variant="dark"
        onClick={decoratedOnClick}
      >
        <Container fluid>
          <Navbar.Brand><i className="far fa-question-circle me-2"></i>Cuestionario</Navbar.Brand>
        </Container>
      </Navbar>
    );
  }

  return (
    <div>
    
      <Header />

      <div className="container">
        <div className="row justify-content-center">
          <div
            className="align-items-center p-2 col-sm-12 col-lg-8"
            style={{ border: "0px solid black" }}
          >
            <h3 className="mt-0 mb-4 text-center">
              <i className="fas fa-store me-3"></i>
              Pre Licencia de Funcionamiento              
            </h3>
            <div style={{ border: "1px solid rgb(40, 116, 166)" }}>
              <Navbar className="color-header1" variant="dark">
                <Container fluid>
                  <Navbar.Brand href="#home">
                  <i className="far fa-file-alt me-2"></i>Solicitud Nº {precalId.toString().padStart(4, '0')}
                  </Navbar.Brand>
                  <div className="d-flex justify-content-end">
                    <Button variant="success" href="/pre_licencia">
                      <i className="fas fa-arrow-alt-circle-left me-2"></i>Regresar
                    </Button>
                  </div>
                </Container>
              </Navbar>
              <div className="px-2">
                <PreLicenciaDatosComponent precalId={precalId}/>
              </div>
            </div>

            <div
              className="mt-2 color-header1"
              style={{ border: "1px solid rgb(40, 116, 166)" }}
            >
              <Accordion defaultActiveKey="0">
                <Card>
                  <Card.Header className="color-header1 p-0">                  
                    <CustomToggle eventKey="0">Cuestionario</CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <PreLicenciaCuestionarioComponent precalId={precalId}/>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>

            <div
              className="mt-2"
              style={{ border: "1px solid rgb(40, 116, 166)" }}
            >
              <Navbar className="color-header1" variant="dark">
                <Container fluid>
                  <Navbar.Brand href="#home"><i className="far fa-check-circle me-1"></i> Evaluaciones</Navbar.Brand>
                </Container>
              </Navbar>
              <div className="p-2">
                <Tabs
                  defaultActiveKey="NR"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                  fill
                  justify
                >
                  <Tab eventKey="NR" title="Nivel de riesgo">
                    <PreLicenciaNRComponent precalId={precalId} verPrecalificacion={verPrecalificacion}/>
                  </Tab>
                  { mostrarCU && <Tab
                    eventKey="profile"
                    title="Compatibilidad de uso"
                    style={{ color: "yellow !important" }}
                  >
                    <PreLicenciaCompatibComponent precalId={precalId} verPrecalificacion={verPrecalificacion}/>
                  </Tab>}

                  { mostarReq && <Tab eventKey="contact" title="Requisitos">
                    <PreLicenciaRequisitosComponent />
                  </Tab>}
                  
                  
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}
