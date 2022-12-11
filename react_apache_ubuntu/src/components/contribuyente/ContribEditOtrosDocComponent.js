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
import { obtenerTipoDocumento } from "../../services/contribuyenteService";

export const ContribEditOtrosDocComponent = ({ valores, setField, errors }) => {
  const [show, setShow] = useState(false);
  const [tipoDocumento, setTipoDocumento] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const inputNroDoc = useRef();
  const selectTipoDoc = useRef();

  const eliminarDocumento = (e) => {
    const docId = e.target.id.substring(6);
    const { Descripción, Número } = valores.documentos
      .filter((doc) => doc.CodDoc === docId)
      .shift();
    const newDocumentos = valores.documentos.filter(
      (doc) => doc.CodDoc !== docId
    );
    Swal.fire({
      title: `¿Seguro de eliminar el documento ${Descripción} ${Número}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setField("documentos", newDocumentos);
      }
    });
  };

  const listarTipoDocumento = async () => {
    handleShow();
    const tipoDocumentoTmp = await obtenerTipoDocumento();
    const tipoDocumentoFilter = tipoDocumentoTmp.filter(
      (tipoDoc) =>
        !valores.documentos
          .map((contribDoc) => contribDoc.CodDoc)
          .includes(tipoDoc.C003Cod_Doc)
    );
    setTipoDocumento(tipoDocumentoFilter);
  };

  const agregarDocumento = (e) => {
    const objDocSelect = tipoDocumento
      .filter((tipoDoc) => tipoDoc.C003Cod_Doc === selectTipoDoc.current.value)
      .shift();

    let documentosNew = [...valores.documentos];
    documentosNew.push({
      CodDoc: selectTipoDoc.current.value,
      Descripción: objDocSelect.C003Nombre,
      Número: inputNroDoc.current.value.trim(),
      "": "MM",
    });
    setField("documentos", documentosNew);
    handleClose();
  };

  return (
    <div>
      <div>
        {/* ------------------ DOCUMENTOS -------------------*/}
        <Form.Group md="6" controlId="id_direccLote">
          <Form.Label className="text-muted mb-0 mt-0">
            <small className="mb-0">Documentos</small>
            <Button
              className="ms-2"
              variant="outline-dark"
              size="sm"
              title="Agregar documento"
              onClick={listarTipoDocumento}
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
              {valores.documentos.map((documento, i) => (
                <tr key={documento.CodDoc} id={`trdoc_${documento.CodDoc}`}>
                  <td>{documento.Descripción}</td>
                  <td>{documento.Número}</td>
                  <td className="d-flex justify-content-end">
                    <Button
                      //   href={`/pre_licencia_ver/${soliciPrecalif.precalId}`}
                      id={`btdod_${documento.CodDoc}`}
                      onClick={eliminarDocumento}
                      variant="outline-danger"
                      size="sm"
                      title="Eliminar documento"
                    >
                      <i
                        className="fas fa-trash-alt "
                        id={`imdod_${documento.CodDoc}`}
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
              <i className="far fa-id-card me-2"></i>Agregar documento
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center col-sm-12">
              <div
                className="align-items-center"
                style={{ border: "0px solid black" }}
              >
                {/* ------------------ TIPO DE DOCUMENTO -------------------*/}
                <Form.Group md="6" controlId="id_tipoContrib" className="mt-2">
                  <Form.Label className="text-muted mb-0">
                    <small className="mb-0">Tipo de documento</small>
                  </Form.Label>
                  <Form.Select
                    aria-label="Tipo de documento"
                    value={tipoDocumento.C003Cod_Doc}
                    ref={selectTipoDoc}
                    // isInvalid={!!errors.tipoContrib}
                    // onChange={(e) => setField("tipoContrib", e.target.value)}
                  >
                    {tipoDocumento.map(({ C003Cod_Doc, C003Nombre }, i) => (
                      <React.Fragment key={i}>
                        {valores.tipoContrib === "01" ||
                        (valores.tipoContrib !== "01" &&
                          ["05", "98", "00", "99"].includes(C003Cod_Doc)) ? (
                          <option key={C003Cod_Doc} value={C003Cod_Doc}>
                            {C003Nombre.trim()}
                          </option>
                        ) : null}
                      </React.Fragment>
                    ))}
                  </Form.Select>

                  <Form.Control.Feedback type="invalid">
                    {errors.tipoContrib}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                  <Form.Label className="text-muted mb-0 mt-0">
                    <small className="mb-0">Número de documento</small>
                  </Form.Label>
                  <InputGroup className="mb-3" hasValidation>
                    <FormControl
                      autoFocus
                      aria-describedby="basic-addon2"
                      required
                      ref={inputNroDoc}
                      //   onKeyUp={inputKeyUp}
                      //   isInvalid={validated}
                    />
                    <Form.Control.Feedback type="invalid" className="mt-0">
                      Ingresar valor buscado
                    </Form.Control.Feedback>
                    {/* {!validated && ( */}

                    {/* )} */}
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              <i className="far fa-times-circle me-1"></i>
              Cerrar
            </Button>
            <Button variant="primary" onClick={agregarDocumento}>
              <i className="far fa-save me-2"></i>Grabar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
