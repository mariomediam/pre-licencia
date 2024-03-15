import { Modal } from "react-bootstrap";

export const RequeComprometeItemFuenteComponent = ({
    show,
    handleClose,
    clasificador,
    C_biesertipo,
    C_anipre,
  }) => {

    const onCloseModal = () => {      
        handleClose();
      }

  return (
    <div>
      <Modal
        size="lg"
        show={show}
        onHide={onCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Fuente de financiamiento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-3">Selección</div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
