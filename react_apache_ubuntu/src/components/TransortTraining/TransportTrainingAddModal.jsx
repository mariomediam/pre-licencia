import Swal from "sweetalert2";
import { useEffect, useState, useCallback } from "react";
import { Modal, Button, Spinner, } from "react-bootstrap";
import { Toast } from "../tools/PopMessage";


import PlusIcon from "../../icons/PlusIcon";
import { insertarCapacitacion } from "../../services/transporteService";
import { getTodayDate } from "../../utils/varios";



const initialCapacitacion = {
    fecha: getTodayDate(),
    tema: "",
    modalidad: "",
    capacitador: "",
    empresas: "",
    lugar: "",
    cantidad: "",
    observacion: "",
}


export const TransportTrainingAddModal = ({ show,
    handleClose, temas = [], modalidades = [], capacitadores = [] }) => {


    const [capacitacion, setCapacitacion] = useState(initialCapacitacion)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        setCapacitacion({ ...capacitacion, [e.target.name]: e.target.value });
    }

    const updateInitialCapacitacion = useCallback(() => {
        if (temas.length > 0) {
            setCapacitacion(prev => ({
                ...prev,
                tema: temas[0]?.C_Capacita_Tema || ""
            }));
        }
        if (modalidades.length > 0) {
            setCapacitacion(prev => ({
                ...prev,
                modalidad: modalidades[0]?.C_Capacita_Modalidad || ""
            }));
        }
        if (capacitadores.length > 0) {
            setCapacitacion(prev => ({
                ...prev,
                capacitador: capacitadores[0]?.C_Capacita_Capacitador || ""
            }));
        }
    }, [temas, modalidades, capacitadores]);

    useEffect(() => {
        if (show) {
            updateInitialCapacitacion();
        } else {
            setCapacitacion(initialCapacitacion);
        }
    }, [show, updateInitialCapacitacion]);


    const hadleSubmit = async (e) => {

        e.preventDefault();
        try {
            setIsLoading(true);
            await insertarCapacitacion(capacitacion);

            // refrescar la pagina
            window.location.reload();
            handleClose();
            Toast.fire({
                icon: "success",
                title: "La capacitación se grabó con éxito",
                background: "#F4F6F6",
                timer: 1500,
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error al grabar la capacitación",
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
                        <PlusIcon className="me-2" />
                        Agregar capacitación
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-2">
                            <small for="inputFecha" className="form-label text-muted">Fecha</small>
                            <input type="date" className="form-control" id="inputFecha" aria-describedby="inputFechaHelp" name="fecha" onChange={handleChange} value={capacitacion.fecha} />
                        </div>
                        <div className="mb-2">
                            <small for="selectTema" className="form-label text-muted">Tema</small>
                            <select className="form-select" aria-label="Tema" name="tema" onChange={handleChange} value={capacitacion.tema}>
                                {temas.map((tema) => (
                                    <option key={tema.C_Capacita_Tema} value={tema.C_Capacita_Tema}>{tema.N_Capacita_Tema}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-2">
                            <small for="selectModalidad" className="form-label text-muted">Modalidad</small>
                            <select className="form-select" aria-label="Modalidad" name="modalidad" onChange={handleChange} value={capacitacion.modalidad}>
                                {modalidades.map((modalidad) => (
                                    <option key={modalidad.C_Capacita_Modalidad} value={modalidad.C_Capacita_Modalidad}>{modalidad.N_Capacita_Modalidad}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-2">
                            <small for="selectCapacitador" className="form-label text-muted">Capacitador</small>
                            <select className="form-select" aria-label="Capacitador" name="capacitador" onChange={handleChange} value={capacitacion.capacitador}>
                                {capacitadores.map((capacitador) => (
                                    <option key={capacitador.C_Capacita_Capacitador} value={capacitador.C_Capacita_Capacitador}>{capacitador.N_Capacita_Capacitador}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-2">
                            <small for="textareaempresas" className="form-label text-muted">Empresa</small>
                            <textarea className="form-control" aria-label="Empresa" name="empresas" onChange={handleChange} value={capacitacion.empresas} />
                        </div>

                        <div className="mb-2">
                            <small for="inputLugar" className="form-label text-muted">Lugar</small>
                            <input type="text" className="form-control" aria-label="Lugar" name="lugar" onChange={handleChange} value={capacitacion.lugar} />
                        </div>

                        <div className="mb-2">
                            <small for="inputCantidad" className="form-label text-muted">Cantidad</small>
                            <input type="number" className="form-control" aria-label="Cantidad" name="cantidad" onChange={handleChange} value={capacitacion.cantidad} />
                        </div>

                        <div className="mb-2">
                            <small for="inputObservacion" className="form-label text-muted">Observación</small>
                            <textarea className="form-control" aria-label="Observación" name="observacion" onChange={handleChange} value={capacitacion.observacion} />
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
