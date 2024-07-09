import { useState, useRef, useEffect } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { Dropzone, FileMosaic } from "@files-ui/react";

import { ReactComponent as FileUpload } from "../../../assets/images/svg/file-upload.svg";
import { obtenerNombreMes } from "../../../utils/varios";
import { UploadTributoArchivo } from "../../../services/tesoreroService";

export const TributoArchivoListarModalComponent = ({
  show,
  handleClose,
  anioSelected,
  tipOpeSelected,
  NTipOpe,
  periodosDisponibles,
  onClicTipoOperacion,  
}) => {
  const [files, setFiles] = useState([]);
  const [isSaving, setIsSaving] = useState(false)
  const selectMes = useRef();

  const readFile = (incommingFiles) => {
    setFiles(incommingFiles);    
  };

  const removeFile = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const uploadFile = async () => {
    try {
        setIsSaving(true)
      if (files.length > 0) {
        const archivo = files[0].file;        
        const tipo = tipOpeSelected;
        const anio = anioSelected;
        const mes = selectMes?.current?.value;

        await UploadTributoArchivo({ tipo, anio, mes, archivo });                
        onClicTipoOperacion(tipOpeSelected);
        handleClose();
      }
    } catch (error) {
      console.error(error);
    } finally {
        setIsSaving(false)
        
    }
  };

  useEffect(() => {
    setFiles([]);
  }, [show]);

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
                ref={selectMes}
                disabled={isSaving}
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
            maxFiles={1}
            label="Suelta el archivo aquí o haz clic para subirlo."            
            accept=".xls, .xlsx"
            headerConfig={{ validFilesCount: false, deleteFiles: false }}
            footerConfig={{
              customMessage: "Solo se aceptan archivos de excel",
            }}
            localization="ES-es"
            multiple={false}
            behaviour={"replace"}
            disabled={isSaving}
          >
            {files.map((file) => (
              <FileMosaic key={file.id} {...file} onDelete={removeFile} info />
            ))}
          </Dropzone>          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={isSaving}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={uploadFile} disabled={isSaving}>
            {isSaving ? (
              <>
                <Spinner animation="border" role="status" size="sm" className="me-2"/>
                Cargando
              </>
            ) : (
              "Guardar"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
