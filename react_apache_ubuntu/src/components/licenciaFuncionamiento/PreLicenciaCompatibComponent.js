import { Form, Button } from "react-bootstrap";

export default function PreLicenciaCompatibComponent() {
  return (
    <div>
      <div className="d-flex justify-content-end">
        <Button variant="success">
          <i class="fas fa-clipboard-check me-2"></i>
          Evaluar
        </Button>
      </div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="fw-bold">Resultado de evaluación</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label className="fw-bold">Observaciones</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
      </Form>
    </div>
  );
}
