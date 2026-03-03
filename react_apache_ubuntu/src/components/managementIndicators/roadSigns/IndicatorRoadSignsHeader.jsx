import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "../../../icons/ArrowLeft";
import DownloadIcon from "../../../icons/DownloadIcon";
import { MultiSelectMonths } from "../../tools/MultiSelectMonths";

const years = Array.from({ length: new Date().getFullYear() - 2024 + 1 }, (_, i) => new Date().getFullYear() - i);

export const IndicatorRoadSignsHeader = ({ setYear, selectedMonths, setSelectedMonths, roadSignsGroupByUniMed = [], handleDownload }) => {
  const navigate = useNavigate();
  // const title  = `${totalCapacitaciones} personas capacitadas`




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
          <span className="text-muted fw-medium p-0 m-0"><small>Total intervenido:</small></span>
          {roadSignsGroupByUniMed.map((item) => (
            <h2  className="fw-bold p-0 m-0" key={item.N_unimed_desc}> {item.cantidad} {item.N_unimed_desc === "M2" ? "m²" : item.N_unimed_desc}</h2>
          ))}
        </div>

        {/* Filtros y botón exportar */}
        <div className="d-flex flex-column flex-lg-row flex-wrap align-items-center gap-3">
          {/* Selector Año */}
          <div className="d-flex align-items-center gap-2">
            <label htmlFor="year" className="text-muted mb-0 small">
              Año:
            </label>
            <select
              name="year"
              id="year"
              className="form-select form-select-sm"
              style={{ width: "auto", minWidth: "90px" }}
              defaultValue={new Date().getFullYear()}
              onChange={(e) => setYear(parseInt(e.target.value))}
            >
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Selector Mes */}
          <div className="d-flex align-items-center gap-2">
            <small className="text-muted mb-0 small">Mes:</small>
            <MultiSelectMonths
              selectedMonths={selectedMonths}
              onChange={setSelectedMonths}
              label="Mes:"
              placeholder="Seleccionar"
            />
          </div>

          {/* Botón Exportar */}
          <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleDownload}>
            <DownloadIcon width={16} height={16} />
            Exportar
          </button>
        </div>
      </div>
    </header>
  );
};
