import * as React from "react";
import { useRef, useState } from "react";
import {
  Form,
  Table,
  Button,
  Modal,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Swal from "sweetalert2";

export const ContribEditOtrosEmaComponent = ({ valores, setField, errors }) => {
  const [show, setShow] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");

  const handleClose = () => {
    setErrorEmail("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const inputEmail = useRef();

  const eliminarEmail = (e) => {
    const emailId = e.target.id.substring(6);

    const newEmails = valores.emails.filter(
      (ema) => ema.Dirección_Electrónica !== emailId
    );
    Swal.fire({
      title: `¿Seguro de eliminar el email ${emailId.trim()}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setField("emails", newEmails);
      }
    });
  };

  const agregarEmail = async (e) => {
    if (inputEmail.current.value.trim().length === 0) {
      setErrorEmail(`Ingresar dirección electrónica.`);
    } else {
      let emailsNew = [...valores.emails];
      emailsNew.push({
        Dirección_Electrónica: inputEmail.current.value.trim(),
        "": "MM",
      });
      setField("emails", emailsNew);
      handleClose();
    }
  };

  const inputKeyUp = (event) => {
    setErrorEmail("");

    if (event.keyCode === 13) {
      agregarEmail();
    }
  };

  return (
    <div>
      <div>
        {/* ------------------ DIRECCION ELECTRÓNICA -------------------*/}
        <Form.Group md="6" controlId="id_direccLote">
          <Form.Label className="text-muted mb-0 mt-0">
            <small className="mb-0">Dirección electrónica</small>
            <Button
              className="ms-2"
              variant="outline-dark"
              size="sm"
              title="Agregar dirección electrónica"
              onClick={handleShow}
            >
              <i className="fas fa-plus"></i>
            </Button>
          </Form.Label>
          <Table hover className="caption-top mb-1">
            <thead>
              <tr className="color-header1 text-white">
                <th className="text-center align-middle m-0 p-0">
                  Dirección / Http
                </th>
                <th className="text-center align-middle m-0 p-0"></th>
              </tr>
            </thead>
            <tbody>
              {valores.emails.map((email, i) => (
                <tr
                  key={email.Dirección_Electrónica}
                  id={`trema_${email.Dirección_Electrónica}`}
                >
                  <td>{email.Dirección_Electrónica}</td>
                  <td className="d-flex justify-content-end">
                    <Button
                      id={`btema_${email.Dirección_Electrónica}`}
                      onClick={eliminarEmail}
                      variant="outline-danger"
                      size="sm"
                      title="Eliminar dirección electrónica"
                    >
                      <i
                        className="fas fa-trash-alt "
                        id={`imema_${email.Dirección_Electrónica}`}
                      ></i>
                    </Button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Form.Control.Feedback type="invalid">
            {errors.direccLote}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <i className="fas fa-envelope me-2"></i>Agregar dirección
              electrónica
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <div style={{ border: "0px solid black" }}>
                  {/* ------------------ DIRECCIÓN ELECTRÓNICA -------------------*/}
                  <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                    <Form.Label className="text-muted mb-0 mt-0">
                      <small className="mb-0">
                        Dirección electrónica / Http
                      </small>
                    </Form.Label>
                    <InputGroup className="mb-3" hasValidation>
                      <FormControl
                        type="email"
                        autoFocus
                        aria-describedby="basic-addon2"
                        required
                        ref={inputEmail}
                        onKeyUp={inputKeyUp}
                        isInvalid={errorEmail}
                        maxLength="40"
                      />
                      <Form.Control.Feedback type="invalid" className="mt-0">
                        <p align="justify">{errorEmail} </p>
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              <i className="far fa-times-circle me-1"></i>
              Cerrar
            </Button>
            <Button variant="primary" onClick={agregarEmail}>
              <i className="far fa-save me-2"></i>Grabar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
