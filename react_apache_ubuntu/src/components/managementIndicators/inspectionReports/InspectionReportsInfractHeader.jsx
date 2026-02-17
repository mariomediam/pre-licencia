import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "../../../icons/ArrowLeft";
import DownloadIcon from "../../../icons/DownloadIcon";

let anios = [];

  for (let i = 2024; i <= new Date().getFullYear(); i++) {
    anios.push(i);
  }

export const InspectionReportsInfractHeader = ({ year, infraction }) => {
    const navigate = useNavigate();

    const { Descripcion : descripcion, Norma : norma, Abreviatura : abreviatura } = infraction || {};

    console.log("infraction", infraction);

    const title = descripcion;
    const subTitle = norma;
  
    
    
  
    return (
      <header>
          {/* Botón Volver */}
          <button
            className="btn btn-link text-primary text-decoration-none d-flex align-items-center gap-1 fw-medium p-0 mb-3"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon width={16} height={16} />
            Volver
          </button>
    
          {/* Contenedor principal */}
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3">
            {/* Título */}
            <div>
  
            <h2 className="fw-bold mb-0" style={{ fontSize: "1.75rem" }}>
              {title}
            </h2>
            <p className="text-muted mb-0 small">Norma: {subTitle}</p>
            </div>
    
            {/* Filtros y botón exportar */}
            <div className="d-flex flex-column flex-lg-row flex-wrap align-items-center gap-3">
              {/* Selector Año */}
              {/* Selector Año */}
            <div className="d-flex align-items-center gap-2">
              <label htmlFor="year" className="text-muted mb-0">
                Año:
              </label>
              {year}
            </div>
                
    
              {/* Botón Exportar */}
              <button className="btn btn-primary d-flex align-items-center gap-2">
                <DownloadIcon width={16} height={16} />
                Exportar
              </button>
            </div>
          </div>
        </header>
    )
}
