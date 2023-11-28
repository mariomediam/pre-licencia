import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

import { Toast } from "../../tools/PopMessage";
import {
  setCurrentLicProvUbica,
  startDeleteLicProvUbica,
} from "../../../store/slices";

export const UbicacionListaItemComponent = ({
  ubicacion,
  handleShow,
  activeUbicaId,
  activeTrUbica,
}) => {
  const dispatch = useDispatch();

  const {
    ubicaId,
    ubicaOrden,
    ubicaCodigo,
    ubicaDescrip,
    ubicaUTMNorte,
    ubicaUTMEste,
  } = { ...ubicacion };

  const onClickEditar = () => {
    dispatch(setCurrentLicProvUbica({ ...ubicacion }));
    handleShow();
  };

  const onClickEliminar = async (event) => {
    event.preventDefault();

    let messageWarning = `¿Seguro de eliminar la ubicación ${ubicaCodigo}?`;

    const result = await Swal.fire({
      title: messageWarning,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await dispatch(startDeleteLicProvUbica(ubicaId));

        // const resultOk = await Swal.fire({
        //   icon: "success",
        //   title: "Licencia provisional",
        //   text: "Ubicación eliminada correctamente",
        // });

        // if (resultOk.isConfirmed) {
        //   window.location.reload();
        // }
        Toast.fire({
          icon: "success",
          title: "Ubicacion eliminada correctamente",
          background: "#F4F6F6",
          timer: 1500,
        });
        window.location.reload();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error eliminando ubicación",
          text: error.message,
        });
      }
    }
  };

  return (
    <tr
      id={`ubicaId_${ubicaId}`}
      ref={ubicaId === activeUbicaId ? activeTrUbica : undefined}
    >
      <td className="text-center">{ubicaOrden}</td>
      <td className="text-center">{ubicaCodigo}</td>
      <td className="">
        {ubicaDescrip}
        <p className="mb-0 pb-0">
          <small className="text-muted">Coordenadas UTM Norte: </small>
          {ubicaUTMNorte} <small className="text-muted">Este:</small>{" "}
          {ubicaUTMEste}
        </p>
      </td>
      <td className="text-center align-middle m-1 p-1">
        <Button variant="outline-primary" onClick={onClickEditar}>
          <i className="fas fa-edit"></i> Editar
        </Button>
      </td>
      <td className="text-center align-middle m-1 p-1">
        {" "}
        <Button variant="outline-danger" onClick={onClickEliminar}>
          <i className="fas fa-trash-alt"></i> Eliminar
        </Button>
      </td>
    </tr>
  );
};
