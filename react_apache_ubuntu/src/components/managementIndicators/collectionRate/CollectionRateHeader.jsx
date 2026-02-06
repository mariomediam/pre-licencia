import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "../../../icons/ArrowLeft";
import DownloadIcon from "../../../icons/DownloadIcon";
import { obtenerNombreMes } from "../../../utils/varios";
import { useState, useEffect } from "react";



export const CollectionRateHeader = ({ tasa, year, selectedMonths }) => {
    const navigate = useNavigate();
    const { N_Tasa_Descrip, N_depend_Descripcion, C_Tasa_SATP } = tasa || {};

    const [selectedMonthsStr, setselectedMonthsStr] = useState("")

    useEffect(() => {
        if (selectedMonths.length > 0) {
            if (selectedMonths.length === 12) {
                setselectedMonthsStr("Todos");
            } else {
                setselectedMonthsStr(selectedMonths.map((month) =>  obtenerNombreMes(month).substring(0, 3)).join(", "));
            }
        } else {
            setselectedMonthsStr("");
        }
    }, [selectedMonths]);
  
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
            {N_Tasa_Descrip} <small className="text-muted">({C_Tasa_SATP})</small>
          </h2>
          <p className="text-muted mb-0 small">{N_depend_Descripcion}</p>
          </div>
  
          {/* Filtros y botón exportar */}
          <div className="d-flex flex-column flex-lg-row flex-wrap align-items-center gap-3">
            {/* Selector Año */}
            <div className="d-flex align-items-center gap-2">
              <label htmlFor="year" className="text-muted mb-0 small">
                Año:
              </label>
              {year}
            </div>
  
            {/* Selector Mes */}
            <div className="d-flex align-items-center gap-2">
              <small className="text-muted mb-0 small">Mes:</small>
                {selectedMonthsStr}
            </div>
  
            {/* Botón Exportar */}
            <button className="btn btn-primary d-flex align-items-center gap-2">
              <DownloadIcon width={16} height={16} />
              Exportar
            </button>
          </div>
        </div>
      </header>
    );
}