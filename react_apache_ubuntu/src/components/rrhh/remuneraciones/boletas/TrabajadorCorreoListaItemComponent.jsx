import { Button } from "react-bootstrap";
import { transformarFecha } from "../../../../utils/varios";
import { useDispatch } from "react-redux";
import { setActiveTrabajadorCorreo } from "../../../../store/slices";

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
        <Button size="sm" variant="outline-danger">
          <i className="fas fa-trash-alt"></i>
          Eliminar
        </Button>
      </td>
    </tr>
  );
};
