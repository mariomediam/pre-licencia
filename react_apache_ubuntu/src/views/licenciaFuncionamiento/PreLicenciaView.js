import { useState, useRef, useEffect, useContext } from "react";
import {
  Table,
  Button,
  Form,
  InputGroup,
  FormControl,
  ProgressBar,
  // Pagination,
} from "react-bootstrap";

import AuthContext from "../../context/AuthContext";

import Header from "../../components/Header";
import { obtenerPrecalUsuEstadoPagination } from "../../services/licFuncService";
import Loading from "../../components/Loading";
import PreLicenciaScrollComponent from "../../components/licenciaFuncionamiento/PreLicenciaScrollComponent";

export default function PreLicenciaView() {
  const { userName } = useContext(AuthContext);
  // const [estado, setEstado] = useState("9")
  const [filtro, setFiltro] = useState({"estado":"9", "textoFiltro":"", "reload":true, "items": Array.from({ length: 20 })})
  
  
  // const [listPrecalUsuEstado, setListPrecalUsuEstado] = useState([]);
  // const [listPrecalUsuEstadoFiltro, setListPrecalUsuEstadoFiltro] = useState(
  //   []
  // );
  // const [cargando, setCargando] = useState(false);
  // const [pagNro, setPagNro] = useState(1);

  const selectEstado = useRef();
  const inputFiltro = useRef();

  const listarPrecalUsuEstado = async () => { 
    let textoFiltro = ""
    if (inputFiltro.current) {
      textoFiltro = inputFiltro.current.value
    }
    setFiltro({"estado": selectEstado.current.value === "9" ? undefined : selectEstado.current.value, "textoFiltro":textoFiltro, "items": Array.from({ length: 20 }), "reload":true})   



    // setCargando(true);
    // let estado =
    //   selectEstado.current.value === "9"
    //     ? undefined
    //     : selectEstado.current.value;

    // const data = await obtenerPrecalUsuEstadoPagination(
    //   userName,
    //   estado,
    //   pagNro,
    //   10
    // );

    // const listPrecalUsuEstado = data.results;

    // let listPrecalUsuEstadoFiltroTmp = [];

    // if (inputFiltro.current) {
    //   if (inputFiltro.current.value.length > 0) {
    //     if (!isNaN(inputFiltro.current.value)) {
    //       listPrecalUsuEstadoFiltroTmp = listPrecalUsuEstado.filter(
    //         (fila) => fila.precalId === parseInt(inputFiltro.current.value)
    //       );
    //     } else {
    //       listPrecalUsuEstadoFiltroTmp = listPrecalUsuEstado.filter((fila) =>
    //         fila.webContribNomCompleto
    //           .replace("  ", " ")
    //           .toUpperCase()
    //           .includes(inputFiltro.current.value.toUpperCase())
    //       );
    //     }
    //   } else {
    //     listPrecalUsuEstadoFiltroTmp = [...listPrecalUsuEstado];
    //   }
    // }
    
    // setListPrecalUsuEstadoFiltro(listPrecalUsuEstadoFiltroTmp);    
    // setCargando(false);
    // console.log(listPrecalUsuEstadoFiltroTmp)
    // return listPrecalUsuEstadoFiltroTmp
  };

  
  const inputKeyUp = (event) => {
    if (event.keyCode === 13) {
      // setPagNro(1)
      listarPrecalUsuEstado();
    }
  };

  useEffect(() => {
    listarPrecalUsuEstado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  
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
                      onClick={listarPrecalUsuEstado}
                    >
                      <i className="fas fa-search"></i>
                    </Button>
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
            <div className="table-responsive">
              {/* {cargando ? (
                <Loading />
              ) : ( */}
                <div>
                  <PreLicenciaScrollComponent filtro={filtro}/>
                </div>
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
