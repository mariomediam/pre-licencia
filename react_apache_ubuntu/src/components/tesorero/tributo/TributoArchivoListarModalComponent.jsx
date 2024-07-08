import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Dropzone, FileMosaic } from "@files-ui/react";

import { ReactComponent as FileUpload } from "../../../assets/images/svg/file-upload.svg";
import { obtenerNombreMes } from "../../../utils/varios";

export const TributoArchivoListarModalComponent = ({
  show,
  handleClose,
  anioSelected,
  tipOpeSelected,
  NTipOpe,
  periodosDisponibles,
}) => {
  const [files, setFiles] = useState([]);
  

  const readFile = (incommingFiles) => {
    //do something with the files
    console.log("incomming files", incommingFiles);
    setFiles(incommingFiles);
    //even your own upload implementation
  };

  const removeFile = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };


  const uploadFile = ()  => {
    console.log("uploading files", files);
  }

  

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            <FileUpload /> Cargar archivos
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <small className="text-muted">Año</small>
          <p>{anioSelected}</p>

          <small className="text-muted">Tipo de operación financiera</small>
          <p>{NTipOpe}</p>

          {periodosDisponibles.length > 0 && tipOpeSelected !== "02" && (
            <>
              <small className="text-muted">Mes</small>
              <select
                className="form-select mb-3"
                aria-label="Meses disponibles"
              >
                {periodosDisponibles.map((periodo) => (
                  <option
                    key={periodo.M_Archivo_Mes}
                    value={periodo.M_Archivo_Mes}
                  >
                    {obtenerNombreMes(periodo.M_Archivo_Mes)}
                  </option>
                ))}
              </select>
            </>
          )}
          <small className="text-muted">Archivo</small>
          <Dropzone
            
            onChange={readFile}
            value={files}
            maxFiles = {1}
            label="Suelta el archivo aquí o haz clic para subirlo."
            
            // accept='application/vnd.ms-excel,'
            accept=".xls, .xlsx"
            // footer={false}
            headerConfig={{ validFilesCount: false, deleteFiles: false}}
            footerConfig={{ customMessage: "Solo se aceptan archivos de excel" }}
            localization="ES-es"
            multiple={false}
            behaviour={"replace"}
          >
            {files.map((file) => (
              <FileMosaic key={file.id} {...file} onDelete={removeFile} info />
            ))}
          </Dropzone>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={uploadFile}>
            Grabar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
