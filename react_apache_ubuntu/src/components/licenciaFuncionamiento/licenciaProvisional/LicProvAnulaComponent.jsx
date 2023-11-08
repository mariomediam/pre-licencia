import { useRef } from "react";
import Swal from "sweetalert2";

import { Button, Form, Modal } from "react-bootstrap";
import { anulaLicProvPorId } from "../../../services/licFuncService";

export const LicProvAnulaComponent = ({ show, handleClose, licProv }) => {
  const inputObserv = useRef(null);

  const { C_LicProv, M_LicProv_Nro } = licProv;

  const onClicAnular = async (event) => {
    event.preventDefault();

    try {
      const observ = inputObserv.current.value;
      await anulaLicProvPorId(C_LicProv, observ);

      const resultOk = await Swal.fire({
        icon: "success",
        title: "Licencia provisional",
        text: "Licencia provisional anulada correctamente",
      });

      if (resultOk.isConfirmed) {
        window.location.reload();
      }
    } catch (error) {        
      Swal.fire({
        icon: "error",
        title: "Error anulando licencia provisional",
        text: JSON.stringify(error.response.data.message),
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="fas fa-ban me-2"></i>Anular licencia provisional{" "}
          {M_LicProv_Nro.toString().padStart(4, "0")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="modalTextArea">
          <Form.Label className="fw-bold">Observaciones</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={3}
            ref={inputObserv}
            defaultValue=""
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClicAnular}>
          <i className="far fa-save me-2"></i>Anular
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
