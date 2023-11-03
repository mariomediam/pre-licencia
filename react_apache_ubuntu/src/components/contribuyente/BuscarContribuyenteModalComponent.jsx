import { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Table,
} from "react-bootstrap";
import {
  obtenerContribuyenteCodigo,
  obtenerContribuyenteNombre,
} from "../../services/contribuyenteService";

export const BuscarContribuyenteModalComponent = ({
  setField,
  show,
  handleClose,
}) => {
  const [validated, setValidated] = useState(false);
  const [contribuyentes, setContribuyentes] = useState([]);
  const inputFiltro = useRef();
  const checkNombre = useRef();

  const BuscarContrib = async (event) => {
    let valor = "";

    setValidated(!inputFiltro.current.checkValidity());

    if (inputFiltro.current) {
      valor = inputFiltro.current.value;
    } else {
      return;
    }

    let contribTmp = [];
    if (checkNombre.current.checked === true) {
      contribTmp = await obtenerContribuyenteNombre(valor);
    } else {
      contribTmp = [await obtenerContribuyenteCodigo(valor)];
    }
    setContribuyentes(contribTmp);
  };

  const inputKeyUp = (event) => {
    if (inputFiltro.current.value.length > 0) {
      setValidated(false);
    }
    if (event.keyCode === 13) {
      BuscarContrib();
    }
  };

  const seleccionarContribuyente = (event) => {
    const codigo = event.target.id;
    setField(codigo);
    handleClose();
  };

  useEffect(() => {
    setContribuyentes([]);
  }, [show]);

  return (
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
            <i className="fas fa-users me-2"></i>Buscar contribuyente
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
                      onClick={BuscarContrib}
                    >
                      <i className="fas fa-search"></i>
                    </Button>
                  )}
                </InputGroup>
              </Form.Group>
            </div>
            <div className="px-4">
              <small> {contribuyentes.length} registro(s) encontrado(s)</small>
              <Table hover className="caption-top">
                <thead>
                  <tr className="color-header1 text-white">
                    <th className="text-center align-middle m-0 p-0">Código</th>
                    <th className="text-center align-middle m-0 p-0">Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  {contribuyentes.map(
                    ({ Código, Identificación, Dirección }) => (
                      <tr key={Código}>
                        <td>
                          <Card.Link
                            href="#"
                            id={Código}
                            onClick={seleccionarContribuyente}
                          >
                            {Código}
                          </Card.Link>
                        </td>
                        <td>{Identificación}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
