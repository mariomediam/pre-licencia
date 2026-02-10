import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Modal, Button, Spinner } from "react-bootstrap";
import TrendingUpIcon from "../../../icons/TrendingUpIcon";
import { SelectProyeccionPorAnioYTasa, InsertarProyecciones } from "../../../services/indicatorsService";
import { obtenerNombreMes, formatMoney } from "../../../utils/varios";



export const RateProjectionsModal = ({
    show,
    handleClose,
    rateSelected,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [years, setYears] = useState([]);
    const [yearSelected, setYearSelected] = useState(0);
    const [projections, setProjections] = useState([]);


    useEffect(() => {

        if (show) {
            setYearSelected(new Date().getFullYear());
        } else {
            setYearSelected(0);
            setProjections([]);
        }

    }, [show]);


    const getYears = () => {
        const years = [];
        for (let i = 2024; i <= new Date().getFullYear(); i++) {
            years.push(i);
        }
        return years;
    }

    useEffect(() => {
        setYears(getYears());
    }, []);

    useEffect(() => {
        const getProjections = async () => {
            const data = await SelectProyeccionPorAnioYTasa({ opcion: "01", anio: yearSelected, tasa: rateSelected.C_Tasa });

            let dataAllMonths = [];

            for (let i = 1; i <= 12; i++) {
                dataAllMonths.push({
                    M_Mes: i,
                    Q_Proyecc_Monto: data.find((item) => item.M_Mes === i)?.Q_Proyecc_Monto || 0
                })
            }
            setProjections(dataAllMonths);
        }
        getProjections();
    }, [yearSelected, rateSelected.C_Tasa]);

    const saveProjections = async () => {
        try {
            setIsLoading(true);
            await InsertarProyecciones({ c_tasa: rateSelected.C_Tasa, anio: yearSelected, proyecciones: projections });
            handleClose();
        } catch (error) {
            setIsLoading(false);
            Swal.fire({
                icon: "error",
                title: "Error al guardar proyecciones",
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
                        <TrendingUpIcon className="me-2" />
                        Proyección de recaudación
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <h5 className="mb-0">{rateSelected.N_Tasa_Descrip} <small className="text-muted mt-0 pt-0">(Cod tasa: {rateSelected.C_Tasa_SATP})</small></h5>


                    <div className="mt-4 d-flex justify-content-between align-items-center gap-2">
                        <small className="text-muted mb-2">Año</small>
                        <select className="form-select" value={yearSelected} onChange={(e) => setYearSelected(e.target.value)}>
                            {years.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    {
                        projections.length > 0 && (
                            <div className="mt-2">
                                <table className="table responsive">
                                    <thead>
                                        <tr>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projections.map((projection) => (
                                            <tr key={projection.M_Mes}>
                                                <td>{obtenerNombreMes(projection.M_Mes)}</td>
                                                <td>
                                                    <input type="number" step="0.01" className="form-control text-end" value={projection.Q_Proyecc_Monto} onChange={(e) => setProjections(projections.map((item) => item.M_Mes === projection.M_Mes ? { ...item, Q_Proyecc_Monto: parseFloat(e.target.value) } : item))}

                                                    />


                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                    <div>
                        <h5 className="text-end m-2">Total proyectado: {formatMoney(projections.reduce((acc, curr) => acc + curr.Q_Proyecc_Monto, 0))}</h5>
                        
                    </div>
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
                        onClick={saveProjections}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Spinner animation="border" size="sm" />
                        ) : (
                            "Grabar"
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
