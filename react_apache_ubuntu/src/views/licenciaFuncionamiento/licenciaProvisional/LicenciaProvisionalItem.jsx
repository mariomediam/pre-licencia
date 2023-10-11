import { useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";
import { Card, Col, Button } from "react-bootstrap";

export const LicenciaProvisionalItem = ({
  licProvTipoId,
  licProvNombre,
  licProvDescrip,
  licProvImagen,
}) => {

  const navigate = useNavigate();

  const onClicIngresar = (event) => {

    event.preventDefault();
    document.startViewTransition(() => {
      flushSync(() => {
        navigate(
          `/licencia/provisional/listar/${licProvTipoId}`
        );
      });
    });

    
  };


  return (
    <Col className="d-flex justify-content-center">
      <Card className="shadow p-3 mb-2 bg-white rounded animate__animated animate__fadeIn animate__faster" style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={licProvImagen}
          style={{ objectFit: "cover", height: "12rem" }}
        />
        <Card.Body className="d-flex flex-column px-0">
          <Card.Title>{licProvNombre}</Card.Title>
          <Card.Text className="text-break"  style={{ viewTransitionName: `tipo-lic-prov-${licProvTipoId}` }}>{licProvDescrip}</Card.Text>
          <div className="mt-auto">
            <Button variant="primary" className="d-flex align-items-center" onClick={onClicIngresar}>Ingresar <i className="ms-2 fas fa-arrow-right"></i></Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
