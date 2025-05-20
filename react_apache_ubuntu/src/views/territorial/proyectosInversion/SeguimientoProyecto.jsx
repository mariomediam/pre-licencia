import { useEffect, useState } from "react";
import {
  Breadcrumb,
  Form,
  InputGroup,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { Mes } from "../../../utils";
import { useParams } from "react-router-dom";

import Header from "../../../components/Header";
import ChartHistogramIcon from "../../../icons/ChartHistogramIcon";
import { SeguimientoProyectoMes } from "../../../components/territorial/proyectosInversion/SeguimientoProyectoMes";
import FileTypeXLSIcon from "../../../icons/FileTypeXLSIcon";

const anioActual = () => {
  const fecha = new Date();
  return fecha.getFullYear();
};

const mesActual = () => {
  const fecha = new Date();
  return fecha.getMonth() + 1;
};

const currentYear = new Date().getFullYear();
const anios = Array.from(
  { length: currentYear - 2020 },
  (_, i) => currentYear - i
);

export const SeguimientoProyecto = () => {
  

  let { anio = anioActual(), mes = mesActual() } = useParams();

  const [selectedAnio, setSelectedAnio] = useState(anio);
  const [selectedMonth, setSelectedMonth] = useState(mes);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const secEjec = process.env.SEC_EJEC;
    console.log("Variable de entorno SEC_EJEC:", secEjec);
  }, []);

  return (
    <div>
      <Header />
      <div className="ps-3">
        <Breadcrumb>
          <Breadcrumb.Item active>Territorial</Breadcrumb.Item>
          <Breadcrumb.Item active>Proyectos de inversión</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <hr className="p-0 m-0" />
      <div className="container">
        <div className="row justify-content-center">
          <div
            className="align-items-center p-2 col-sm-12 col-lg-8"
            style={{ border: "0px solid black" }}
          >
            <h3 className="mt-0 text-center">
              <ChartHistogramIcon className="me-2 mb-1" />
              Seguimiento de Proyectos de Inversión
            </h3>
          </div>
        </div>
      </div>
      <div className="container border">
        <div className="row d-flex  justify-content-between my-2">
          <div className="d-flex  justify-content-between  flex-wrap">
            <Row className="col-12 col-lg-4 p-0 m-0 gap-3">
              {/* Campo Año */}
              <Col className="m-0 p-0">
                <Form.Group controlId="anio">
                  <Form.Label>Año</Form.Label>
                  <Form.Select
                    aria-label="Año del proyecto "
                    className="mb-0"
                    defaultValue={selectedAnio}
                    onChange={(e) => setSelectedAnio(e.target.value)}
                  >
                    {anios.map((anio) => (
                      <option key={anio} value={anio}>
                        {anio}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* Campo Mes */}
              <Col className="m-0 p-0">
                <Form.Group controlId="mes">
                  <Form.Label>Mes</Form.Label>
                  <Mes
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                    className="mb-0"
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="col-12 col-lg-5 p-0 m-0">
              <Form.Label htmlFor="selectMes" className="">
                Buscar proyecto
              </Form.Label>
              <InputGroup className="">
                <Form.Control
                  placeholder="Buscar por código o descripción..."
                  aria-label="Buscar por código o descripción..."
                  aria-describedby="Buscar por código o descripción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline-dark" id="button-addon2">
                  <FileTypeXLSIcon /> Exportar
                </Button>
              </InputGroup>              
            </div>
          </div>
          <SeguimientoProyectoMes
            selectedAnio={selectedAnio}
            selectedMonth={selectedMonth}
            searchTerm={searchTerm}            
          />
        </div>
      </div>
      <div>
        <p>{selectedAnio}</p>
        <p>{selectedMonth}</p>
      </div>
    </div>
  );
};
