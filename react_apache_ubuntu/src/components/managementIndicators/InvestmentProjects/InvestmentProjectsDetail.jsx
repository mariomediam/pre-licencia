import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import XIcon from "../../../icons/XIcon";
import { CardIndicator } from "../../territorial/proyectosInversion/CardIndicator";
import { UltimaSincro } from "../../../views/territorial/proyectosInversion/UltimaSincro";
import { ChartEjecucionPorMes } from "../../territorial/proyectosInversion/ChartEjecucionPorMes";
import { ChartEjecucionAcumPorMes } from "../../territorial/proyectosInversion/ChartEjecucionAcumPorMes";
import { ResumenProyecto } from "../../territorial/proyectosInversion/ResumenProyecto";

export const InvestmentProjectsDetail = () => {
  const navigate = useNavigate();
  const { anio: urlYear } = useParams();

  const onClickClose = () => {
    navigate(-1);
  };

  return (
    <div className="p-3">
      <header className="d-flex justify-content-between">
        <div className="d-flex gap-0">
          <div className="m-0 p-0">
            <p className="m-0 p-0 fs-5 fw-bold">Indicadores de gestión</p>
            <p
              className="p-0"
              style={{ marginTop: "-5px", marginBottom: "0px" }}
            >
              {`Desarrollo territorial / Ejecución de proyectos de inversión ${urlYear}`}
            </p>
          </div>
        </div>

        <div
          className="d-flex align-items-center gap-2 "
          role="button"
          onClick={onClickClose}
        >
          <XIcon className="cursor-pointer" />
        </div>
      </header>
      <main className="d-flex justify-content-center w-100 mt-4 p-3 ">
        <div className="col-sm-12 col-xl-8 ">
        <div className="d-flex mt-3  justify-content-between flex-wrap">
          <CardIndicator
            anio={urlYear}
            sec_ejec={process.env.REACT_APP_SEC_EJEC}
          />
          <div className="w-100">
            <UltimaSincro
              ano_eje={urlYear}
              sec_ejec={process.env.REACT_APP_SEC_EJEC}
            />
          </div>
          <ChartEjecucionPorMes
            anio={urlYear}
            sec_ejec={process.env.REACT_APP_SEC_EJEC}
          />
          <ChartEjecucionAcumPorMes
            anio={urlYear}
            sec_ejec={process.env.REACT_APP_SEC_EJEC}
          />
          <ResumenProyecto
            anio={urlYear}
            sec_ejec={process.env.REACT_APP_SEC_EJEC}
          />
        </div>
        </div>
      </main>
    </div>
  );
};
