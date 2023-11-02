import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button, InputGroup, Form, Nav } from "react-bootstrap";

import {
  obtenerLicProvCampos,
  obtenerLicProvTipo,
} from "../../../services/licFuncService";
import { getBuscarLicProv } from "../../../store/slices";

export const LicProvListaNavComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [camposBusqueda, setCamposBusqueda] = useState([]);
  const [datosTipo, setDatosTipo] = useState({
    licProvNombre: "",
    licProvIcon: "",
  });
  const [searchParams] = useSearchParams();
  const [filtros, setFiltros] = useState({
    campo: searchParams.get("campo") || "",
    valor: searchParams.get("valor") || "",
  });

  const { tipo } = useParams();
  const selectCamboPusqueda = useRef(null);

  const obtenerCamposBuscar = async () => {
    const data = await obtenerLicProvCampos();
    setCamposBusqueda(data);
    if (filtros.campo.length === 0){
     setFiltros({ ...filtros, campo: data[0].value });
    }
    
  };

  const onClicBuscar = async () => {
      
    navigate(
      `/licencia/provisional/listar/${tipo}/?campo=${filtros.campo}&valor=${filtros.valor}`
    );
    mostrarResultados();
  };

  const mostrarResultados = () => {
    dispatch(getBuscarLicProv(tipo, filtros.campo, filtros.valor));
  };

  const onClicAgregar = (event) => {
    event.preventDefault();
    navigate(`/licencia/provisional/gestionar/${tipo}/1`);
  };

  useEffect(() => {
    obtenerCamposBuscar();
    if (filtros.campo) {
      mostrarResultados();
    }
    
    
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const obtenerTipo = async () => {
      const { licProvNombre, licProvIcon } = await obtenerLicProvTipo(tipo);
      setDatosTipo({ licProvNombre, licProvIcon });
    };
    obtenerTipo();
  }, [tipo]);

  return (
    <nav className="px-5 border" style={{backgroundColor: "#F2E9F2"}}>
      
      <div className="grid-nav-licprov">
        {/* <div className="d-flex justify-content-between  align-items-center gap-3 mx-1 flex-wrap px-4"> */}
        {/* <div className="d-flex flex-fill align-items-center" >
          <div className="" >
            <h1 className="text-end">
              <i className={`${datosTipo.licProvIcon} me-3`}></i>              
            </h1>
          </div>
          <div className="" style={{ maxWidth: "250px" }}>
          <h3 className="text-start">              
              {datosTipo.licProvNombre}
            </h3>
          </div>
        </div> */}

        <div className="d-flex flex-fill align-items-center justify-content-center">
          <div>
            <h1 className="text-end">
              <i className={`${datosTipo.licProvIcon} me-3`}></i>
            </h1>
          </div>
          <div className="" style={{ maxWidth: "150px" }}>
            <h3
              className="text-start"
              style={{ viewTransitionName: `tipo-lic-prov-${tipo}` }}
            >
              {datosTipo.licProvNombre}
            </h3>
          </div>
        </div>

        <div className="d-flex flex-fill justify-content-center ms-3 ">
          <Nav
            activeKey="/home"
            // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            className="d-flex justify-content-center justify-content-sm-start"
          >
            <Nav.Item>
              <Nav.Link href="/home" onClick={onClicAgregar}>
                <i className="fas fa-plus me-1"></i>Autorización
              </Nav.Link>
            </Nav.Item>
            {/* <Nav.Item>
              <Nav.Link eventKey="link-1">Rubro</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2">Ubicaciones</Nav.Link>
            </Nav.Item> */}
          </Nav>
        </div>

        <div className="d-flex flex-fill justify-content-end justify-content-sm-center align-items-center">
          <Form.Select
            size="sm"
            aria-label="Default select example"
            ref = {selectCamboPusqueda}
            value={filtros.campo}
            onChange={(e) => setFiltros({ ...filtros, campo: e.target.value })}
          >
            {camposBusqueda.map((campo) => (
              <option key={campo.value} value={campo.value}>
                {campo.display}
              </option>
            ))}
          </Form.Select>
          <InputGroup size="sm">
            <Form.Control
              placeholder=""
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={filtros.valor}
              onChange={(e) =>
                setFiltros({ ...filtros, valor: e.target.value })
              }
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
