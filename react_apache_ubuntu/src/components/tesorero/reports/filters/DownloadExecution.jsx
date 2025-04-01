import { useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { downloadDetailedExecution } from "../../../../services/tesoreroService";

export const DownloadExecution = ({ source }) => {
  const SEARCH_SOURCES = {
    Detallado: "1",
    "Agrupado por secuencia": "2",
  };

  const [isDownload, setIsDownload] = useState(false);

  const { filterSearch } = useSelector((state) => state.filterSearch);

  const getFiltersWithValues = () => {
    let filtersWithValues = {};
    let filters = Object.keys(filterSearch);
    for (let key of filters) {
      if (filterSearch[key] !== "") {
        filtersWithValues[key] = filterSearch[key];
      }
    }

    const [desde = "", hasta = ""] = filterSearch.periodo;
    filtersWithValues.desde = desde;
    filtersWithValues.hasta = hasta;
    delete filtersWithValues.periodo;

    ["sigaprov", "documento", "siafprov"].forEach((key) => {
      if (filtersWithValues[key]) {
        filtersWithValues[key] = filtersWithValues[key].value;
      }
    });

    return filtersWithValues;
  };

  const onClickDownload = async (tipoReporte) => {
    try {
      setIsDownload(true);
      let filtersWithValues = getFiltersWithValues();
      filtersWithValues.source = source;
      filtersWithValues.tipo_reporte = tipoReporte;
      const fileDetailedExecution = await downloadDetailedExecution(
        filtersWithValues
      );
      const nameFile = `EjecucionDetallada-${source}.xlsx`;
      const url = URL.createObjectURL(fileDetailedExecution);
      const link = document.createElement("a");
      link.href = url;
      link.download = nameFile;
      link.target = "_blank";
      link.click();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: JSON.stringify(
          error.response?.data?.message || "Error al obtener la data"
        ),
      });
    } finally {
      setIsDownload(false);
    }
  };

  return (
    <>
      {isDownload ? (
        <Spinner animation="border" role="status" size="sm" variant="primary">
          <span className="visually-hidden">Descargando...</span>
        </Spinner>
      ) : (
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-sm btn-outline-primary dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-download me-1"></i>{" "}
            <span className="me-1">Descargar</span>
          </button>
          <ul className="dropdown-menu">
            {Object.keys(SEARCH_SOURCES).map((key) => (
              <li key={key}>
                <button
                  className="dropdown-item"
                  onClick={() => onClickDownload(SEARCH_SOURCES[key])}
                >
                  {key}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
