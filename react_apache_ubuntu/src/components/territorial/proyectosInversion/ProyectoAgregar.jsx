import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import WreckingBallIcon from "../../../icons/WreckingBallIcon";
import SearchIcon from "../../../icons/SearchIcon";
import { useRef, useState, useEffect } from "react";
import { obtenerProductoProyectoNombre } from "../../../services/siafService";
import ExclamationCircleIcon from "../../../icons/ExclamationCircleIcon";

export const ProyectoAgregar = ({ show, handleClose, ano_eje }) => {
  const [proyectoNombre, setProyectoNombre] = useState("");

  const [messajeError, setMessajeError] = useState("");

  const inputProyectoCodigo = useRef("");

  const onClickCancelar = () => {
    handleClose();
  };

  const onClickGrabar = () => {
    handleClose();
  };

  const clearVariables = () => {
    setProyectoNombre("");
    setMessajeError("");
  };

  useEffect(() => {
    if (show) {
      clearVariables();
      inputProyectoCodigo.current.focus();
    }
  }, [show]);

  
  const getProyectoNombre = async () => {
    try {
      if (inputProyectoCodigo.current.value.length > 0) {
        const response = await obtenerProductoProyectoNombre({
          ano_eje: ano_eje,
          producto_proyecto: inputProyectoCodigo.current.value,
        });
        setProyectoNombre(response?.producto_proyecto_nombre);
        if (!response) {
          setMessajeError("No se encontró el proyecto");
        }
      }
    } catch (error) {
      setMessajeError("No se encontró el proyecto");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <WreckingBallIcon className="me-2" />
            Agregar proyecto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="">
            <Form.Label className="text-muted mb-0">
              <small> Código del proyecto (CUI) </small>
            </Form.Label>
            <InputGroup className="mb-1">
              <Form.Control
                placeholder="Buscar por código"
                aria-label="Buscar por código"
                aria-describedby="Buscar por código"
                ref={inputProyectoCodigo}
                onChange={clearVariables}
                type="number"
              />
              <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={getProyectoNombre}
              >
                <SearchIcon />
              </Button>
            </InputGroup>
          </Form.Group>

          {messajeError && (
            <Form.Group>
              <Form.Label className="text-danger mb-0">
                <ExclamationCircleIcon /> <small> {messajeError} </small>
              </Form.Label>
            </Form.Group>
          )}

          {proyectoNombre && (
            <Form.Group className="animate__animated animate__fadeIn animate__faster">
              <Form.Label className="text-muted mb-0">
                <small> Descripción del proyecto </small>
              </Form.Label>
              <p>{proyectoNombre}</p>
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClickCancelar}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={onClickGrabar}
            disabled={!proyectoNombre || messajeError}
          >
            Grabar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
