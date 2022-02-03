import { useState, useEffect } from 'react'
import { Form, ListGroup } from "react-bootstrap";
import { obtenerPrecalificacionPorId, obtenerGirosPorPrecalId } from "../../services/licFuncService";

export default function PreLicenciaDatosComponent({ precalId }){

    const [solNombre, setSolNombre] = useState('')
    const [solFecha, setSolFecha] = useState('')
    const [solCodCatast, setSolCodCatast] = useState('')
    const [solDireccion, setSolDireccion] = useState('')
    const [area, setArea] = useState(0)
    const [giros, setGiros] = useState([])
    const [solDescrip, setSolDescrip] = useState('')
    const [solCorreo, setSolCorreo] = useState('')
    const [solTelefono, setSolTelefono] = useState('')


    const verPrecalificacion = async () => {
        
        const {precalArea, precalDigitFecha, precalCodCatast, precalDireccion, precalSolicitante : { webContribNomCompleto }, precalDescripcion, precalCorreo, precalTelefono} = await obtenerPrecalificacionPorId(
            precalId
        );

        const girosTmp = await obtenerGirosPorPrecalId(precalId)
                    
        const formatFecha = new Date(precalDigitFecha);        
        const dia = formatFecha.getDate().toString().padStart(2, "0");
        const mes =  String(formatFecha.getMonth() + 1).padStart(2, "0")
        const anio = formatFecha.getFullYear();
        const hora = formatFecha.getHours().toString().padStart(2, "0");
        const minutos = formatFecha.getMinutes().toString().padStart(2, "0");
        
        setArea(parseFloat(precalArea).toFixed(2))
        setSolNombre(webContribNomCompleto)
        setSolFecha(''.concat(dia, "/", mes, "/", anio, " ", hora, ":", minutos))
        setSolCodCatast(precalCodCatast)
        setSolDireccion(precalDireccion)
        setGiros(girosTmp)
        setSolDescrip(precalDescripcion)
        setSolCorreo(precalCorreo)
        setSolTelefono(precalTelefono)
        

        
        
      };

      useEffect(() => {
        verPrecalificacion();  
        // eslint-disable-next-line react-hooks/exhaustive-deps      
      }, [precalId]);

    

    return (

        <div>
            <Form>
                
                {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="fw-bold">Solicitante</Form.Label>
                    <Form.Control type="text" readOnly style={{backgroundColor: "#FFFFFF", color: "black"}} value={solNombre}/>                   
                </Form.Group> */}
                <Form.Group className="mb-3" controlId="formSolicitante">
                    <Form.Label className="fw-bold">Solicitante</Form.Label>
                    <ListGroup>
                        <ListGroup.Item>{solNombre}</ListGroup.Item>
                        <ListGroup.Item><small>Correo:</small> {solCorreo}</ListGroup.Item>
                        <ListGroup.Item><small>Teléfono:</small> {solTelefono}</ListGroup.Item>
                    </ListGroup>                    
                </Form.Group>

                <div className="row ">
                    <div className="col">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="fw-bold">Fecha de solicitud</Form.Label>
                        <Form.Control type="text" readOnly style={{backgroundColor: "#FFFFFF", color: "black"}} value = {solFecha}/>
                        </Form.Group>
                    </div>
                    <div className="col">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="fw-bold">Área (m2)</Form.Label>
                            <Form.Control type="text" readOnly style={{backgroundColor: "#FFFFFF", color: "black"}} value = {area}/>                            
                        </Form.Group>
                    </div>
                </div>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="fw-bold">Actividades económicas</Form.Label>
                        <ListGroup.Item>{solDescrip}</ListGroup.Item>
                        {giros.map((giro, i) => (
                            <ListGroup.Item key={giro.precalGiroNegId}>{giro.giroNegocio.giroNegCIIU} {giro.giroNegocio.giroNegNombre}</ListGroup.Item>
                    
                        ))}
                  

                   
                                           
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="fw-bold">Dirección</Form.Label>
                    <ListGroup>
                        <ListGroup.Item>Código predial {solCodCatast}</ListGroup.Item>
                        <ListGroup.Item>{solDireccion}</ListGroup.Item>
                    </ListGroup>                    
                </Form.Group>
                

            </Form>


            
        </div>
    )

}