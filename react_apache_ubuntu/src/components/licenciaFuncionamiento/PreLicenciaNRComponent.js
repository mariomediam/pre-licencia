import { useState, useEffect, useContext, useRef } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { Toast } from "../tools/PopMessage";

import {
  obtenerEvaluacionPorPrecalIdTipoEval,
  obtenerUsuarioTipoEval,
  agregarEvaluacion,
} from "../../services/licFuncService";
import AuthContext from "../../context/AuthContext";

export default function PreLicenciaNRComponent({
  precalId,
  verPrecalificacion,
}) {
  const { userName } = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const [resultado, setResultado] = useState("Pendiente");
  const [nivelRiesgo, setNivelRiesgo] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [puedeEvaluar, setPuedeEvaluar] = useState(false);

  const selectResultEval = useRef();
  const selectNivRie = useRef();
  const inputObserv = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const verEvaluacion = async () => {
    const evaluacionTmp = await obtenerEvaluacionPorPrecalIdTipoEval(
      precalId,
      1
    );

    if (evaluacionTmp) {
      setResultado(evaluacionTmp.precalEvalEstadoNombre);
      switch (evaluacionTmp.precalificacion.precalRiesgo) {
        case 4:
          setNivelRiesgo("BAJO");
          break;
        case 5:
          setNivelRiesgo("MEDIO");
          break;
        case 6:
          setNivelRiesgo("ALTO");
          break;
        case 7:
          setNivelRiesgo("MUY ALTO");
          break;
        default:
          setNivelRiesgo("INDETERMINADO");
      }
      setObservaciones(evaluacionTmp.precalEvalComent);
    } else {
      let UsuarioTipoEvalTmp = [];

      if (userName) {
        UsuarioTipoEvalTmp = await obtenerUsuarioTipoEval(userName, 1);

        if (UsuarioTipoEvalTmp && UsuarioTipoEvalTmp.length > 0) {
          setPuedeEvaluar(true);
        }
      }
    }
  };

  const grabarEvaluacion = async () => {
    

      await agregarEvaluacion(
        precalId,
        1,
        inputObserv.current.value,
        userName,
        "INDETERMINADO",
        parseInt(selectResultEval.current.value),
        selectNivRie.current.value
      );

      verEvaluacion();
      setPuedeEvaluar(false);
      verPrecalificacion();

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
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="fw-bold">Nivel de riesgo</Form.Label>
          <Form.Control
            type="text"
            readOnly
            style={{ backgroundColor: "#FFFFFF", color: "black" }}
            value={nivelRiesgo}
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
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <i className="fas fa-exclamation-triangle me-2"></i>Evaluar nivel
              de riesgo
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
                <option value="1">Aprobado</option>
                <option value="2">Rechazado</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-bold">Nivel de riesgo</Form.Label>
              <Form.Select
                aria-label="Default select example"
                ref={selectNivRie}
              >
                <option value="4">Bajo</option>
                <option value="5">Medio</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="modalTextArea">
              <Form.Label className="fw-bold">Observaciones</Form.Label>
              <Form.Control as="textarea" rows={3} ref={inputObserv} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleClose}              
            >
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
