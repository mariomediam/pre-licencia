import { useState, useRef, useEffect } from "react";
import { Breadcrumb, Button, Form, Spinner } from "react-bootstrap";
import Header from "../../components/Header";
import { obtenerNombreMes } from "../../utils/varios";
import ReportIcon from "../../icons/ReportIcon";
import { downloadTributoReporte } from "../../services/tesoreroService";
import { TributoArchivoReporteComponent } from "../../components/tesorero/tributo/TributoArchivoReporteComponent";

// Helper functions
const getAnios = () => {
  const anios = [];
  const anioActual = new Date().getFullYear();
  for (let i = anioActual; i >= 2000; i--) {
    anios.push(i);
  }
  return anios;
};

const getMeses = () => {
  const meses = [];
  for (let i = 1; i <= 12; i++) {
    meses.push(i);
  }
  return meses;
};

const tipoReportes = [
  { opcion: "01", nombre: "Partidas por contribuyente" },
  { opcion: "02", nombre: "Cuentas por cobrar - contribuyentes" },
  { opcion: "03", nombre: "Cuentas por cobrar - partida" },
];

export const TributoArchivoReporteView = () => {
  const selectAnio = useRef();
  const selectMes = useRef();
  // const selectTipoReporte = useRef();
  const inputContribuyente = useRef();
  const [isDownload, setIsDownload] = useState(false);
  const [codContribuyente, setCodContribuyente] = useState("");
  const [tipoReporte, setTipoReporte] = useState("01");
  const [dataReport, setDataReport] = useState([]);

  const onClickDownloadTributoReporte = async (e) => {
    e.preventDefault();
    try {
      setIsDownload(true);
      const params = {
        opcion: tipoReporte,
        M_Archivo_Anio: selectAnio.current.value,
        mes_hasta: selectMes.current.value,
      };
      if (codContribuyente?.length > 0) {
        params.contrib = codContribuyente;
        const data = await downloadTributoReporte(params);
        setDataReport(data);
      } else {
        setDataReport([]);
        const tributoArhivo = await downloadTributoReporte(params);
        const name_file = "Reporte Tributario";
        const url = URL.createObjectURL(tributoArhivo);
        const link = document.createElement("a");
        link.href = url;
        link.download = name_file;
        link.target = "_blank";
        link.click();
      }
    } catch (error) {
      throw error;
    } finally {
      setIsDownload(false);
    }
  };

  const anios = getAnios();
  const meses = getMeses();

  useEffect(() => {
    if (!["01", "02"].includes(tipoReporte)) {
      setCodContribuyente("");
    }
  }, [tipoReporte]);

  useEffect(() => {
    setDataReport([]);
  }, [codContribuyente]);

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
        <h3 className="text-color-default">Reportes</h3>        
      </div>
      
        <div className="bg-white shadow rounded border container" style={{ maxWidth: "650px" }}>
          <div className="row d-flex justify-content-center p-3">
            <div className="col-12 col-sm-10 ">
              <div className="row d-flex justify-content-center mb-3 gap-2">
                <div className="col-12 col-sm-5">
                  {/* ********************** AÑO ********************** */}
                  <div className="rounded">
                    <h6 className="text-color-default">Año</h6>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      defaultValue={anios[0]}
                      ref={selectAnio}
                      disabled={isDownload}
                    >
                      {anios.map((anio) => (
                        <option key={anio} value={anio}>
                          {anio}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-12 col-sm-5">
                  {/* ********************** MES ********************** */}
                  <div className="rounded">
                    <h6 className="text-color-default">Hasta</h6>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      ref={selectMes}
                      disabled={isDownload}
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
              <div className="row d-flex justify-content-center mb-3">
                {/* ********************** TIPO DE REPORTE ********************** */}
                <div className="col-12 col-sm-10">
                  <h6 className="text-color-default">
                    Seleccionar tipo de reporte
                  </h6>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setTipoReporte(e.target.value)}
                    disabled={isDownload}
                  >
                    {tipoReportes.map(({ opcion, nombre }) => (
                      <option key={opcion} value={opcion}>
                        {nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {
                // ********************** CODIGO DE CONTRIBUYENTE **********************
                ["01", "02"].includes(tipoReporte) && (
                  <>
                    <div className="row d-flex justify-content-center mb-3">
                      <div className="col-12 col-sm-10">
                        <h6 className="text-color-default">
                          Código de contribuyente
                        </h6>

                        <Form.Control
                          type="text"
                          aria-describedby="passwordHelpBlock"
                          ref={inputContribuyente}
                          onChange={(e) => setCodContribuyente(e.target.value)}
                          value={codContribuyente}
                        />
                      </div>
                    </div>
                  </>
                )
              }

              <div className="row d-flex justify-content-center">
                {/* ********************** BOTON ********************** */}
                <div className="col-12 col-sm-10 d-flex justify-content-center primary">
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={onClickDownloadTributoReporte}
                    disabled={isDownload}
                  >
                    {isDownload ? (
                      <>
                        <Spinner
                          animation="border"
                          role="status"
                          size="sm"
                          className="me-2"
                        >
                          <span className="visually-hidden">
                            Descargando...
                          </span>
                        </Spinner>
                        Descargando...
                      </>
                    ) : (
                      <>
                        {codContribuyente?.length === 0 ? (
                          <>
                            <i className="fas fa-download me-2"></i>
                            Descargar
                          </>
                        ) : (
                          <>
                            <i className="fas fa-search me-2"></i>
                            Buscar
                          </>
                        )}
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
            </div>
          </div>
          <div className="mb-3">
        <TributoArchivoReporteComponent dataReport={dataReport} />
        </div>
        </div>
    </>
  );
};
