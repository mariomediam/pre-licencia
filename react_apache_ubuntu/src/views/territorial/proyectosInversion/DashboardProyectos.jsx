import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";

import Header from "../../../components/Header";
import LayoutBoardIcon from "../../../icons/LayoutBoardIcon";
import { CardIndicator } from "../../../components/territorial/proyectosInversion/CardIndicator";
import { ChartEjecucionPorMes } from "../../../components/territorial/proyectosInversion/ChartEjecucionPorMes";

const anioActual = () => {
  const fecha = new Date();
  return fecha.getFullYear();
};

const currentYear = new Date().getFullYear();

const anios = Array.from(
  { length: currentYear - 2020 },
  (_, i) => currentYear - i
);

export const DashboardProyectos = () => {
  let { anio = anioActual() } = useParams();
  const navigate = useNavigate();
  const sec_ejec = process.env.REACT_APP_SEC_EJEC;

  const [selectedAnio, setSelectedAnio] = useState(anio);

  const onChangeSelectYear = (e) => {
    setSelectedAnio(parseInt(e.target.value));
    navigate(`/territorial/proyectos-inversion/dashboard/${e.target.value}`);
  };

  

  return (
    <div>
      <Header />
      <div className="ps-3">
        <Breadcrumb>
          <Breadcrumb.Item active>Territorial</Breadcrumb.Item>
          <Breadcrumb.Item active>Proyectos de inversión</Breadcrumb.Item>
          <Breadcrumb.Item active>Reportes</Breadcrumb.Item>
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
              <LayoutBoardIcon className="me-2 mb-1" />
              Dashboard de Proyectos de Inversión
            </h3>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row d-flex  justify-content-between my-2">
          <div className="d-flex  justify-content-end">
            <div className="d-flex align-items-center gap-2 ">
              <span className="m-0 p-0">Año: </span>
              <select
                className="form-select "
                aria-label="Año a consultar"
                onChange={onChangeSelectYear}
                value={selectedAnio}
              >
                {anios.map((anio) => (
                  <option key={anio} value={anio}>
                    {anio}
                  </option>
                ))}
              </select>
            </div>
          </div>
            
          <div className="d-flex mt-3  justify-content-between flex-wrap">
           <CardIndicator  anio={selectedAnio} sec_ejec={sec_ejec}/>
           <ChartEjecucionPorMes anio={selectedAnio} sec_ejec={sec_ejec}/>
          </div>
        </div>
      </div>
    </div>
  );
};
