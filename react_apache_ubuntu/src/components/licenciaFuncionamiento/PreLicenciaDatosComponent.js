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


    const verPrecalificacion = async () => {
        
        const {precalArea, precalDigitFecha, precalCodCatast, precalDireccion, precalSolicitante : { webContribNomCompleto }} = await obtenerPrecalificacionPorId(
            precalId
        );

        const girosTmp = await obtenerGirosPorPrecalId(precalId)
                    
        const formatFecha = new Date(precalDigitFecha);
        const dia = formatFecha.getDate();
        const mes = formatFecha.getMonth();
        const anio = formatFecha.getFullYear();
        const hora = formatFecha.getHours().toString().padStart(2, "0");
        const minutos = formatFecha.getMinutes().toString().padStart(2, "0");
        

        setArea(parseFloat(precalArea).toFixed(2))
        setSolNombre(webContribNomCompleto)
        setSolFecha(''.concat(dia, "/", mes, "/", anio, " ", hora, ":", minutos))
        setSolCodCatast(precalCodCatast)
        setSolDireccion(precalDireccion)
        setGiros(girosTmp)
        
        
      };

      useEffect(() => {
        verPrecalificacion();  
        // eslint-disable-next-line react-hooks/exhaustive-deps      
      }, [precalId]);

    

    return (

        <div>
            <Form>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="fw-bold">Solicitante</Form.Label>
                    <Form.Control type="text" readOnly style={{backgroundColor: "#FFFFFF", color: "black"}} value={solNombre}/>
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
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