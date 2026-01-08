import { Modal, Button, Form } from "react-bootstrap";
import LockIcon from "../../icons/LockIcon";
import ExclamationCircleIcon from "../../icons/ExclamationCircleIcon";
import CheckIcon from "../../icons/CheckIcon";

export const GetPasswordReniec = ({ show, handleClose, dniAConsultar }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        {/* <Modal.Title>
            <i className="fas fa-mobile-alt me-2"></i>Agregar teléfono
          </Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center mb-3 text-primary">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10"
            style={{ width: "4rem", height: "4rem" }}
          >
            <LockIcon width={36} height={36} />
          </div>
        </div>
        <div className="d-flex justify-content-center flex-column align-items-center mb-2">
          <h4>Contraseña de RENIEC</h4>
          <small className="text-center text-muted">
            Ingresa tu contraseña de RENIEC para obtener automáticamente la
            información del DNI <span className="fw-bold">{dniAConsultar}</span>
          </small>
        </div>

        <Form.Group>
          <Form.Label className="text-muted mb-0">
            <small>Contraseña</small>
          </Form.Label>
          <Form.Control type="password" />
        </Form.Group>
        <div className="alert alert-primary mt-3 p-2" role="alert">
          <p style={{ fontSize: "12px" }} className="m-0">
            <ExclamationCircleIcon width={16} height={16} className="me-1" />
            Tu contraseña no será almacenada. Se utiliza solo para obtener la
            información del RENIEC
          </p>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Omitir
        </Button>
        <Button variant="primary">
          <CheckIcon width={16} height={16} stroke="#fff" /> Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
