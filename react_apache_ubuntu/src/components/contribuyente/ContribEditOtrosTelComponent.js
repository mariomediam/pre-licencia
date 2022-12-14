import * as React from "react";
import { useRef, useState } from "react";
import {
  Form,
  Table,
  Button,
  Modal,
  InputGroup,
  FormControl,
  Container,
  Col,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { obtenerTipoTelefono } from "../../services/contribuyenteService";

export const ContribEditOtrosTelComponent = ({ valores, setField, errors }) => {
  const [show, setShow] = useState(false);
  const [tipoTelefono, setTipoTelefono] = useState([]);
  const [errorTelefono, setErrorTelefono] = useState("");

  const handleClose = () => {
    setErrorTelefono("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const inputNroTelefono = useRef();
  const selectTipoTelefono = useRef();

  const eliminarTelefono = (e) => {
    const telefId = e.target.id.substring(6);
    const { TipTel, Número } = valores.telefonos
      .filter((telContrib) => telContrib.telefId === telefId)
      .shift();
    const newTelefonos = valores.telefonos.filter(
      (telContrib) => telContrib.telefId !== telefId
    );
    Swal.fire({
      title: `¿Seguro de eliminar el teléfono ${TipTel} ${Número}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setField("telefonos", newTelefonos);
      }
    });
    
  };

  const listarTipoTelefono = async () => {
    handleShow();
    const tipoTelefonoTmp = await obtenerTipoTelefono();
    setTipoTelefono(tipoTelefonoTmp);
  };

  const agregarTelefono = async (e) => {
    if (inputNroTelefono.current.value.trim().length === 0) {
      setErrorTelefono(`Ingrese número de teléfono.`);
    } else {
      let telefonosNew = [...valores.telefonos];
      telefonosNew.push({
        TipTel: selectTipoTelefono.current.value.trim(),
        Número: inputNroTelefono.current.value.trim(),
        "": "MM",
        telefId:
          selectTipoTelefono.current.value.trim() +
          inputNroTelefono.current.value.trim(),
      });
      setField("telefonos", telefonosNew);
      handleClose();
    }
  };

  const inputKeyUp = (event) => {
    setErrorTelefono("");

    if (event.keyCode === 13) {
      agregarTelefono();
    }
  };

  return (
    <div>
    <div>
      {/* ------------------ TELEFONOS -------------------*/}
      <Form.Group md="6" controlId="id_direccLote">
        <Form.Label className="text-muted mb-0 mt-0">
          <small className="mb-0">Teléfonos</small>
          <Button
            className="ms-2"
            variant="outline-dark"
            size="sm"
            title="Agregar teléfono"
            onClick={listarTipoTelefono}
          >
            <i className="fas fa-plus"></i>
          </Button>
        </Form.Label>
        <Table hover className="caption-top mb-1">
          <thead>
            <tr className="color-header1 text-white">
              <th className="text-center align-middle m-0 p-0">Tipo</th>
              <th className="text-center align-middle m-0 p-0">Número</th>
              <th className="text-center align-middle m-0 p-0"></th>
            </tr>
          </thead>
          <tbody>
            {valores.telefonos.map((telefono, i) => (
              <tr key={telefono.telefId} id={`trtel_${telefono.telefId}`}>
                <td>{telefono.TipTel}</td>
                <td>{telefono.Número}</td>
                <td className="d-flex justify-content-end">
                  <Button
                    id={`bttel_${telefono.telefId}`}
                    onClick={eliminarTelefono}
                    variant="outline-danger"
                    size="sm"
                    title="Eliminar teléfono"
                  >
                    <i
                      className="fas fa-trash-alt "
                      id={`imtel_${telefono.telefId}`}
                    ></i>
                  </Button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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
            <i className="fas fa-mobile-alt me-2"></i>Agregar teléfono
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Col md={{ span: 6, offset: 3 }}>
              <div style={{ border: "0px solid black" }}>
                {/* ------------------ TIPO DE TELEFONO -------------------*/}
                <Form.Group
                  md="6"
                  controlId="id_tipoTelefono"
                  className="align-middle mt-2"
                >
                  <Form.Label className="text-muted mb-0">
                    <small className="mb-0">Tipo de teléfono</small>
                  </Form.Label>
                  <Form.Select
                    aria-label="Tipo de teléfono"
                    value={tipoTelefono.C160Nombre}
                    ref={selectTipoTelefono}
                  >
                    {tipoTelefono.map(({ C160Codigo, C160Nombre }, i) => (
                          <option key={C160Codigo} value={C160Nombre}>
                            {C160Nombre.trim()}
                          </option>
                    ))}
                  </Form.Select>

                  <Form.Control.Feedback type="invalid">
                    {errors.tipoContrib}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* ------------------ NUMERO DE TELEFONO -------------------*/}
                <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                  <Form.Label className="text-muted mb-0 mt-0">
                    <small className="mb-0">Número de teléfono</small>
                  </Form.Label>
                  <InputGroup className="mb-3" hasValidation>
                    <FormControl
                      autoFocus
                      aria-describedby="basic-addon2"
                      required
                      ref={inputNroTelefono}
                      onKeyUp={inputKeyUp}
                      isInvalid={errorTelefono}
                      maxLength="15"
                    />
                    <Form.Control.Feedback type="invalid" className="mt-0">
                      <p align="justify">{errorTelefono} </p>
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </div>
            </Col>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <i className="far fa-times-circle me-1"></i>
            Cerrar
          </Button>
          <Button variant="primary" onClick={agregarTelefono}>
            <i className="far fa-save me-2"></i>Grabar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  </div>
  )
};
