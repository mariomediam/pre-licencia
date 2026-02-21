import { useState, useEffect, useCallback } from "react";
import { Modal, Button, Spinner, } from "react-bootstrap";
import Swal from "sweetalert2";

import { Toast } from "../tools/PopMessage";
import EditIcon from "../../icons/EditIcon";
import { actualizarCapacitacionObservacion, insertarCapacitacionObservacion } from "../../services/transporteService";


export const TransportTrainingObservModal = ({ show, handleClose, anio, mes, observacionText = "", observacionId }) => {


    const [observacion, setObservacion] = useState(observacionText)
    const [isLoading, setIsLoading] = useState(false)


    const handleChangeObservacion = (e) => {
        setObservacion(e.target.value);
    }


    useEffect(() => {
        if (show) {
            setObservacion(observacionText);
        } else {
            setObservacion("");
        }
    }, [show, observacionText]);


    const hadleSubmit = async (e) => {

        e.preventDefault();
        try {
            setIsLoading(true);

            if (observacionId) {
                await actualizarCapacitacionObservacion({ id: observacionId, observacion });
            } else {
                await insertarCapacitacionObservacion({anio, mes, observacion});
            }

            // refrescar la pagina
            window.location.reload();
            handleClose();
            Toast.fire({
                icon: "success",
                title: "La observación se actualizó con éxito",
                background: "#F4F6F6",
                timer: 1500,
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error al actualizar la observación",
                text: error.response.data.message,
            });
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="d-flex align-items-center">
                        <EditIcon className="me-2" />
                        Editar observación
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>


                        <div className="mb-2">
                            <small for="textareaobservacion" className="form-label text-muted">Observación</small>
                            <textarea className="form-control" aria-label="Empresa" name="observacion" onChange={handleChangeObservacion} value={observacion} />
                        </div>



                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                    disabled={isLoading}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                    onClick={hadleSubmit}
                    disabled={isLoading}
                    >
                        {isLoading ? <Spinner animation="border" size="sm" /> : "Grabar"}
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}
