import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { Toast } from "../../tools/PopMessage";
import {
  startAddLicProvUbica,
  getListarLicProvUbica,
  startUpdateLicProvUbica,
} from "../../../store/slices";

export const UbicacionGestionaModalComponent = ({
  handleClose,
  active,
  show,
  setActiveUbicaId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputCodigo = useRef();
  const inputUbicacion = useRef();
  const inputUTMNorte = useRef();
  const inputUTMEste = useRef();

  const onClicBtnGRabar = async (event) => {
    try {
      event.preventDefault();

      const ubicacion = {
        ubicaCodigo: inputCodigo.current.value,
        ubicaDescrip: inputUbicacion.current.value,
        ubicaUTMNorte: inputUTMNorte.current.value,
        ubicaUTMEste: inputUTMEste.current.value,
        licProvTipo: active.licProvTipo,
        ubicaOrden: active.ubicaOrden,
      };

      let editedUbicaId = 0;

      if (active.ubicaId) {
        ubicacion.ubicaId = active.ubicaId;
        const { ubicaId } = await dispatch(startUpdateLicProvUbica(ubicacion));
        editedUbicaId = ubicaId;
      } else {
        const { ubicaId } = await dispatch(startAddLicProvUbica(ubicacion));
        editedUbicaId = ubicaId;
      }

      await dispatch(getListarLicProvUbica(active.licProvTipo));
      handleClose();

      Toast.fire({
        icon: "success",
        title: "Ubicacion grabada correctamente",
        background: "#F4F6F6",
        timer: 1500,
      });
      setTimeout(() => {
        navigate(`/licencia/provisional/ubica-listar/${active.licProvTipo}`);
        setActiveUbicaId(editedUbicaId);
      }, 1500);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error grabando ubicacion",
        text: JSON.stringify(error?.message),
      });
    }
  };

  const onClickCancelar = () => {
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <i className="fas fa-map-marker-alt me-2"></i>{" "}
            {active.ubicaId ? "Modificar" : "Agregar"} Ubicación
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-2">
            <Form.Label className="text-muted mb-0">
              <small> Código </small>
            </Form.Label>
            <Form.Control
              type="text"
              defaultValue={active?.ubicaCodigo}
              ref={inputCodigo}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label className="text-muted mb-0">
              <small > Ubicación propuesta </small>
            </Form.Label>
            <Form.Control
              as="textarea"
              style={{ backgroundColor: "#FFFFFF", color: "black" }}
              rows={3}
              defaultValue={active?.ubicaDescrip}
              ref={inputUbicacion}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label className="text-muted mb-0">
              <small > Coordenadas UTM Norte </small>
            </Form.Label>
            <Form.Control
              type="text"              
              defaultValue={active?.ubicaUTMNorte}
              ref={inputUTMNorte}              
            />
            <Form.Text className="text-muted mt-0 pt-0">
              <small><p className="mt-0 pt-0 lh-1.5 text-wrap">Ingrese la coordenada con hasta 7 decimales. Utilice el formato numérico, por ejemplo, -5.1970701</p></small>
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label className="text-muted mb-0">
              <small> Coordenadas UTM Este </small>
            </Form.Label>
            <Form.Control
              type="text"              
              defaultValue={active?.ubicaUTMEste}
              ref={inputUTMEste}
            />
            <Form.Text className="text-muted">
            <small><p className="mt-0 pt-0 lh-1.5 text-wrap">Ingrese la coordenada con hasta 7 decimales. Utilice el formato numérico, por ejemplo, -80.6266126</p></small>
            </Form.Text>
            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClickCancelar}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={onClicBtnGRabar}>
            Grabar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
