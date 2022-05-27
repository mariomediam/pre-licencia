import { useState, useRef, useEffect, useContext } from "react";
import {
  Table,
  Button,
  Form,
  InputGroup,
  FormControl,
  ProgressBar,
} from "react-bootstrap";

import AuthContext from "../../context/AuthContext";

import Header from "../../components/Header";
import { obtenerPrecalUsuEstado } from "../../services/licFuncService";
import Loading from "../../components/Loading";

export default function PreLicenciaView() {
  const { userName } = useContext(AuthContext);

  const [listPrecalUsuEstado, setListPrecalUsuEstado] = useState([]);

  const [listPrecalUsuEstadoFiltro, setListPrecalUsuEstadoFiltro] = useState(
    []
  );
  const [cargando, setCargando] = useState(false);

  const selectEstado = useRef();

  const inputFiltro = useRef();

  const listarPrecalUsuEstado = async () => {

    setCargando(true)
    let estado =
      selectEstado.current.value === "9"
        ? undefined
        : selectEstado.current.value;

    const listPrecalUsuEstadoTmp = await obtenerPrecalUsuEstado(
      userName,
      estado
    );

    setListPrecalUsuEstado(listPrecalUsuEstadoTmp);
    setCargando(false)
  };

  const listarPrecalUsuEstadoFiltro = () => {
    let listPrecalUsuEstadoFiltroTmp = [];

    if (inputFiltro.current) {
      if (inputFiltro.current.value.length > 0) {
        if (!isNaN(inputFiltro.current.value)) {
          listPrecalUsuEstadoFiltroTmp = listPrecalUsuEstado.filter(
            (fila) => fila.precalId === parseInt(inputFiltro.current.value)
          );
        } else {
          listPrecalUsuEstadoFiltroTmp = listPrecalUsuEstado.filter((fila) =>
            fila.webContribNomCompleto
              .replace("  ", " ")
              .toUpperCase()
              .includes(inputFiltro.current.value.toUpperCase())
          );
        }
      } else {
        listPrecalUsuEstadoFiltroTmp = [...listPrecalUsuEstado];
      }
    }

    // console.log(listPrecalUsuEstadoFiltroTmp);

    setListPrecalUsuEstadoFiltro(listPrecalUsuEstadoFiltroTmp);
  };

  const inputKeyUp = (event) => {
    if (event.keyCode === 13) {
      listarPrecalUsuEstadoFiltro();
    }
  };

  useEffect(() => {
    listarPrecalUsuEstado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  useEffect(() => {
    listarPrecalUsuEstadoFiltro();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listPrecalUsuEstado]);

  return (
    <div>
      <Header />

      <div className="container">
        <div className="row justify-content-center">
          <div
            className="align-items-center p-2 col-sm-12 col-lg-8"
            style={{ border: "0px solid black" }}
          >
            <h3 className="mt-0 text-center">
              <i className="fas fa-store me-3"></i>
              Pre Licencia de Funcionamiento
            </h3>
            <div className="row mt-4">
              <div className="col-12 col-sm-6">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="fw-bold">Mostrar</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    ref={selectEstado}
                    onChange={listarPrecalUsuEstado}
                  >
                    <option value="0">Pendientes</option>
                    <option value="9">Todos</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-12 col-sm-6">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="fw-bold">Filtrar por</Form.Label>
                  <InputGroup className="mb-3">
                    <FormControl
                      // placeholder="Recipient's username"
                      // aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      ref={inputFiltro}
                      onKeyUp={inputKeyUp}
                    />
                    <Button
                      variant="outline-secondary"
                      id="button-addon2"
                      title="Buscar"
                      onClick={listarPrecalUsuEstadoFiltro}
                    >
                      <i className="fas fa-search"></i>
                    </Button>
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
            <div className="table-responsive">
              {cargando ? (
                <Loading />
              ) : (
                <Table bordered hover className="caption-top">
                  <caption className="py-0">
                    {" "}
                    {listPrecalUsuEstadoFiltro.length} registro(s) encontrado(s)
                  </caption>
                  <thead>
                    <tr className="color-header1 text-white">
                      <th className="text-center align-middle m-0 p-0">Id</th>
                      <th className="text-center align-middle m-0 p-0">
                        Solicitante
                      </th>
                      <th className="text-center align-middle m-0 p-0">
                        Estado
                      </th>
                      <th className="text-center align-middle m-0 p-0">Ver</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listPrecalUsuEstadoFiltro.map((soliciPrecalif, i) => (
                      <tr key={soliciPrecalif.precalId}>
                        <td>
                          {soliciPrecalif.precalId.toString().padStart(4, "0")}
                        </td>
                        <td>{soliciPrecalif.webContribNomCompleto}</td>
                        <td>
                          {/* {soliciPrecalif.webContribNomCompleto} */}
                          <ProgressBar
                            now={soliciPrecalif.porc_evaluacion}
                            label={`${soliciPrecalif.porc_evaluacion}%`}
                            variant={soliciPrecalif.rechazado ? "danger" : ""}
                          />
                          <div>
                            <small>{soliciPrecalif.ofic_pendiente}</small>
                          </div>
                        </td>
                        <td className="text-center px-1 mx-0">
                          <Button
                            href={`/pre_licencia_ver/${soliciPrecalif.precalId}`}
                            variant="success"
                            size="sm"
                            title="Ver solicitud"
                          >
                            <i className="fas fa-eye"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
