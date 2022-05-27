import { useState, useContext, useEffect, useRef } from "react";
import { Form, Button, ListGroup, Modal, Table } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import {
  obtenerEvaluacionPorPrecalIdTipoEval,
  obtenerUsuarioTipoEval,
  obtenerDocumPorPrecalIdTipoEval,
  obtenerTipoDocum,
  agregarEvaluacion,
  obtenerTipoLicencia,
} from "../../services/licFuncService";
import { Toast } from "../tools/PopMessage";
import { Accordion } from "react-bootstrap";
import Loading from "../../components/Loading";

export default function PreLicenciaRequisitosComponent({
  precalId,
  verPrecalificacion,
}) {
  const [cargando, setCargando] = useState(false);
  const [show, setShow] = useState(false);
  const [resultado, setResultado] = useState("Pendiente");
  const [documentos, setDocumentos] = useState([]);
  const [observaciones, setObservaciones] = useState("");
  const [puedeEvaluar, setPuedeEvaluar] = useState(false);
  const [tipoDocumentos, setTipoDocumentos] = useState([]);
  const { userName } = useContext(AuthContext);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [mostrarDocumSust, setMostrarDocumSust] = useState(true);
  const [tipoLicencia, setTipoLicencia] = useState([]);
  const [strTipoLicencia, setStrTipoLicencia] = useState("");
  const [tasaLicencia, setTasaLicencia] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    onSelectResultEvalChange();
  };

  const selectResultEval = useRef();
  const inputObserv = useRef();
  const inputTipoLicencia = useRef();
  const inputTasaLicencia = useRef();

  const verEvaluacion = async () => {
    const evaluacionTmp = await obtenerEvaluacionPorPrecalIdTipoEval(
      precalId,
      3
    );

    if (evaluacionTmp) {
      const documentosTmp = await obtenerDocumPorPrecalIdTipoEval(precalId, 3);

      setResultado(evaluacionTmp.precalEvalEstadoNombre);
      setObservaciones(evaluacionTmp.precalEvalComent);
      setTasaLicencia(evaluacionTmp.precalificacion.precalMonto);

      if (evaluacionTmp.tipoLicencia) {
        setStrTipoLicencia(evaluacionTmp.tipoLicencia.tipoLicDescrip);
      }
      setDocumentos(documentosTmp);
    } else {
      let UsuarioTipoEvalTmp = [];

      if (userName) {
        UsuarioTipoEvalTmp = await obtenerUsuarioTipoEval(userName, 3);

        if (UsuarioTipoEvalTmp && UsuarioTipoEvalTmp.length > 0) {
          setPuedeEvaluar(true);
        }
      }
    }
  };

  const verTipoLicencia = async () => {
    const tipoLicenciaTmp = await obtenerTipoLicencia();

    setTipoLicencia(tipoLicenciaTmp.filter((tipoLic) => tipoLic.tipoLicSimula));
  };

  const verTipoDocumentos = async () => {
    const tipoDocumentosTmp = await obtenerTipoDocum();

    tipoDocumentosTmp.forEach((tipDocum) => (tipDocum["selecc"] = false));

    setTipoDocumentos(tipoDocumentosTmp);
  };

  useEffect(() => {
    verEvaluacion();
    verTipoLicencia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [precalId, userName]);

  useEffect(() => {
    verTipoDocumentos();
  }, []);

  const onCheckChange = (event) => {
    const idChecked = parseInt(event.target.id);
    const valueChecked = event.target.checked;

    tipoDocumentos.forEach((tipDocum) => {
      if (tipDocum["precalTipDocId"] === idChecked) {
        tipDocum["selecc"] = valueChecked;
      }
    });

    setTipoDocumentos(tipoDocumentos);
  };

  const onSelectResultEvalChange = () => {
    if (selectResultEval.current?.value === "2") {
      setMostrarDocumSust(false);
    } else {
      setMostrarDocumSust(true);
    }
  };

  const grabarEvaluacion = async () => {
    setCargando(true);
    try {
      setButtonsDisabled(true);

      let documentosSelecc = [];
      let tipoLicenciaSelect = undefined;
      
      if (tipoDocumentos) {
        documentosSelecc = tipoDocumentos.filter(
          (documento) => documento.selecc === true
        );
      }

      if (inputTipoLicencia.current) {
        tipoLicenciaSelect = inputTipoLicencia.current.value;
      }

      await agregarEvaluacion(
        precalId,
        3,
        inputObserv.current.value,
        userName,
        "INDETERMINADO",
        parseInt(selectResultEval.current.value),
        undefined,
        documentosSelecc,
        tipoLicenciaSelect,
        parseFloat(inputTasaLicencia.current.value)
      );

      verEvaluacion();
      setPuedeEvaluar(false);
      verPrecalificacion();

      setShow(false);
      setCargando(false);

      Toast.fire({
        icon: "success",
        title: "El registro se grabo con éxito",
        background: "#F4F6F6",
      });
    } catch (error) {
      throw error;
    } finally {
      setButtonsDisabled(false);
    }
  };

  return (
    <div>
      {puedeEvaluar && (
        <div className="d-flex justify-content-end">
          <Button variant="success" onClick={handleShow}>
            <i className="fas fa-clipboard-check me-2"></i>
            Evaluar
          </Button>
        </div>
      )}
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="fw-bold">Resultado de evaluación</Form.Label>
          <Form.Control
            type="text"
            readOnly
            style={{ backgroundColor: "#FFFFFF", color: "black" }}
            value={resultado}
          />
        </Form.Group>

        {documentos.length > 0 && (
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-bold">
              Documentación sustentatoria solicitada
            </Form.Label>
            <ListGroup>
              {documentos.map(
                ({ precalDocumId, tipoDocum: { precalTipDocNombre } }, i) => (
                  <ListGroup.Item key={precalDocumId}>
                    {i + 1} {precalTipDocNombre}
                  </ListGroup.Item>
                )
              )}
            </ListGroup>
          </Form.Group>
        )}

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label className="fw-bold">Tipo de Licencia</Form.Label>
          <Form.Control
            as="textarea"
            readOnly
            style={{ backgroundColor: "#FFFFFF", color: "black" }}
            value={strTipoLicencia}
            rows={2}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="fw-bold">Tasa de Licencia</Form.Label>
          <Form.Control
            type="text"
            readOnly
            style={{ backgroundColor: "#FFFFFF", color: "black" }}
            value={`S/. ${tasaLicencia}`}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label className="fw-bold">Observaciones</Form.Label>
          <Form.Control
            as="textarea"
            readOnly
            style={{ backgroundColor: "#FFFFFF", color: "black" }}
            value={observaciones}
            rows={3}
          />
        </Form.Group>
      </Form>
      {cargando ? (
        <Loading />
      ) : (
        <div>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
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
                <Form.Select
                  aria-label="Default select example"
                  ref={selectResultEval}
                  onChange={onSelectResultEvalChange}
                >
                  <option value="1">Aprobado</option>
                  <option value="2">Rechazado</option>
                </Form.Select>
              </Form.Group>

              {mostrarDocumSust && (
                <div>
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        Documentación sustentatoria solicitada
                      </Accordion.Header>
                      <Accordion.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <div style={{ height: "280px", overflow: "scroll" }}>
                            <Table bordered hover>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Autoridad competente</th>
                                  <th>Exigible</th>
                                </tr>
                              </thead>
                              <tbody>
                                {tipoDocumentos.map(
                                  (
                                    { precalTipDocId, precalTipDocNombre },
                                    i
                                  ) => (
                                    <tr key={precalTipDocId}>
                                      <td>{i + 1}</td>
                                      <td>{precalTipDocNombre}</td>
                                      <td>
                                        {" "}
                                        <Form.Check
                                          type="checkbox"
                                          aria-label={precalTipDocNombre}
                                          id={precalTipDocId}
                                          onChange={onCheckChange}
                                        />
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </Table>
                          </div>
                        </Form.Group>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  <Form.Group className="my-2" controlId="formTipoLicencia">
                    <Form.Label className="fw-bold">
                      Tipo de Licencia
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      // ref={selectResultEval}
                      // className="select2 narrow wrap"
                      // className="formNamesList setWidth"
                      // size="15"
                      className="bootstrap-select"
                      ref={inputTipoLicencia}
                    >
                      {tipoLicencia.map(({ tipoLicId, tipoLicDescrip }, i) => (
                        <option
                          key={tipoLicId}
                          value={tipoLicId}
                          style={{ word_wrap: "break-word" }}
                        >
                          {tipoLicDescrip}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              )}

              <Form.Group
                className="my-2"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="fw-bold">
                  Tasa de licencia de funcionamiento
                </Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="numero"
                  // placeholder="00000"
                  // maxLength={5}
                  ref={inputTasaLicencia}
                />
              </Form.Group>

              <Form.Group
                className="my-2"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label className="fw-bold">Observaciones</Form.Label>
                <Form.Control as="textarea" rows={3} ref={inputObserv} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleClose}
                disabled={buttonsDisabled}
              >
                <i className="far fa-times-circle me-1"></i>
                Cerrar
              </Button>
              <Button
                variant="primary"
                onClick={grabarEvaluacion}
                disabled={buttonsDisabled}
              >
                <i className="far fa-save me-2"></i>Grabar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
}
