import { useState, useContext, useEffect, useRef } from "react";
import { Form, Button, ListGroup, Modal, Table } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import { obtenerEvaluacionPorPrecalIdTipoEval, obtenerUsuarioTipoEval, obtenerDocumPorPrecalIdTipoEval, obtenerTipoDocum, agregarEvaluacion } from "../../services/licFuncService";
import { Toast } from '../tools/PopMessage';


export default function PreLicenciaRequisitosComponent({precalId, verPrecalificacion}) {
  const [show, setShow] = useState(false);
  const [resultado, setResultado] = useState('Pendiente')
  const [documentos, setDocumentos]   = useState([])
  const [observaciones, setObservaciones] = useState('')
  const [puedeEvaluar, setPuedeEvaluar] = useState(false)  
  const [tipoDocumentos, setTipoDocumentos] = useState([])
  const { userName } = useContext(AuthContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const selectResultEval = useRef();
  const inputObserv = useRef();

  const verEvaluacion = async () => {   
   
    const evaluacionTmp  = await obtenerEvaluacionPorPrecalIdTipoEval(precalId, 3)

    if (evaluacionTmp){     
            
      const documentosTmp = await obtenerDocumPorPrecalIdTipoEval(precalId, 3)

      setResultado(evaluacionTmp.precalEvalEstadoNombre)    
      setObservaciones(evaluacionTmp.precalEvalComent)
      setDocumentos(documentosTmp)    
      
    } else {

      let UsuarioTipoEvalTmp = []

      if (userName){
        UsuarioTipoEvalTmp  = await obtenerUsuarioTipoEval(userName, 3)    

        if (UsuarioTipoEvalTmp && UsuarioTipoEvalTmp.length > 0){
          setPuedeEvaluar(true)
        }
      }
      
    }    
    
  };

  const verTipoDocumentos = async () => {   
   
    const tipoDocumentosTmp  = await obtenerTipoDocum()

    tipoDocumentosTmp.forEach(tipDocum => tipDocum["selecc"]=false)    

    setTipoDocumentos(tipoDocumentosTmp)      
    
  };

  useEffect(() => {
    verEvaluacion();  
    // eslint-disable-next-line react-hooks/exhaustive-deps      
  }, [precalId, userName]);

  useEffect(()=> {
    verTipoDocumentos()
  }, [])

  const onCheckChange = (event) => {
    
    const idChecked = parseInt(event.target.id)
    const valueChecked = event.target.checked

    tipoDocumentos.forEach(tipDocum => {      
      if (tipDocum["precalTipDocId"] === idChecked){
        tipDocum["selecc"] = valueChecked
      }
    })

    setTipoDocumentos(tipoDocumentos)

  };

  const grabarEvaluacion = async () => {

    const documentosSelecc = tipoDocumentos.filter( documento => documento.selecc === true)

    await agregarEvaluacion(precalId, 3, inputObserv.current.value, userName, 'INDETERMINADO', selectResultEval.current.value, undefined, documentosSelecc)

    verEvaluacion()
    setPuedeEvaluar(false)
    verPrecalificacion()

    setShow(false)
    
    Toast.fire({
      icon: 'success',
      title: 'El registro se grabo con éxito',
      background: '#F4F6F6',
    })
  }



  return (
    <div>
      { puedeEvaluar && <div className="d-flex justify-content-end">
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
          <Form.Label className="fw-bold">
            Documentación sustentatoria solicitada
          </Form.Label>
          <ListGroup>
            {
              documentos.map(({precalDocumId, tipoDocum : {precalTipDocNombre}}, i) => (
                <ListGroup.Item key={precalDocumId}>
                  {i + 1} {precalTipDocNombre}
                </ListGroup.Item>
            ))}          
          </ListGroup>
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
              <i className="fas fa-tasks me-2"></i>Evaluar requisitos
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-bold">
                Resultado de evaluación
              </Form.Label>
              <Form.Select aria-label="Default select example" ref={selectResultEval}>
                <option value="1">Aprobado</option>
                <option value="2">Rechazado</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-bold">
                Documentación sustentatoria solicitada
              </Form.Label>
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Autoridad competente</th>
                    <th>Exigible</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    tipoDocumentos.map(({precalTipDocId, precalTipDocNombre}, i) => (
                      <tr key={precalTipDocId}>
                        <td>{i+1}</td>
                        <td>{precalTipDocNombre}</td>
                        <td>
                          {" "}
                          <Form.Check type="checkbox" 
                            aria-label={precalTipDocNombre} 
                            id={precalTipDocId}     
                            onChange={onCheckChange}                         
                          />
                        </td>
                      </tr>
                  ))}                    
                </tbody>
              </Table>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="fw-bold">Observaciones</Form.Label>
              <Form.Control as="textarea" rows={3} ref={inputObserv}/>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              <i className="far fa-times-circle me-1"></i>
              Cerrar
            </Button>
            <Button variant="primary" onClick={grabarEvaluacion}>
              <i className="far fa-save me-2"></i>Grabar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
