import { useState } from "react";

import EyeIcon from "../../icons/EyeIcon";
import EditIcon from "../../icons/EditIcon";
import TrashIcon from "../../icons/TrashIcon";
import { TransportTrainingViewModal } from "./TransportTrainingViewModal";
export const TrainingPerMonthDetail = ({ capacitaciones }) => {

const [capacitacionSelected, setCapacitacionSelected] = useState({})

const handleViewCapacitacion = (capacitacion) => {
    setCapacitacionSelected(capacitacion)
    handleShowViewTraining()
}


const [showViewTraining, setShowViewTraining] = useState(false)
const handleCloseViewTraining = () => setShowViewTraining(false)
const handleShowViewTraining = () => setShowViewTraining(true)

    const formatDay = (fecha) => {
        if (typeof fecha === 'string' && fecha.includes('-')) {
            const day = fecha.split('-')[2];
            return day.padStart(2, '0');
        }
        const date = new Date(fecha + 'T00:00:00');
        return date.getDate().toString().padStart(2, '0');
    };

    return (
        <div className="bg-white p-3 border rounded mt-3">
            <table className="table table-borderless table-responsive">
                <thead>
                    <tr className="border-bottom">
                        <th className="text-muted fw-normal pb-3">Día</th>
                        <th className="text-muted fw-normal pb-3">Tema / Modalidad</th>
                        <th className="text-muted fw-normal pb-3">Cantidad</th>
                        <th className="text-muted fw-normal pb-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {capacitaciones.map((capacitacion) => (
                        <tr key={capacitacion.C_Capacitacion} className="border-bottom">
                            <td className="py-3 align-middle">{formatDay(capacitacion.D_Capacita_Fecha)}</td>
                            <td className="py-3 align-middle">{capacitacion.N_Capacita_Tema} / {capacitacion.N_Capacita_Modalidad}</td>
                            <td className="py-3 text-end align-middle">{capacitacion.Q_Capacita_Cantidad}</td>
                            <td className="py-3 align-middle">
                                <div className="d-flex gap-2">
                                    <button type="button" className="btn btn-sm btn-outline-primary"  title="Ver capacitación" onClick={() => handleViewCapacitacion(capacitacion)}>
                                        <EyeIcon width={20} height={20} />
                                    </button>
                                    <button type="button" className="btn btn-sm btn-outline-primary"  title="Editar capacitación">
                                        <EditIcon width={20} height={20} />
                                    </button>
                                    <button type="button" className="btn btn-sm btn-outline-danger"  title="Eliminar capacitación">
                                        <TrashIcon width={20} height={20} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TransportTrainingViewModal show={showViewTraining} handleClose={handleCloseViewTraining} capacitacion={capacitacionSelected} />
        </div>
    );
}
