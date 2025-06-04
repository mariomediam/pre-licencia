import { useEffect } from "react";
import { Form, InputGroup, Button, Spinner, Table } from "react-bootstrap";
import FileTypeXLSIcon from "../../../icons/FileTypeXLSIcon";
import { descargarResumenProyectos, obtenerResumenProyectos } from "../../../services/siafService";
import { useState } from "react";
import { ResumenProyectoItem } from "./ResumenProyectoItem";

export const ResumenProyecto = ({ anio, sec_ejec }) => {
  const [proyectos, setProyectos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProyectos, setFilteredProyectos] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleExport = async () => {
    try {
      setIsDownloading(true);
      const file = await descargarResumenProyectos({ ano_eje: anio, sec_ejec });
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resumen_proyectos_${anio}.xlsx`;
      a.click();    
    } catch (error) {
      console.log(error);
    } finally {
      setIsDownloading(false);
    }
  }

  useEffect(() => {
    const filterProyectos = (data) => {
        console.log(data)   
      if (searchTerm) {
        if (!isNaN(searchTerm)) {
          return data.filter((proyecto) =>
            proyecto.producto_proyecto.toString().includes(searchTerm)
          );
        } else {
          return data.filter((proyecto) =>
            proyecto.producto_proyecto_nombre
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
        }
      }
      return data;
    };
    const filteredData = filterProyectos(proyectos);
    setFilteredProyectos(filteredData);
  }, [searchTerm, proyectos]);

  useEffect(() => {
    const obtenerResumen = async () => {
      try {
        setIsLoading(true);
        const resumen = await obtenerResumenProyectos({ anio, sec_ejec });
        setProyectos(resumen);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    obtenerResumen();
  }, [anio, sec_ejec]);

  return (
    <div className="mt-5 p-3 border bg-white w-100">
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <h4 className="ms-1" style={{ fontSize: 21, fontWeight: "bold" }}>
          Detalle de proyectos {anio}
        </h4>
        <div className="col-12 col-lg-5 p-0 m-0">
          <InputGroup className="">
            <Form.Control
              placeholder="Buscar por código o descripción..."
              aria-label="Buscar por código o descripción..."
              aria-describedby="Buscar por código o descripción..."
                value={searchTerm}   
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-dark" id="button-addon2" onClick={handleExport}>
              {isDownloading ? (
                <><Spinner animation="border" variant="primary" size="sm"/> Descargando...</>
              ) : (
                <><FileTypeXLSIcon /> Exportar</>
              )}
            </Button>
          </InputGroup>
        </div>
      </div>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="mt-3">
            <Table hover responsive className="caption-top mb-1 animate__animated animate__fadeIn animate__faster">
                <thead>
                  <tr className="color-header1 text-white">
                    <th className="text-center align-middle m-0 p-0">
                      CUI
                    </th>
                    <th className="text-center align-middle m-0 p-0">Descripción</th>
                    <th className="text-center align-middle m-0 p-0">
                      PIM
                    </th>
                    <th className="text-center align-middle m-0 p-0">Ejecución</th>
                    <th className="text-center align-middle m-0 p-0">Avance</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProyectos.map((proyecto) => (
                    <ResumenProyectoItem key={proyecto.producto_proyecto} {...proyecto} />
                  ))}
                </tbody>
              </Table>
          
        </div>
      )}
    </div>
  );
};
