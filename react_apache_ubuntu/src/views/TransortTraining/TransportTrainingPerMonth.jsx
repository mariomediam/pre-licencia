import { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerCapacitacionPorAnioyMes, obtenerCapacitacionObservacionPorAnioyMes } from "../../services/transporteService";
import { obtenerNombreMes } from "../../utils/varios";
import Header from "../../components/Header";
import SchoolIcon from "../../icons/Schoolcon";
import DownloadIcon from "../../icons/DownloadIcon";
import XIcon from "../../icons/XIcon";
import { FooterIndicators } from "../managementIndicators/FooterIndicators";
import PlusIcon from "../../icons/PlusIcon";
import { TrainingPerMonthDetail } from "../../components/TransortTraining/TrainingPerMonthDetail";
import EditIcon from "../../icons/EditIcon";
import { TransportTrainingAddModal } from "../../components/TransortTraining/TransportTrainingAddModal";
import { listarCapacitacionTema, listarCapacitacionModalidad, listarCapacitacionCapacitador } from "../../services/transporteService";
import { TransportTrainingObservModal } from "../../components/TransortTraining/TransportTrainingObservModal";

export const TransportTrainingPerMonth = () => {

    const navigate = useNavigate();
    const { anio, mes } = useParams();

    const [capacitaciones, setCapacitaciones] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalCapacitaciones, setTotalCapacitaciones] = useState(0);
    const [observacion, setObservacion] = useState({});
    const [temas, setTemas] = useState([])
    const [modalidades, setModalidades] = useState([])
    const [capacitadores, setCapacitadores] = useState([])

    


    const [showAddTraining, setShowAddTraining] = useState(false);
    const handleCloseAddTraining = () => setShowAddTraining(false);
    const handleShowAddTraining = () => setShowAddTraining(true);


    const [showObservModal, setShowObservModal] = useState(false);
    const handleCloseObservModal = () => setShowObservModal(false);
    const handleShowObservModal = () => setShowObservModal(true);

    useEffect(() => {

        const getTemas = async () => {
            const data = await listarCapacitacionTema();            
            setTemas(data);
        }
        getTemas();

    }, []);


    useEffect(() => {
        const getModalidades = async () => {
            const data = await listarCapacitacionModalidad();
            setModalidades(data);
        }
        getModalidades();
    }, []);

    useEffect(() => {
        const getCapacitadores = async () => {
            const data = await listarCapacitacionCapacitador();
            setCapacitadores(data);
        }
        getCapacitadores();
    }, []);


    useEffect(() => {
        try {
            setIsLoading(true);
            const getCapacitaciones = async () => {
                const data = await obtenerCapacitacionPorAnioyMes({ anio, mes });
                setCapacitaciones(data);
            }
            getCapacitaciones();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [anio, mes]);

    useEffect(() => {
        if (capacitaciones.length > 0) {
            setTotalCapacitaciones(capacitaciones.reduce((acc, curr) => acc + curr.Q_Capacita_Cantidad, 0));
        } else {
            setTotalCapacitaciones(0);
        }
    }, [capacitaciones]);


    useEffect(() => {
        const getObservacion = async () => {
            const data = await obtenerCapacitacionObservacionPorAnioyMes({ anio, mes });
            setObservacion(data);
        }
        getObservacion();
    }, [anio, mes]);

    return (
        <>
            <Header />
            <div className="ps-3 mb-0">
                <Breadcrumb>
                    <Breadcrumb.Item active>SubGerencia de Educación y Seguridad Vial</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <hr />

            <div className="container mb-3">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8">

                        <div className="d-flex justify-content-between gap-2">


                            <div className="d-flex align-items-center">
                                <SchoolIcon className="me-2 mb-1" width={36} height={36} />
                                <h3>
                                    Capacitaciones viales
                                </h3>
                            </div>
                            <div
                                className="d-flex align-items-center gap-2 cursor-pointer border border-dark text-dark p-2 rounded justify-content-center"
                                role="button"
                                onClick={() => navigate(-1)}
                            >
                                <XIcon className="cursor-pointer p-0 m-0" width={20} height={20} />
                            </div>
                        </div>

                        <small className="text-muted">
                            Capacitaciones viales realizadas por la Subgerencia de Seguridad y Educación Vial
                        </small>
                        <div className="d-flex align-items-center mt-3 gap-3 justify-content-between bg-white p-3 border rounded" >
                            <h5 className="text-muted">{totalCapacitaciones} personas capacitadas</h5>

                            <div className="d-flex align-items-center gap-2" style={{ width: "200px" }}>
                                <span className="text-muted">Año:</span>
                                {anio}
                                <span className="text-muted">Mes:</span>
                                {obtenerNombreMes(mes)}
                            </div>
                        </div>

                        <div className="d-flex justify-content-end mt-3 gap-2">
                            <button className="btn btn-primary d-flex align-items-center gap-2" disabled={isLoading || capacitaciones.length === 0}>
                                Exportar
                                <DownloadIcon width={24} height={24} />
                            </button>
                            <button className="btn btn-primary d-flex align-items-center gap-2" disabled={isLoading || capacitaciones.length === 0} onClick={handleShowAddTraining}>
                                Agregar capacitación
                                <PlusIcon width={24} height={24} />
                            </button>
                        </div>



                        {isLoading ? <div className="d-flex justify-content-center align-items-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="">Loading...</span>
                            </div>
                        </div> : <TrainingPerMonthDetail capacitaciones={capacitaciones} anio={anio} temas={temas} modalidades={modalidades} capacitadores={capacitadores} />}


                        <div className="d-flex justify-content-between align-items-end mt-3 gap-2">
                            <small className="text-muted">Observaciones</small>
                            <button className="btn btn-primary d-flex align-items-center gap-2" disabled={isLoading} onClick={handleShowObservModal}>
                                Editar observaciones
                                <EditIcon width={24} height={24} />
                            </button>
                            
                        </div>
                        
                        <textarea className="form-control mt-2" value={observacion.T_Capacita_Observ} readOnly/>
                    </div>

                </div>

            </div>

            <FooterIndicators />
            <TransportTrainingAddModal
                show={showAddTraining}
                handleClose={handleCloseAddTraining}              
                temas={temas}
                modalidades={modalidades}
                capacitadores={capacitadores}
            />

            <TransportTrainingObservModal
                show={showObservModal}
                handleClose={handleCloseObservModal}
                anio={anio}
                mes={mes}
                observacionText={observacion.T_Capacita_Observ || ""}
                observacionId={observacion.C_Capacita_Observ}
            />



        </>
    )
}
