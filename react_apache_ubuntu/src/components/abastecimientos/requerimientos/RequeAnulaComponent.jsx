import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Form, Modal } from "react-bootstrap";
import { Toast } from "../../tools/PopMessage";
import Swal from "sweetalert2";

import { setResetRequerimiento } from "../../../store/slices";
import DocCancelIcon from "../../../icons/DocCancelIcon";
import { anularRequerimiento } from "../../../services/abastecService";

export const RequeAnulaComponent = ({
  C_anipre,
  C_reque,
  C_biesertipo,
  show,
  handleClose,
}) => {  
  const inputMotivo = useRef("");

  const { currentReque } = useSelector((state) => state.requerimiento);
  const { tipo_reque, f_libre } = currentReque;

  const [motivo, setMotivo] = useState("");
  const [isLoadingAnula, setIsLoadingAnula] = useState(false);

  const onChangeMotivo = (e) => {
    setMotivo(e.target.value);
  };

  const onCloseAnulaRequerimiento = () => {
    setResetRequerimiento();
    handleClose();
  };

  const onClicAnular = async (e) => {
    e.preventDefault();

    try {
      setIsLoadingAnula(true);

      await anularRequerimiento(C_anipre, C_reque, C_biesertipo, motivo);

      Toast.fire({
        icon: "success",
        title: `Requerimiento ${C_reque} anulado correctamente`,
        background: "#F4F6F6",
        timer: 1500,
      });
      setTimeout(() => {
        // handleClose();
        window.location.reload();
      }, 1500);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error grabando requerimiento",
        text: JSON.stringify(error?.response?.data?.message),
      });

      
      setIsLoadingAnula(false);

      
    }
  };

  useEffect(() => {
    if (show) {
      inputMotivo.current.focus();
    }
  }, [show]);

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onCloseAnulaRequerimiento}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center">
          <DocCancelIcon className="me-2 my-0 py-0" />
          <p className="m-0 p-0">
            {`Anular requerimiento ${
              f_libre === "0" ? "de" : ""
            } ${tipo_reque?.toLowerCase()} ${C_reque} - ${C_anipre}`}
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group md="6" controlId="id_observ" className="px-4">
          <Form.Label className="text-muted my-0">
            <small className="mb-0">Motivo de anulación</small>
          </Form.Label>
          <Form.Control
            type="textarea"
            as="textarea"
            rows={4}
            name="name_observ"
            onChange={onChangeMotivo}
            value={motivo}
            ref={inputMotivo}
          />

          <Form.Control.Feedback type="invalid">
            Debe ingresar motivo de anulación.
          </Form.Control.Feedback>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center mt-3">
        <div>
          <Button
            variant="danger"            
            className="d-flex align-items-center px-4"
            disabled={motivo.trim().length < 4 || isLoadingAnula}
            onClick={onClicAnular}
          >
            {" "}
            <DocCancelIcon className="me-2 my-0 py-0" />
            <p className="m-0 p-0">
              {isLoadingAnula ? "Anulando ..." : "Anular"}
            </p>
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
