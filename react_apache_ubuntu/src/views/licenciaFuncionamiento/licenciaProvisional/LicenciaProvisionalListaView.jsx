import { Breadcrumb, Button, InputGroup, Form, Nav } from "react-bootstrap";

import Header from "../../../components/Header";

export const LicenciaProvisionalListaView = () => {
  return (
    <div>
      <Header />
      <div className="ps-3 mb-0">
        <Breadcrumb>
          <Breadcrumb.Item>Licencias de funcionamiento</Breadcrumb.Item>
          <Breadcrumb.Item active>Autorizaciones provisionales</Breadcrumb.Item>
        </Breadcrumb>
      </div>

    
      <nav className="d-flex justify-content-center">
        <div className="d-flex justify-content-between  align-items-center gap-3 mx-1 flex-wrap px-4 col-sm-12 col-xl-10 col-xxl-8" style={{maxWidth:"1000px"}}>
          <div className="flex-fill text-center text-sm-start">
          <i className="fas fa-utensils fs-5"></i> Emprendedores urbanos
          </div>

          <div className="flex-fill">
            <Nav
              activeKey="/home"
              onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
              className="d-flex justify-content-center justify-content-sm-start"
            >
              <Nav.Item>
                <Nav.Link href="/home"><i className="fas fa-plus me-1"></i>Autorización</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1">Rubro</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-2">Ubicacaciones</Nav.Link>
              </Nav.Item>              
            </Nav>
          </div>
          <div className="d-flex flex-fill justify-content-end justify-content-sm-center align-items-center">
            
            <Form.Select size="sm" aria-label="Default select example">
              <option>Nº autorización</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>            
            <InputGroup size="sm">
              <Form.Control
                placeholder=""
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Button
                id="button-addon2"
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#CED4DA",
                  borderLeft: "none",
                  color: "#000000",
                }}
              >
                <i className="fas fa-search"></i>
              </Button>
            </InputGroup>
            
          </div>
        </div>
      </nav>
    </div>
  );
};
