import { useState, useRef } from "react";
import { Breadcrumb, Button, Spinner } from "react-bootstrap";
import Header from "../../components/Header";
import { obtenerNombreMes } from "../../utils/varios";
import { Dropzone, FileMosaic } from "@files-ui/react";
import MergeIcon from "../../icons/MergeIcon";
import { ConciliaTributo } from "../../services/tesoreroService";

// Helper functions
const getAnios = () => {
  const anios = [];
  const anioActual = new Date().getFullYear();
  for (let i = anioActual; i >= 2023; i--) {
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


export const TributoArchivoConciliaView = () => {
  const [files, setFiles] = useState([]);
  const [isDownload, setIsDownload] = useState(false);

  const selectAnio = useRef();
  const selectMes = useRef();
  // const selectTipoReporte = useRef();
 
  
  const readFile = (incommingFiles) => {
    setFiles(incommingFiles);
  };

  const removeFile = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const onClickDownloadTributoReporte = async (e) => {
    e.preventDefault();
    try {
      if (files.length === 0) {
        throw new Error("Debe subir un archivo SATP");
      }
      setIsDownload(true);
      const params = {
        anio: selectAnio.current.value,
        mes: selectMes.current.value,
        archivo: files[0].file,
      };
      // if (codContribuyente?.length > 0) {
      //   params.contrib = codContribuyente;
      //   const data = await downloadTributoReporte(params);
      //   setDataReport(data);
      // } else {
      //   setDataReport([]);
        const tributoArhivo = await ConciliaTributo(params);
        const name_file = "Reporte Conciliación Tributaria";
        const url = URL.createObjectURL(tributoArhivo);
        const link = document.createElement("a");
        link.href = url;
        link.download = name_file;
        link.target = "_blank";
        link.click();
      // }
    } catch (error) {
      throw error;
    } finally {
      setIsDownload(false);
    }
  };

  const anios = getAnios();
  const meses = getMeses();


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
        <MergeIcon className="me-1 thumbnail text-color-default mb-2" />
        <h3 className="text-color-default">Conciliación</h3>
      </div>

     

      <div
        className="bg-white shadow rounded border container"
        style={{ maxWidth: "650px" }}
      >
         <div className="d-flex justify-content-end m-0 p-2 bg-white">
            <small>
              <span style={{ color: "#4169E1" }}>
                <a
                  href={`${process.env.REACT_APP_API}/download-file/tesorero/conciliacion.xlsx`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i
                    className="fas fa-download"
                    title="Descargar"
                    style={{ color: "#4169E1" }}
                  ></i>{" "}
                  Descargar plantilla
                </a>
              </span>{" "}
            </small>
          </div>
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
                <Dropzone
            onChange={readFile}
            value={files}
            maxFiles={1}
            label="Suelta el archivo SATP aquí o haz clic para subirlo."
            accept=".xls, .xlsx"
            headerConfig={{ validFilesCount: false, deleteFiles: false }}
            footerConfig={{
              customMessage: "Solo se aceptan archivos de excel",
            }}
            localization="ES-es"
            multiple={false}
            behaviour={"replace"}
            disabled={isDownload}
          >
            {files.map((file) => (
              <FileMosaic key={file.id} {...file} onDelete={removeFile} info />
            ))}
          </Dropzone>

                </div>
              </div>

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
                        <span className="visually-hidden">Descargando...</span>
                      </Spinner>
                      Descargando...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-download me-2"></i>
                      Descargar conciliación
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
};
