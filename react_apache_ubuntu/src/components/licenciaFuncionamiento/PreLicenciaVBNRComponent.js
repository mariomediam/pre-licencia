import { useState, useEffect, useContext, useRef } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import {
  obtenerPrecalificacionPorId,
  obtenerUsuarioTipoEval,
  agregarVBDc
} from "../../services/licFuncService";
import { Toast } from "../tools/PopMessage";
import AuthContext from "../../context/AuthContext";

export default function PreLicenciaVBNRComponent({ precalId }) {
  const { userName } = useContext(AuthContext);
  const [puedeEvaluar, setPuedeEvaluar] = useState(false);
  // const [dcVbEval, setDcVbEval] = useState(0);
  const [dcVbObserv, setDcVbObserv] = useState("");
  const [textResulEvaluacion, settextResulEvaluacion] = useState("PENDIENTE");
  const [show, setShow] = useState(false);

  const selectResultEval = useRef();
  const inputObserv = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const verEvaluacion = async () => {
    const { precalDcVbEval, precalDcVbObs } = await obtenerPrecalificacionPorId(
      precalId
    );
    // setDcVbEval(precalDcVbEval);
    setDcVbObserv(precalDcVbObs || "");

    switch (precalDcVbEval) {
      case 0:
        settextResulEvaluacion("PENDIENTE");
        let UsuarioTipoEvalTmp = [];

        if (userName) {
          UsuarioTipoEvalTmp = await obtenerUsuarioTipoEval(userName, 1);

          if (UsuarioTipoEvalTmp && UsuarioTipoEvalTmp.length > 0) {
            setPuedeEvaluar(true);
          }
        }
        break;
      case 1:
        settextResulEvaluacion("APROBADO");
        break;
      case 2:
        settextResulEvaluacion("RECHAZADO");
        break;
      default:
        settextResulEvaluacion("");
    }
  };

  const grabarEvaluacion = async () => {
    

    await agregarVBDc(
      precalId,
      parseInt(selectResultEval.current.value),      
      inputObserv.current.value,
      userName,
      "INDETERMINADO"
    );

    verEvaluacion();
    setPuedeEvaluar(false);    

    setShow(false);

    Toast.fire({
      icon: "success",
      title: "El registro se grabo con éxito",
      background: "#F4F6F6",
    });
  
};

  useEffect(() => {
    verEvaluacion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [precalId]);

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
            value={textResulEvaluacion}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label className="fw-bold">Observaciones</Form.Label>
          <Form.Control
            as="textarea"
            readOnly
            style={{ backgroundColor: "#FFFFFF", color: "black" }}
            value={dcVbObserv}
            rows={3}
          />
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
              <i className="fas fa-exclamation-triangle me-2"></i>Visto bueno Oficina de Defensa Civil
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-bold">
                Resultado de evaluación
              </Form.Label>
              <Form.Select
                aria-label="Resultado de evaluación"
                ref={selectResultEval}
              >
                <option value="1">Aprobado</option>
                <option value="2">Rechazado</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="modalTextArea">
              <Form.Label className="fw-bold">Observaciones</Form.Label>
              <Form.Control as="textarea" rows={3} ref={inputObserv} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              <i className="far fa-times-circle me-1"></i>
              Cerrar
            </Button>
            <Button
              variant="primary"
              onClick={grabarEvaluacion}
            >
              <i className="far fa-save me-2"></i>Grabar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
