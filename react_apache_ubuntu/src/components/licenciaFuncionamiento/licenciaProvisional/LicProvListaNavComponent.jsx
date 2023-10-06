import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, InputGroup, Form, Nav } from "react-bootstrap";

import { obtenerLicProvCampos } from "../../../services/licFuncService";
import { getBuscarLicProv } from "../../../store/slices";

export const LicProvListaNavComponent = () => {

  const [camposBusqueda, setCamposBusqueda] = useState([])

  const dispatch = useDispatch();
  const selectCamposBuscar = useRef();
  const inputValorBuscar = useRef();
  const { tipo } = useParams();

  const obtenerCamposBuscar = async () => {
    const data = await obtenerLicProvCampos()    
    setCamposBusqueda(data)
  }

  const onClicBuscar = () => {
    dispatch(getBuscarLicProv(tipo, selectCamposBuscar.current.value, inputValorBuscar.current.value));
  }

  useEffect(() => {
    obtenerCamposBuscar()
  }, [])

  return (    
    <nav>
      <div className="d-flex justify-content-between  align-items-center gap-3 mx-1 flex-wrap px-4">
        <div className="flex-fill text-center text-sm-start fw-bold" >
          <i className="fas fa-utensils"></i> Emprendedores urbanos
        </div>

        <div className="flex-fill">
          <Nav
            activeKey="/home"
            onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            className="d-flex justify-content-center justify-content-sm-start"
          >
            <Nav.Item>
              <Nav.Link href="/home">
                <i className="fas fa-plus me-1"></i>Autorización
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1">Rubro</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2">Ubicaciones</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        <div className="d-flex flex-fill justify-content-end justify-content-sm-center align-items-center">
          <Form.Select size="sm" aria-label="Default select example" ref={selectCamposBuscar}>
            {camposBusqueda.map((campo) => (
              <option key={campo.value} value={campo.value}>{campo.display}</option>
            ))
              
            }          
          </Form.Select>
          <InputGroup size="sm">
            <Form.Control
              placeholder=""
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              ref={inputValorBuscar}
            />
            <Button
              id="button-addon2"
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#CED4DA",
                borderLeft: "none",
                color: "#000000",
              }}
              onClick={onClicBuscar}
            >
              <i className="fas fa-search"></i>
            </Button>
          </InputGroup>
        </div>
      </div>
    </nav>
  );
};
