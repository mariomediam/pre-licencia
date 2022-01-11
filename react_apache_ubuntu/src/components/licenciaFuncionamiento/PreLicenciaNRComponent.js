import { useState, useEffect } from 'react'
import { Form, Button, Modal } from "react-bootstrap";
import { obtenerEvaluacionPorPrecalIdTipoEval } from "../../services/licFuncService";


export default function PreLicenciaNRComponent({precalId}) {

  const [show, setShow] = useState(false);
  
  const [resultado, setResultado] = useState('Pendiente')
  const [nivelRiesgo, setNivelRiesgo] = useState('')
  const [observaciones, setObservaciones] = useState('')
  const [existeEvaluacion, setExisteEvaluacion] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const verEvaluacion = async () => {
        
   
    const evaluacionTmp  = await obtenerEvaluacionPorPrecalIdTipoEval(precalId, 1)
                
    if (evaluacionTmp){      
      setExisteEvaluacion(true)
      setResultado(evaluacionTmp.precalEvalEstadoNombre)
      switch(evaluacionTmp.precalificacion.precalRiesgo){
        case 4:
          setNivelRiesgo('BAJO')
          break;
        case 5:
          setNivelRiesgo('MEDIO')
          break;
        case 6:
          setNivelRiesgo('ALTO')
          break;
        case 7:
          setNivelRiesgo('MUY ALTO')
          break;
        default:
          setNivelRiesgo('INDETERMINADO')

      }
      setObservaciones(evaluacionTmp.precalEvalComent)
    }
    
    
  };

  useEffect(() => {
    verEvaluacion();  
    // eslint-disable-next-line react-hooks/exhaustive-deps      
  }, [precalId]);


  return (
    <div>
      { !existeEvaluacion && <div className="d-flex justify-content-end">
        <Button variant="success" onClick={handleShow}>
          <i className="fas fa-clipboard-check me-2"></i>
          Evaluar
        </Button>
      </div>}
      

      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="fw-bold">Resultado de evaluación</Form.Label>
          <Form.Control type="text" readOnly style={{backgroundColor: "#FFFFFF", color: "black"}} value={resultado}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="fw-bold">Nivel de riesgo</Form.Label>
          <Form.Control type="text" readOnly style={{backgroundColor: "#FFFFFF", color: "black"}} value={nivelRiesgo}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label className="fw-bold">Observaciones</Form.Label>
          <Form.Control as="textarea" readOnly style={{backgroundColor: "#FFFFFF", color: "black"}} value={observaciones} rows={3} />
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
              <Form.Select aria-label="Default select example">
                <option value="1">Aprobado</option>
                <option value="2">Rechazado</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-bold">Nivel de riesgo</Form.Label>
              <Form.Select aria-label="Default select example">
                <option value="1">Bajo</option>
                <option value="2">Medio</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="fw-bold">Observaciones</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              <i className="far fa-times-circle me-1"></i>
              Cerrar
            </Button>
            <Button variant="primary">
              <i className="far fa-save me-2"></i>Grabar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
