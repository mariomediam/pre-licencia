import { Modal, } from "react-bootstrap";

import EyeIcon from "../../icons/EyeIcon";
import { transformarFecha } from "../../utils/varios";


export const TransportTrainingViewModal = ({ show,
    handleClose, capacitacion = {} }) => {
    
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="d-flex align-items-center">
                        <EyeIcon className="me-2" />
                        Ver capacitación
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-2">
                            <small for="inputFecha" className="form-label text-muted">Fecha</small>
                            <p>
                                
                                {transformarFecha(capacitacion.D_Capacita_Fecha).substring(0, 10)}
                                </p>
                        </div>
                        <div className="mb-2">
                            <small for="selectTema" className="form-label text-muted">Tema</small>
                            <p>
                           {capacitacion.N_Capacita_Tema}
                            </p>
                        </div>

                        <div className="mb-2">
                            <small for="selectModalidad" className="form-label text-muted">Modalidad</small>
                            <p>
                                {capacitacion.N_Capacita_Modalidad}
                            </p>
                        </div>

                        <div className="mb-2">
                            <small for="selectCapacitador" className="form-label text-muted">Capacitador</small>
                            <p>
                                {capacitacion.N_Capacita_Capacitador}
                            </p>
                        </div>

                        <div className="mb-2">
                            <small for="textareaempresas" className="form-label text-muted">Empresa</small>
                            <p>
                                {capacitacion.N_Capacita_Empresas}
                            </p>
                        </div>

                        <div className="mb-2">
                            <small for="inputLugar" className="form-label text-muted">Lugar</small>
                            <p>
                                {capacitacion.N_Capacita_Lugar}
                            </p>
                        </div>

                        <div className="mb-2">
                            <small for="inputCantidad" className="form-label text-muted">Cantidad</small>
                            <p>
                                {capacitacion.Q_Capacita_Cantidad}
                            </p>
                        </div>

                        <div className="mb-2">
                            <small for="inputObservacion" className="form-label text-muted">Observación</small>
                            <p>
                                {capacitacion.T_Capacita_Observ}
                            </p>
                        </div>

                    </form>
                </Modal.Body>
                {/* <Modal.Footer>
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
                </Modal.Footer> */}
            </Modal>
        </>
    )
}

