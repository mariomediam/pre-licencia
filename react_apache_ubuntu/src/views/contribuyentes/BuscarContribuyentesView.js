import { useState, useRef, useEffect, useContext } from "react";
import {
  Button,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import AuthContext from "../../context/AuthContext";

import Header from "../../components/Header";
import BuscarContribuyenteScrollComponent from "../../components/contribuyente/BuscarContribuyenteScrollComponent";


export default function BuscarContribuyentesView() {
  const { userName } = useContext(AuthContext);

  // const [filtro, setFiltro] = useState({ "estado": "9", "textoFiltro": "", "reload": true, "items": [], "usuario": userName })
  const [filtro, setFiltro] = useState({ "opcion": "", "valor": "", "reload": true, "items": []})

  const checkNombre = useRef();
  // const checkCodigo = useRef();
  const inputFiltro = useRef();

  const listarBuscarContribuyente = async () => {
    let valor = ""
    let opcion = ""
    if (inputFiltro.current) {
      valor = inputFiltro.current.value
    }
    // if (checkNombre.current.value === true){
    //   opcion = "nombre"
    // } else {
    //   opcion = "codigo"
    // }
    console.log("checkNombre.current.checked")
    console.log(checkNombre.current.checked)
    setFiltro({ "opcion":checkNombre.current.checked === true ? "nombre" : "codigo", "valor": valor, "items": [], "reload": true, "usuario": userName })
  };


  const inputKeyUp = (event) => {
    if (event.keyCode === 13) {
      // setPagNro(1)
      listarBuscarContribuyente();
    }
  };

  useEffect(() => {
    listarBuscarContribuyente();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);


  return (
    <div>
      <Header />

      <div>
        <div className="row justify-content-center">
          <div
            className="align-items-center p-2 col-sm-12 col-lg-8"
            style={{ border: "0px solid black" }}
          >
            <h3 className="mt-0 text-center">
              <i className="fas fa-search me-1"></i>
              Buscar contribuyente
            </h3>

            <div className="row justify-content-center">
              <div className="row col-sm-12 col-lg-8 mt-4">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="fw-bold">Buscar por</Form.Label>
                  <Form.Check                    
                    defaultChecked 
                    name="groupBusqueda"
                    type="radio"
                    id="chkNombre"
                    label="Nombre / Razón social"
                    value="nombre"
                    ref={checkNombre}
                    onChange={() => inputFiltro.current.select()}
                  />
                  <Form.Check                    
                    name="groupBusqueda"
                    type="radio"
                    label="Código de contribuyente"
                    id="chkCodigo"
                    value="codigo"   
                    onChange={() => inputFiltro.current.select()}                 
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="fw-bold">Valor buscado</Form.Label>
                  <InputGroup className="mb-3">
                    <FormControl
                      // placeholder="Recipient's username"
                      // aria-label="Recipient's username"
                      autoFocus
                      aria-describedby="basic-addon2"
                      ref={inputFiltro}
                      onKeyUp={inputKeyUp}
                    />
                    <Button
                      variant="outline-secondary"
                      id="button-addon2"
                      title="Buscar"
                      onClick={listarBuscarContribuyente}
                    >
                      <i className="fas fa-search"></i>
                    </Button>
                  </InputGroup>
                </Form.Group>
              </div>
            </div>



            <div className="table-responsive">
              <div>
                <BuscarContribuyenteScrollComponent filtro={filtro} />


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
