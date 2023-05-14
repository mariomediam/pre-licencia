import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

import { validarEmail } from "../../../../utils/varios";
import { startUpdateTrabajadorCorreo } from "../../../../store/slices";

export const TrabajadorCorreoListaItemEditComponent = ({
  handleClose,
  active,
  show,
}) => {
  const [correo, setCorreo] = useState(active?.n_traba_correo || "");
  const [errors, setErrors] = useState({});

  const { isSaving } = useSelector((state) => state.trabajadorCorreo);

  const dispatch = useDispatch();

  useEffect(() => {
    setCorreo(active?.n_traba_correo || "");
  }, [active]);

  const onClickGrabarCorreo = async () => {
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        await dispatch(
          startUpdateTrabajadorCorreo(active.c_traba_dni, correo)
        );        
        handleClose();
        // Refresacar pagina actual
        window.location.reload();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error actualizando correo",
          text: error.message,
        });
      }
    }
  };

  const onClickCancelar = () => {
    handleClose();
    setErrors({});
  };

  const findFormErrors = () => {
    const newErrors = {};

    if (!correo || correo === "" || validarEmail(correo) === false) {
      newErrors.correo = "Correo inválido";
    }

    return newErrors;
  };

  const onChangeCorreo = (e) => {
    setCorreo(e.target.value);
    setErrors({});
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar correo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>
              <small className="text-muted mt-5"> DNI </small>
            </Form.Label>
            <Form.Control type="text" disabled value={active?.c_traba_dni} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <small className="text-muted mt-5"> Nombre </small>
            </Form.Label>
            <Form.Control type="text" disabled value={active?.n_nombre} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <small className="text-muted mt-5"> Estado </small>
            </Form.Label>
            <Form.Control
              type="text"
              disabled
              value={active?.n_estado_nombre}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              <small className="text-muted mt-5"> Correo </small>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="nombre@correo.com"
              value={correo}
              onChange={onChangeCorreo}
              isInvalid={!!errors.correo}
            />
            <Form.Control.Feedback type="invalid">
              {errors.correo}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClickCancelar} disabled={isSaving}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={onClickGrabarCorreo} disabled={isSaving}>
            Grabar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
