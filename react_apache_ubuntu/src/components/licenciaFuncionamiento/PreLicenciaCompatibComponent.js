import { useState, useContext, useEffect, useRef } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import {
  obtenerEvaluacionPorPrecalIdTipoEval,
  obtenerUsuarioTipoEval,
  agregarEvaluacion,
} from "../../services/licFuncService";
import { Toast } from "../tools/PopMessage";
import Loading from "../../components/Loading";

export default function PreLicenciaCompatibComponent({
  precalId,
  verPrecalificacion,
}) {
  const [cargando, setCargando] = useState(false);
  const [show, setShow] = useState(false);
  const [resultado, setResultado] = useState("Pendiente");
  const [observaciones, setObservaciones] = useState("");
  const [puedeEvaluar, setPuedeEvaluar] = useState(false);

  const selectResultEval = useRef();
  const inputObserv = useRef();
  const { userName } = useContext(AuthContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const verEvaluacion = async () => {
    const evaluacionTmp = await obtenerEvaluacionPorPrecalIdTipoEval(
      precalId,
      2
    );

    if (evaluacionTmp) {
      setResultado(evaluacionTmp.precalEvalEstadoNombre);
      setObservaciones(evaluacionTmp.precalEvalComent);
    } else {
      let UsuarioTipoEvalTmp = [];

      if (userName) {
        UsuarioTipoEvalTmp = await obtenerUsuarioTipoEval(userName, 2);

        if (UsuarioTipoEvalTmp && UsuarioTipoEvalTmp.length > 0) {
          setPuedeEvaluar(true);
        }
      }
    }
  };

  const grabarEvaluacion = async () => {
    setCargando(true);
    await agregarEvaluacion(
      precalId,
      2,
      inputObserv.current.value,
      userName,
      "INDETERMINADO",
      parseInt(selectResultEval.current.value),
      undefined
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
  };

  useEffect(() => {
    verEvaluacion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [precalId, userName]);

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
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <i className="fas fa-map-marked-alt me-2"></i>Evaluar
                compatibilidad de uso
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
                >
                  <option value="1">Compatible</option>
                  <option value="2">No compatible</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label className="fw-bold">Observaciones</Form.Label>
                <Form.Control as="textarea" rows={3} ref={inputObserv} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                <i className="far fa-times-circle me-1"></i>Cerrar
              </Button>
              <Button variant="primary" onClick={grabarEvaluacion}>
                <i className="far fa-save me-2"></i>Grabar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
}
