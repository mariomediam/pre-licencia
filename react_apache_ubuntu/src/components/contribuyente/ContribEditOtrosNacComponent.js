import * as React from "react";
import { useState } from "react";
import {
  Form,
  Card,
  Table,
  Button,
  Modal,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { obtenerTipoNacion } from "../../services/contribuyenteService";

export const ContribEditOtrosNacComponent = ({ valores, setField, errors }) => {
  const [show, setShow] = useState(false);
  const [tipoNacion, setTipoNacion] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const eliminarNacion = (e) => {
    const nacionId = e.target.id.substring(6);
    const { Pais } = valores.naciones
      .filter((nac) => nac.Codigo === nacionId)
      .shift();
    const newNacion = valores.naciones.filter((nac) => nac.Codigo !== nacionId);
    Swal.fire({
      title: `¿Seguro de eliminar la nacionalidad ${Pais}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setField("naciones", newNacion);
      }
    });
  };

  const listarNacion = async () => {
    handleShow();
    const tipoNacionTmp = await obtenerTipoNacion();
    const tipoNacionFilter = tipoNacionTmp.filter(
      (tipoNacion) =>
        !valores.naciones
          .map((nac) => nac.Codigo)
          .includes(tipoNacion.C163CodNacion)
    );
    setTipoNacion(tipoNacionFilter);
  };

  const agregarNacion = async (e) => {
    const nacionId = e.target.id.substring(6);
    const { C163CodNacion, C163Nombres, C163Gentilicio1 } = tipoNacion
      .filter((item) => item.C163CodNacion === nacionId)
      .shift();

    let nacionesNew = [...valores.naciones];
    nacionesNew.push({
      Codigo: C163CodNacion,
      Pais: C163Nombres.trim(),
      Gentilicio: C163Gentilicio1.trim(),
      "": "MM",
    });
    setField("naciones", nacionesNew);
    handleClose();
  };

  return (
    <div>
      <div>
        {/* ------------------ NACIONALIDADES -------------------*/}
        <Form.Group md="6" controlId="id_direccLote">
          <Form.Label className="text-muted mb-0 mt-0">
            <small className="mb-0">Nacionalidades</small>
            <Button
              className="ms-2"
              variant="outline-dark"
              size="sm"
              title="Agregar documento"
              onClick={listarNacion}
            >
              <i className="fas fa-plus"></i>
            </Button>
          </Form.Label>
          <Table hover className="caption-top mb-1">
            <thead>
              <tr className="color-header1 text-white">
                <th className="text-center align-middle m-0 p-0">Código</th>
                <th className="text-center align-middle m-0 p-0">Pais</th>
                <th className="text-center align-middle m-0 p-0"></th>
              </tr>
            </thead>
            <tbody>
              {valores.naciones.map((nacion, i) => (
                <tr key={nacion.Codigo} id={`trnac_${nacion.Codigo}`}>
                  <td>{nacion.Codigo}</td>
                  <td>{nacion.Pais}</td>
                  <td className="d-flex justify-content-end">
                    <Button
                      id={`btnac_${nacion.Codigo}`}
                      onClick={eliminarNacion}
                      variant="outline-danger"
                      size="sm"
                      title="Eliminar nacionalidad"
                    >
                      <i
                        className="fas fa-trash-alt "
                        id={`imnac_${nacion.Codigo}`}
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
              <i className="far fa-id-card me-2"></i>Agregar nacionalidad
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table hover className="caption-top mb-1">
              <thead>
                <tr className="color-header1 text-white">
                  <th className="text-center align-middle m-0 p-0">Código</th>
                  <th className="text-center align-middle m-0 p-0">País</th>
                </tr>
              </thead>
              <tbody>
                {tipoNacion.map((nacion, i) => (
                  <tr key={nacion.C163CodNacion}>
                    <td>
                      <Card.Link
                        href="#"
                        id={`canac_${nacion.C163CodNacion}`}
                        onClick={agregarNacion}
                      >
                        {nacion.C163CodNacion}
                      </Card.Link>
                    </td>
                    <td>{nacion.C163Nombres}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};
