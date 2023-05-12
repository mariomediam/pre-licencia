import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { validarEmail } from "../../../../utils/varios";

export const TrabajadorCorreoListaItemEditComponent = ({
  handleClose,
  active,
  show,
}) => {
  const [correo, setCorreo] = useState(active?.n_traba_correo || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCorreo(active?.n_traba_correo || "");
  }, [active]);

  const onClickGrabarCorreo = () => {
    const newErrors = findFormErrors();
    console.log(newErrors);
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      handleClose();
      console.log("Grabar correo")
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
          <Button variant="secondary" onClick={onClickCancelar}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={onClickGrabarCorreo}>
            Grabar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
