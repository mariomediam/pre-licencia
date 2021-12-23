import { useState } from "react";
import { Form, Button, ListGroup, Modal, Table } from "react-bootstrap";

export default function PreLicenciaRequisitosComponent() {
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
          <Form.Label className="fw-bold">
            Documentación sustentatoria solicitada
          </Form.Label>
          <ListGroup>
            <ListGroup.Item>
              Autorización de entidad competente 1
            </ListGroup.Item>
            <ListGroup.Item>
              Autorización de entidad competente 2
            </ListGroup.Item>
          </ListGroup>
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
            <Modal.Title>
              <i className="fas fa-tasks me-2"></i>Evaluar requisitos
            </Modal.Title>
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
              <Form.Label className="fw-bold">
                Documentación sustentatoria solicitada
              </Form.Label>
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Autoridad competente</th>
                    <th>Exigible</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Autoridad competente 1</td>
                    <td>
                      {" "}
                      <Form.Check aria-label="option 1" />
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Autoridad competente 2</td>
                    <td>
                      <Form.Check aria-label="option 1" />
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Autoridad competente 3</td>
                    <td>
                      <Form.Check aria-label="option 1" />
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Autoridad competente 4</td>
                    <td>
                      <Form.Check aria-label="option 1" />
                    </td>
                  </tr>
                </tbody>
              </Table>
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
              <i class="far fa-times-circle me-1"></i>
              Cerrar
            </Button>
            <Button variant="primary">
              <i class="far fa-save me-2"></i>Grabar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
