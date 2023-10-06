import { useRef } from 'react';
import { Accordion, Container, Row, Col } from "react-bootstrap";
import { LicProvItemViewComponent } from "./LicProvItemViewComponent";
import { useState } from "react";
import { transformarFecha } from "../../../utils/varios";

export const LicProvListaItemComponent = ({ lic }) => {
  const [collapsed, setCollapsed] = useState(true);
  
  const { M_LicProv_Nro, permisos } = lic;

  const { n_titular, N_Rubro_Descrip, C_Ubica_Codigo, N_Ubica_Descrip, D_LicProv_FecEmi, D_LicProv_FinVig } = permisos[0];

  const onAccordionClick = () => {
    setCollapsed(!collapsed);
  
  };

  const tagAccordion = useRef();
  return (
    <div className="flex-fill py-3">
      {" "}
      <Accordion defaultActiveKey={["0"]} ref={tagAccordion}  onClick={onAccordionClick}>

        <Accordion.Item eventKey="0">
          <Accordion.Header>{`Autorización Nº ${M_LicProv_Nro.toString().padStart(
            4,
            "0"
          )}`}</Accordion.Header>
          {/* <Accordion.Collapse
            eventKey="0"
            appear
            onEnter={onAccordionClick}
            onExit={onAccordionClick}            
          >
           
          </Accordion.Collapse> */}
          <Accordion.Body>
            <>
              {permisos.map((permiso) => (
                <LicProvItemViewComponent
                  key={`${permiso.C_LicProv}`}
                  permiso={permiso}
                />
              ))}
            </>
          </Accordion.Body>
        </Accordion.Item>
        
      </Accordion>
      {collapsed && (
        <Container
        fluid
          className="d-flex p-3 justify-content-between gap-3  flex-wrap"
          style={{
            backgroundColor: "#ffffff",
            borderColor: "#CED4DA",
            borderRadius: "0px 0px 3px 3px",
            borderStyle: "solid",
            borderTop: "none",
            borderWidth: "1px",
            color: "#000000",
          }}
        >
          <Row className="flex-fill">
          <Col xs={12} md={3}>
            <p className="text-muted pb-0 mb-0 mt-2">
              <small className="mb-0 pb-0">Titular</small>
            </p>
            {n_titular?.toString().replace("-", " ")}
          </Col>
          
          <Col xs={12} md={2}>
            <p className="text-muted pb-0 mb-0 mt-2">
              <small className="mb-0 pb-0">Rubro</small>
            </p>
            <p className="m-0 p-0 max-two-lines" >{N_Rubro_Descrip}</p>
          </Col>
          <Col xs={12} md={3}>
            <p className="text-muted pb-0 mb-0 mt-2">
              <small className="mb-0 pb-0">Ubicación</small>
            </p>
            {`${C_Ubica_Codigo} ${N_Ubica_Descrip}`}
          </Col>
          <Col xs={12} md={2}>
            <p className="text-muted pb-0 mb-0 mt-2">
              <small className="mb-0 pb-0">Fecha de emisión</small>
            </p>
              {transformarFecha(D_LicProv_FecEmi).substring(0, 10)}            
          </Col>
          <Col xs={12} md={2}>
            <p className="text-muted pb-0 mb-0 mt-2">
              <small className="mb-0 pb-0">Fecha de vencimiento</small>
            </p>
            {transformarFecha(D_LicProv_FinVig).substring(0, 10)}            
          </Col>
          </Row>
        </Container>
        
      )}

    </div>
  );
}; // <-- added missing curly brace here
