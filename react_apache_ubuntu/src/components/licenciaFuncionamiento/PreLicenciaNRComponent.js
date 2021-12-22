import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

export default function PreLicenciaNRComponent() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div className="d-flex justify-content-end">
        <Button variant="success" onClick={handleShow}>
          <i className="fas fa-clipboard-check me-2"></i>
          Evaluar
        </Button>
      </div>

      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="fw-bold">Resultado de evaluación</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="fw-bold">Nivel de riesgo</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label className="fw-bold">Observaciones</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
      </Form>
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title><i className="fas fa-exclamation-triangle me-2"></i>Evaluar nivel de riesgo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-bold">
                Resultado de evaluación
              </Form.Label>
              <Form.Select aria-label="Default select example">
                <option value="1">Aprobado</option>
                <option value="2">Rechazado</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-bold">Nivel de riesgo</Form.Label>
              <Form.Select aria-label="Default select example">
                <option value="1">Bajo</option>
                <option value="2">Medio</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="fw-bold">Observaciones</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary">Grabar</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
