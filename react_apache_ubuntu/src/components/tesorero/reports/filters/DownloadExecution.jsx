import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { downloadDetailedExecution } from "../../../../services/tesoreroService";

export const DownloadExecution = ({source}) => {
    const [isDownload, setIsDownload] = useState(false)

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

      const onClickDownload = async () => {
        
        try {
          setIsDownload(true);
          let filtersWithValues = getFiltersWithValues();
          filtersWithValues.source = source;
          const fileDetailedExecution = await downloadDetailedExecution(filtersWithValues);
          const nameFile = `EjecucionDetallada-${source}.xlsx`;
          const url = URL.createObjectURL(fileDetailedExecution);
          const link = document.createElement("a");
          link.href = url;
          link.download = nameFile
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
    <Button
          size="sm"
          variant="outline-primary"
          title="Descargar reporte"
          onClick={onClickDownload}    
          className="me-2"      
        >
          {isDownload ? (
            <Spinner animation="border" role="status" size="sm" variant="primary">
              <span className="visually-hidden">Descargando...</span>
            </Spinner>
          ) : (
            <>
            <i className="fas fa-download"></i> <small>Descargar</small>
            </>
          )}          
        </Button>
  )
}
