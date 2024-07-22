import { useState, useCallback, useEffect } from "react";
import { Form, Modal, Button, Spinner } from "react-bootstrap";
// import { Dropzone, FileMosaic } from "@files-ui/react";
// import Swal from "sweetalert2";

import { ReactComponent as FileUpload } from "../../../assets/images/svg/file-upload.svg";
import { obtenerTributoTipoOperacion } from "../../../services/tesoreroService";
import { obtenerNombreMes } from "../../../utils/varios";
// import { obtenerNombreMes } from "../../../utils/varios";
// import { UploadTributoArchivo } from "../../../services/tesoreroService";
// import { Toast } from "../../tools/PopMessage";

const mes = [];

for (let i = 1; i < 13; i++) {
  mes.push(i);
}

export const TributoContribSaldoInicialModalComponent = ({
  show,
  handleClose,
  listTributoContribSelected,
  anioSelected,
}) => {
  const [isSaving, setIsSaving] = useState(false);

  const [listTipoTributo, setListTipoTributo] = useState([]);

  const [tributo] = listTributoContribSelected;

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerTributoTipoOperacion();
        setListTipoTributo(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (!show) return <></>;

  const accion = listTributoContribSelected.length > 0 ? "Editar" : "Agregar";

  //   const uploadFile = async () => {
  //     try {
  //       setIsSaving(true);
  //       if (files.length > 0) {
  //         const archivo = files[0].file;
  //         const tipo = tipOpeSelected;
  //         const anio = anioSelected;
  //         const mes = selectMes?.current?.value;

  //         await UploadTributoArchivo({ tipo, anio, mes, archivo });

  //         Toast.fire({
  //           icon: "success",
  //           title: `Archivo subido correctamente`,
  //           background: "#F4F6F6",
  //           timer: 1500,
  //         });
  //         fetchTributoArchivo();
  //         handleClose();
  //         fetchTributoPeriodosDisponibles();
  //       }
  //     } catch (error) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error subiendo archivo",
  //         text: JSON.stringify(error?.response?.data?.message),
  //       });
  //     } finally {
  //       setIsSaving(false);
  //     }
  //   };

  //   useEffect(() => {
  //     setFiles([]);
  //   }, [show]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            <FileUpload /> {accion} operación financiera
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* ************** AÑO ************** */}
          <small className="text-muted">Año</small>
          <p className="mb-2">{anioSelected}</p>

          {/* ************** TIPO DE TRIBUTO ************** */}
          <small className="text-muted">Tipo de tributo</small>
          <Form.Select aria-label="Default select example" className="mb-2">
            {listTipoTributo.map((item) => (
              <option key={item.id} value={item.C_TipOpe}>
                {item.N_TipOpe}
              </option>
            ))}
          </Form.Select>

          {/* ************** MES ************** */}
          <small className="text-muted">Mes</small>
          <Form.Select aria-label="Default select example" className="mb-2">
            {mes.map((item) => (
              <option key={item} value={item}>
                {obtenerNombreMes(item)}
              </option>
            ))}
          </Form.Select>

          {/* ************** CONTRIBUYENTE ************** */}
          <small className="text-muted">Contribuyente</small>
          <div className="col-4 mb-1">
            <Form.Control type="text" placeholder="Código" />
          </div>
          <Form.Control type="text" placeholder="Nombre" className="mb-2"/>

          {/* ************** PARTIDA ************** */}
          <small className="text-muted">Partida</small>
          <div className="col-4 mb-1">
            <Form.Control type="text" placeholder="Código" />
          </div>
          <Form.Control type="text" placeholder="Descripción" className="mb-2"/>

          {/* ************** CUENTA CONTABLE ************** */}
          <small className="text-muted">Cuenta contable</small>
          <div className="col-4 mb-1">
            <Form.Control type="text" placeholder="Código" />
          </div>

          { 

          }

          {/* ************** AÑO ************** */}
          <small className="text-muted">Año</small>
          <div className="col-4 mb-1">
            <Form.Control type="text" placeholder="Año" />
          </div>
          
        
        
        
        
        
        
        
        
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={isSaving}>
            Cancelar
          </Button>
          <Button variant="primary" disabled={isSaving}>
            {isSaving ? (
              <>
                <Spinner
                  animation="border"
                  role="status"
                  size="sm"
                  className="me-2"
                />
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
