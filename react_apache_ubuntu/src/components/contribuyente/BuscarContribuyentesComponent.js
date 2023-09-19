// import * as React from "react";
import { useState, useRef, useContext, useEffect, Fragment } from "react";
import {
  Button,
  Form,
  InputGroup,
  FormControl,
  Breadcrumb,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import BuscarContribuyenteScrollComponent from "./BuscarContribuyenteScrollComponent";
import { obtenerTipoDocumento } from "../../services/contribuyenteService";

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
  const [tipoDocumento, setTipoDocumento] = useState([]);
  const [radioSelected, setRadioSelected] = useState("nombre");

  const checkNombre = useRef();
  const checkCodigo = useRef();
  const checkDocumento = useRef();
  const inputFiltro = useRef();
  const selectTipoDoc = useRef();

  const listarBuscarContribuyente = async (event) => {
    let valor = "";

    setValidated(!inputFiltro.current.checkValidity());
    if (inputFiltro.current) {
      valor = inputFiltro.current.value.trim();
      if (checkDocumento.current.checked) {
        valor = `${selectTipoDoc.current.value}-${valor.trim()}`;
      }
    }

    setFiltro({
      opcion:
        checkNombre.current.checked === true
          ? "nombre"
          : checkCodigo.current.checked === true
          ? "codigo"
          : "documento",
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

  const radioChange = () => {
    let tmpCheckSelected = "";

    if (checkNombre.current.checked) {
      tmpCheckSelected = "nombre";
    }
    if (checkCodigo.current.checked) {
      tmpCheckSelected = "codigo";
    }
    if (checkDocumento.current.checked) {
      tmpCheckSelected = "documento";
    }

    inputFiltro.current.select();

    setRadioSelected(tmpCheckSelected);
  };

  useEffect(() => {
    listarTipoDocumento();
    if (codContribIni) {
      inputFiltro.current.value = codContribIni;
      checkCodigo.current.checked = true;
      listarBuscarContribuyente();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listarTipoDocumento = async () => {
    const tipoDocumentoTmp = await obtenerTipoDocumento();
    setTipoDocumento(tipoDocumentoTmp);
  };

  return (
    <div className="px-1">
      <div className="ps-2">
        <Breadcrumb>
          <Breadcrumb.Item active>Contribuyente</Breadcrumb.Item>
        </Breadcrumb>        
      </div>
      {showForm === 1 ? (
        <Container className="d-flex flex-column border bg-white col-lg-10 col-xl-8 justify-content-center p-0 shadow mb-1 bg-body-tertiary rounded">
          <div className="d-flex justify-content-end m-0 p-2 bg-white">
            <small>
              <span style={{ color: "#4169E1" }}>
                <a
                  href={`${process.env.REACT_APP_API}/download-file/contribuyente/manual_contribuyentes.pdf`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i
                    className="fas fa-download"
                    title="Descargar"
                    style={{ color: "#4169E1" }}
                  ></i>{" "}
                  Manual de usuario
                </a>
              </span>{" "}
            </small>
          </div>

          <div className="bg-white pb-5 ">
            <div className="row justify-content-center p-0 m-0 ">
              <div
                className="align-items-center px-0 py-2 col-sm-12 col-lg-10 col-xl-8 overflow-hidden"
                style={{ border: "0px solid black" }}
              >
                <h3 className="mt-0 text-center">
                  <i className="fas fa-user me-1"></i>
                  Contribuyente
                </h3>

                <div className="row justify-content-center overflow-hidden">
                  <div className="row col-sm-12 col-lg-10 col-xl-8 mt-4">
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
                        onChange={radioChange}
                      />
                      <Form.Check
                        name="groupBusqueda"
                        type="radio"
                        label="Código de contribuyente"
                        id="chkCodigo"
                        value="codigo"
                        ref={checkCodigo}
                        onChange={radioChange}
                      />
                      <Container className="m-0 p-0">
                        <Row>
                          <Col md="auto" className="pe-2 me-0">
                            <Form.Check
                              name="groupBusqueda"
                              type="radio"
                              label=""
                              id="chkDocumento"
                              value="documento"
                              ref={checkDocumento}
                              onChange={radioChange}
                            />
                          </Col>
                          <Col className="ps-0 ms-0">
                            <Form.Select
                              aria-label="Tipo de documento"
                              value={tipoDocumento.C003Cod_Doc}
                              ref={selectTipoDoc}
                              // size="sm"
                              disabled={radioSelected !== "documento"}
                              onChange={() => inputFiltro.current.select()}
                            >
                              {tipoDocumento.map(
                                (
                                  {
                                    C003Cod_Doc,
                                    C003Nombre,
                                    C003Especificacion,
                                  },
                                  i
                                ) => (
                                  <Fragment key={i}>
                                    <option
                                      key={C003Cod_Doc}
                                      value={C003Cod_Doc}
                                    >
                                      {C003Cod_Doc === "01" ||
                                      C003Cod_Doc === "05"
                                        ? C003Nombre.trim()
                                        : C003Especificacion.trim()}
                                    </option>
                                  </Fragment>
                                )
                              )}
                            </Form.Select>
                          </Col>
                        </Row>
                      </Container>
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
                <div className="overflow-hidden">
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
        </Container>
      ) : null}     
    </div>
  );
}
