import React from "react";
import { Card, Col, Button } from "react-bootstrap";

export const LicenciaProvisionalItem = ({
  licProvTipoId,
  licProvNombre,
  licProvDescrip,
  licProvImagen,
}) => {
  return (
    <Col className="d-flex justify-content-center">
      <Card className="shadow p-3 mb-2 bg-white rounded animate__animated animate__fadeIn animate__faster" style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={licProvImagen}
          style={{ objectFit: "cover", height: "12rem" }}
        />
        <Card.Body className="d-flex flex-column mb-0 pb-0">
          <Card.Title>{licProvNombre}</Card.Title>
          <Card.Text >{licProvDescrip}</Card.Text>
          <div className="mt-auto">
            <Button variant="primary">Ingresar</Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
