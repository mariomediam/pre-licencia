import { Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

// import { ReactComponent as DotsVertical } from "../../../assets/images/svg/dots-vertical.svg";
import { obtenerNombreMes, transformarFecha } from "../../../utils/varios";

import { downloadTributoArchivo, eliminarTributoArchivo } from "../../../services/tesoreroService";
import { useState } from "react";

export const TributoArchivoListarItemComponent = ({
  C_Archivo,
  C_TipOpe,
  M_Archivo_Anio,
  M_Archivo_Mes,
  D_Archivo_FecDig,
  C_Usuari_Login,
  N_Archivo_PC,
  fetchTributoPeriodosDisponibles,
  fetchTributoArchivo,
  NTipOpe
}) => {

  const [isDownload, setIsDownload] = useState(false)
  const nombreMes = obtenerNombreMes(M_Archivo_Mes);

  const onClickEliminar = async () => {
    const result = await Swal.fire({
      title: `¿Seguro de eliminar el archivo?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
      reverseButtons: true,
    });

    try {
      if (result.isConfirmed) {
        await eliminarTributoArchivo(C_Archivo);
        fetchTributoArchivo();
        fetchTributoPeriodosDisponibles();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error eliminando archivo",
        text: error.message,
      });
    }
  };


  const onClickDownloadTributoArchivo = async (e) => {
    e.preventDefault();

    try {
      setIsDownload(true);

      const tributoArhivo = await downloadTributoArchivo(C_Archivo);
      let name_file = NTipOpe

      if (C_TipOpe !== "01"){
        name_file = `${name_file}_${M_Archivo_Anio} `
      }

      if (!["01", "02"].includes(C_TipOpe)){
        name_file = `${name_file}_${nombreMes} `
      }      
      const url = URL.createObjectURL(tributoArhivo);
      const link = document.createElement("a");
      link.href = url;
      link.download = name_file
      link.target = "_blank";
      link.click();
    } catch (error) {
      throw error;
    } finally {
      setIsDownload(false);
    }
  };

  return (
    <>
      {!["01", "02"].includes(C_TipOpe) && (
        <td className="align-middle">{nombreMes}</td>
      )}

      <td className="align-middle">{transformarFecha(D_Archivo_FecDig)}</td>
      <td className="align-middle">{C_Usuari_Login}</td>
      <td className="align-middle">
        <Button
          size="sm"
          variant="outline-primary"
          title="Descargar archivo"
          onClick={onClickDownloadTributoArchivo}    
          className="me-2"      
        >
          {isDownload ? (
            <Spinner animation="border" role="status" size="sm" variant="primary">
              <span className="visually-hidden">Descargando...</span>
            </Spinner>
          ) : (
            <i className="fas fa-download"></i>
          )}
          {/* <i className="fas fa-trash-alt"></i> */}
        </Button>
        <Button
          size="sm"
          variant="outline-danger"
          title="Eliminar archivo"
          onClick={onClickEliminar}
        >
          <i className="fas fa-trash-alt"></i>
        </Button>
      </td>
      
    </>
  );
};
