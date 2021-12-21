import { Form, ListGroup } from "react-bootstrap";

export default function PreLicenciaDatosComponent(){

    return (

        <div>
            <Form>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="fw-bold">Solicitante</Form.Label>
                    <Form.Control type="text"/>
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>
                <div className="row ">
                    <div className="col">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="fw-bold">Fecha de solicitud</Form.Label>
                        <Form.Control type="text"/>
                        </Form.Group>
                    </div>
                    <div className="col">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="fw-bold">Área (m2)</Form.Label>
                            <Form.Control type="text"/>                            
                        </Form.Group>
                    </div>
                </div>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="fw-bold">Actividades económicas</Form.Label>
                    <ListGroup>
                        <ListGroup.Item >5630 Actividades de servicio de bebidas</ListGroup.Item>
                        <ListGroup.Item >5610 Actividades de restaurantes y de servicio móvil de comidas</ListGroup.Item>
                    </ListGroup>                    
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="fw-bold">Dirección</Form.Label>
                    <ListGroup>
                        <ListGroup.Item>Código predial 01283004001</ListGroup.Item>
                        <ListGroup.Item>MERCADO DE TELAS AV. MARTIRES DE UCHURACCAY MZ Q LT 09</ListGroup.Item>
                    </ListGroup>                    
                </Form.Group>
                

            </Form>


            
        </div>
    )

}