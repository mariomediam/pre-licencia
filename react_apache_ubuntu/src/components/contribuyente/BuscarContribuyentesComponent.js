import { useState, useRef, useContext, useEffect } from "react";
import {
  Button,
  Form,
  InputGroup,
  FormControl,
  Breadcrumb,
} from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import BuscarContribuyenteScrollComponent from "./BuscarContribuyenteScrollComponent";

export default function BuscarContribuyentesComponent({
  showForm,
  setShowForm,
  setContribEdit,
  codContribIni,  
}) {
  const { userName } = useContext(AuthContext);
  const [filtro, setFiltro] = useState({
    opcion: "",
    valor: "",
    reload: true,
    items: [],
  });
  const [validated, setValidated] = useState(false);

  const checkNombre = useRef();
  const checkCodigo = useRef();
  const inputFiltro = useRef();

  const listarBuscarContribuyente = async (event) => {
    let valor = "";
    

    setValidated(!inputFiltro.current.checkValidity());    
    if (inputFiltro.current) {
      valor = inputFiltro.current.value;
    }
    setFiltro({
      opcion: checkNombre.current.checked === true ? "nombre" : "codigo",
      valor: valor,
      items: [],
      reload: true,
      usuario: userName,
    });
  };

  const inputKeyUp = (event) => {
    
    if (inputFiltro.current.value.length > 0) {
      setValidated(false);
    }
    if (event.keyCode === 13) {
      listarBuscarContribuyente();
    }
  };

  useEffect(() => {
    if (codContribIni) {      
      inputFiltro.current.value = codContribIni;
      checkCodigo.current.checked = true;
      listarBuscarContribuyente();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {showForm === 1 ? (
        <div>
          <div className="ps-3">
            <Breadcrumb>
              <Breadcrumb.Item active>Contribuyente</Breadcrumb.Item>              
            </Breadcrumb>
          </div>
          <div>
            <div className="row justify-content-center">
              <div
                className="align-items-center p-2 col-sm-12 col-lg-8"
                style={{ border: "0px solid black" }}
              >
                <h3 className="mt-0 text-center">
                  <i className="fas fa-user me-1"></i>
                  Contribuyente
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
                        ref={checkCodigo}
                        onChange={() => inputFiltro.current.select()}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="fw-bold">Valor buscado</Form.Label>
                      <InputGroup className="mb-3" hasValidation>
                        <FormControl
                          autoFocus
                          aria-describedby="basic-addon2"
                          required
                          ref={inputFiltro}
                          onKeyUp={inputKeyUp}
                          isInvalid={validated}
                        />
                        <Form.Control.Feedback type="invalid" className="mt-0">
                          Ingresar valor buscado
                        </Form.Control.Feedback>
                        {!validated && (
                          <Button
                            variant="outline-secondary"
                            id="button-addon2"
                            title="Buscar"
                            onClick={listarBuscarContribuyente}
                          >
                            <i className="fas fa-search"></i>
                          </Button>
                        )}
                      </InputGroup>
                    </Form.Group>
                  </div>
                </div>
                {/* <div className="table-responsive"> */}
                <div>
                  <BuscarContribuyenteScrollComponent
                    filtro={filtro}
                    setShowForm={setShowForm}
                    setContribEdit={setContribEdit}                    
                  />
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
