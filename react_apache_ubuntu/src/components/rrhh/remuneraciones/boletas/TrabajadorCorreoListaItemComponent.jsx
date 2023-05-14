import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";

import { transformarFecha } from "../../../../utils/varios";
import {
  setActiveTrabajadorCorreo,
  startDeleteTrabajadorCorreo,
} from "../../../../store/slices";

export const TrabajadorCorreoListaItemComponent = ({
  c_traba_dni,
  n_nombre,
  n_estado_nombre,
  n_traba_correo,
  n_user_insert,
  d_datetime_insert,
  handleShow,
}) => {
  const dispatch = useDispatch();

  const onClickEditar = () => {
    dispatch(
      setActiveTrabajadorCorreo({
        c_traba_dni,
        n_nombre,
        n_estado_nombre,
        n_traba_correo,
      })
    );
    handleShow();
  };

  const onClickEliminar = async () => {
    const result = await Swal.fire({
      title: `¿Seguro de eliminar el email ${n_traba_correo.trim()}?`,
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
        await dispatch(startDeleteTrabajadorCorreo(c_traba_dni));
        window.location.reload();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error eliminando correo",
        text: error.message,
      });
    }
  };

  return (
    <tr>
      <td>
        {`${c_traba_dni} - ${n_nombre}`}
        <br />
        <small className="text-muted">{n_estado_nombre}</small>
      </td>
      <td>{n_traba_correo}</td>
      <td>
        {n_user_insert}
        <br />
        <small className="text-muted">
          {d_datetime_insert && transformarFecha(d_datetime_insert)}
        </small>
      </td>
      <td>
        <Button size="sm" variant="outline-primary" onClick={onClickEditar}>
          <i className="fas fa-edit"></i>
          Editar
        </Button>
      </td>
      <td>
        <Button
          size="sm"
          variant="outline-danger"
          onClick={onClickEliminar}
          disabled={!n_traba_correo}
        >
          <i className="fas fa-trash-alt"></i>
          Eliminar
        </Button>
      </td>
    </tr>
  );
};
