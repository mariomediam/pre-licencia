import Header from "../../components/Header";
import PreLicenciaDatosComponent from "../../components/licenciaFuncionamiento/PreLicenciaDatosComponent";
import PreLicenciaCuestionarioComponent from "../../components/licenciaFuncionamiento/PreLicenciaCuestionarioComponent";
import PreLicenciaNRComponent from "../../components/licenciaFuncionamiento/PreLicenciaNRComponent";
import PreLicenciaCompatibComponent from "../../components/licenciaFuncionamiento/PreLicenciaCompatibComponent";
import PreLicenciaRequisitosComponent from "../../components/licenciaFuncionamiento/PreLicenciaRequisitosComponent";
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

export default function PreLicenciaView() {
  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("totally custom!")
    );

    return (
      //     <div className="d-grid gap-2">
      //   <Button
      //     type="button"
      //     // style={{ backgroundColor: "black" }}
      //     onClick={decoratedOnClick}
      //     variant="link"
      //   >
      //     {children}
      //   </Button>
      //   </div>

      <Navbar
        expand="lg"
        className="color-header1"
        variant="dark"
        onClick={decoratedOnClick}
      >
        <Container fluid>
          <Navbar.Brand>Cuestionario</Navbar.Brand>
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
            <h3 className="mt-0 text-center">
              <i class="fas fa-store me-3"></i>
              Pre Licencia de Funcionamiento
            </h3>
            <div style={{ border: "1px solid rgb(40, 116, 166)" }}>
              <Navbar className="color-header1" variant="dark">
                <Container fluid>
                  <Navbar.Brand href="#home">
                    Pre-Licencia Nº 00001
                  </Navbar.Brand>
                  <div className="d-flex justify-content-end">
                    <Button variant="success">
                      <i class="fas fa-arrow-alt-circle-left me-2"></i>Regresar
                    </Button>
                  </div>
                </Container>
              </Navbar>
              <div className="px-2">
                <PreLicenciaDatosComponent />
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
                      <PreLicenciaCuestionarioComponent />
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
                  <Navbar.Brand href="#home">Evaluaciones</Navbar.Brand>
                </Container>
              </Navbar>
              <div className="p-2">
                <Tabs
                  defaultActiveKey="profile"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                  fill
                  justify
                >
                  <Tab eventKey="home" title="Nivel de riesgo">
                    <PreLicenciaNRComponent />
                  </Tab>
                  <Tab
                    eventKey="profile"
                    title="Compatibilidad de uso"
                    style={{ color: "yellow !important" }}
                  >
                    <PreLicenciaCompatibComponent />
                  </Tab>
                  <Tab eventKey="contact" title="Requisitos">
                    <PreLicenciaRequisitosComponent />
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
