import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "../../../icons/ArrowLeft";
import DownloadIcon from "../../../icons/DownloadIcon";
import { MultiSelectMonths } from "../../tools/MultiSelectMonths";

export const CollectionOfficeHeader = ({ dataOffice, setYear, selectedMonths, setSelectedMonths }) => {
  const navigate = useNavigate();
  const { title } = dataOffice || {};

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
        <h2 className="fw-bold mb-0" style={{ fontSize: "1.75rem" }}>
          Recaudación de la {title}
        </h2>

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
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
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
          <button className="btn btn-primary d-flex align-items-center gap-2">
            <DownloadIcon width={16} height={16} />
            Exportar
          </button>
        </div>
      </div>
    </header>
  );
};
