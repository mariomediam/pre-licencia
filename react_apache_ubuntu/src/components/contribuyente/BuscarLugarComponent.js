import { useRef, useState } from "react";
import { Form, Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import BuscarLugarScrollComponent from "./BuscarLugarScrollComponent";

export const BuscarLugarComponent = ({ valores, show, handleClose }) => {
  const inputFiltro = useRef();
  const checkNombre = useRef();
  const [filtro, setFiltro] = useState({
    opcion: "",
    valor: "",
    reload: true,
    items: [],
  });

  const BuscarLugar = async (event) => {
    let valor = "";
    // console.log(inputFiltro.current.checkValidity());

    // setValidated(!inputFiltro.current.checkValidity());

    // if (!inputFiltro.current.checkValidity()) {
    //   console.log("entrooo");
    //   console.log((inputFiltro.current.isInvalid = true));
    // }
    if (inputFiltro.current) {
      valor = inputFiltro.current.value;
    }
    setFiltro({
      opcion: checkNombre.current.checked === true ? "nombre" : "codigo",
      valor: valor,
      items: [],
      reload: true,
    });
  };

  return (
    <div>
      <div>
        <Modal
          size="lg"
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <i className="fas fa-map-marker-alt me-2"></i>Buscar lugar
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row justify-content-center">
              <div
                className="align-items-center p-2 col-sm-12 col-lg-5"
                style={{ border: "0px solid black" }}
              >
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label className="text-muted mb-0 mt-0">
                    <small className="mb-0">Buscar por</small>
                  </Form.Label>
                  <Form.Check
                    defaultChecked
                    name="groupBusqueda"
                    type="radio"
                    id="chkNombre"
                    label="Nombre"
                    value="nombre"
                    ref={checkNombre}
                    onChange={() => inputFiltro.current.select()}
                  />
                  <Form.Check
                    name="groupBusqueda"
                    type="radio"
                    label="Código"
                    id="chkCodigo"
                    value="codigo"
                    onChange={() => inputFiltro.current.select()}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="text-muted mb-0 mt-0">
                    <small className="mb-0">Valor buscado</small>
                  </Form.Label>
                  <InputGroup className="mb-3" hasValidation>
                    <FormControl
                      autoFocus
                      aria-describedby="basic-addon2"
                      required
                      ref={inputFiltro}
                      //   onKeyUp={inputKeyUp}
                      //   isInvalid={validated}
                    />
                    <Form.Control.Feedback type="invalid" className="mt-0">
                      Ingresar valor buscado
                    </Form.Control.Feedback>
                    {/* {!validated && ( */}
                    <Button
                      variant="outline-secondary"
                      id="button-addon2"
                      title="Buscar"
                      onClick={BuscarLugar}
                    >
                      <i className="fas fa-search"></i>
                    </Button>
                    {/* )} */}
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
            
          </Modal.Body>

          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              <i className="far fa-times-circle me-1"></i>
              Cerrar
            </Button>
            <Button
              variant="primary"
              // onClick={grabarEvaluacion}
            >
              <i className="far fa-save me-2"></i>Seleccionar
            </Button>
          </Modal.Footer> */}
          <div>
              <BuscarLugarScrollComponent
                filtro={filtro}
                // setShowForm={setShowForm}
                // setContribEdit={setContribEdit}
              />
            </div>
        </Modal>
      </div>
    </div>
  );
};
