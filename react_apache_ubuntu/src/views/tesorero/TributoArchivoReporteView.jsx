import { useState, useRef, useEffect, useCallback } from "react";
import { Breadcrumb, Button } from "react-bootstrap";
// import Swal from "sweetalert2";

// import { Toast } from "../../components/tools/PopMessage";
import Header from "../../components/Header";
import { obtenerNombreMes } from "../../utils/varios";
import ReportIcon from "../../icons/ReportIcon";

const anios = [];
const anioActual = new Date().getFullYear();
for (let i = anioActual; i >= 2000; i--) {
  anios.push(i);
}

const meses = [];
for (let i = 1; i <= 12; i++) {
  meses.push(i);
}

const tipoReportes = [
  { opcion: "01", nombre: "Reporte de tributos" },
  { opcion: "02", nombre: "Reporte de tributos por mes" },
  { opcion: "03", nombre: "Reporte de tributos por mes y año" },
];

export const TributoArchivoReporteView = () => {
  const [anioSelected, setAnioSelected] = useState(
    anios.length > 0 ? anios[0] : undefined
  );

  return (
    <>
      <Header />
      <div className="ps-3">
        <Breadcrumb>
          <Breadcrumb.Item active>Gestión y operaciones</Breadcrumb.Item>
          <Breadcrumb.Item active>Control y Gestión Tributaria</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <hr />

      <div className="d-flex justify-content-center align-items-center">
      <ReportIcon className="me-1 thumbnail text-color-default mb-1" />
      <h3 className="text-color-default">        
        Reportes
      </h3>
      </div>

      

      

      <div className="container" style={{ maxWidth: "650px" }}>
        <div className="row d-flex justify-content-center p-3">
          <div className="col-12 col-sm-10 border p-3">
            <div className="row d-flex justify-content-center mb-3 gap-2">
              <div className="col-12 col-sm-5">
                <div className="rounded">
                  <div className="">
                    <h6 className="text-color-default">Año</h6>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      defaultValue={anios[0]}
                      // onChange={(e) => setAnioSelected(e.target.value)}
                      // onChange={onChangeSelectAnio}
                    >
                      {anios.map((anio) => (
                        <option key={anio} value={anio}>
                          {anio}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-5">
                <div className="rounded">
                  <div className="">
                    <h6 className="text-color-default">Hasta</h6>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      defaultValue={anios[0]}
                    >
                      {meses.map((mes) => (
                        <option key={mes} value={mes}>
                          {obtenerNombreMes(mes)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center mb-3">
              <div className="col-12 col-sm-10">
                <h6 className="text-color-default">
                  Seleccionar tipo de reporte
                </h6>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  defaultValue={anios[0]}
                >
                  {tipoReportes.map(({ opcion, nombre }) => (
                    <option key={opcion} value={opcion}>
                      {nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
                  
            <div className="row d-flex justify-content-center">
              <div className="col-12 col-sm-10 d-flex justify-content-center primary">
                <Button variant="primary" className="w-100">
                  Exportar a excel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
