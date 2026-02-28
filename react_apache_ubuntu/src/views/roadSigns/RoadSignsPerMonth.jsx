import { useState, useEffect } from "react";
import { Breadcrumb, Button, Spinner } from "react-bootstrap";
import Toast from "sweetalert2";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import RoadIcon from "../../icons/RoadIcon";
import XIcon from "../../icons/XIcon";
import DownloadIcon from "../../icons/DownloadIcon";
import { FooterIndicators } from "../managementIndicators/FooterIndicators";
import { obtenerNombreMes } from "../../utils/varios";
import { obtenerSenializacionPorAnioyMes, insertarSenializaciones, descargarSenializacion } from "../../services/transporteService";
import { RoadSignsPerMonthDetail } from "../../components/roadSigns/RoadSignsPerMonthDetail";

export const RoadSignsPerMonth = () => {

    const navigate = useNavigate();
    const { anio, mes } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [senializaciones, setSenializaciones] = useState([])
    const [totalSenializacionesByUniMed, setTotalSenializacionesByUniMed] = useState([])

    const handleDownload = async () => {
        
        try {
          await descargarSenializacion({ anio, mes });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error al descargar la capacitación",
            text: error.response.data.message,
          });
        }
    }

    const goBack = () => {
        navigate(`/transportation/road-signs/${anio}`);
    }

    useEffect(() => {
        const getSenializaciones = async () => {
            const data = await obtenerSenializacionPorAnioyMes({ anio, mes });
            setSenializaciones(data);
        }
        getSenializaciones();
    }, [anio, mes]);

    const setChangeQuantity = (indicadorId, cantidad) => {

        const nuevaSenializacion = senializaciones.map(item =>
            item.C_Senializa_Indicador === indicadorId
                ? { ...item, Q_Senializa_Cantidad: cantidad }
                : item
        );

        setSenializaciones(nuevaSenializacion);
    }

    useEffect(() => {
        if (senializaciones.length > 0) {
            const agrupado = []

            const groupByUniMed = Object.groupBy(senializaciones,
                senializa => {
                    return senializa.N_unimed_desc
                }
            )

            Object.keys(groupByUniMed).forEach(key => {
                agrupado.push({
                    N_unimed_desc: key,
                    cantidad: groupByUniMed[key].reduce((acc, curr) => acc + curr.Q_Senializa_Cantidad, 0)
                })
            })


            setTotalSenializacionesByUniMed(agrupado);
        } else {
            setTotalSenializacionesByUniMed([]);
        }
    }, [senializaciones]);

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            await insertarSenializaciones({ anio, mes, senializaciones });
            goBack();
            Toast.fire({
                icon: "success",
                title: "Las señalizaciones se grabaron con éxito",
                background: "#F4F6F6",
                timer: 1500,
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Error al grabar las señalizaciones",
                text: error.response.data.message,
            });
        } finally {
            setIsLoading(false);
        }
    }

    const handleCancel = () => {
        goBack();
    }



    return (
        <>
            <Header />
            <div className="ps-3 mb-0">
                <Breadcrumb>
                    <Breadcrumb.Item active>Subgerencia de Tránsito y Movilidad Urbana</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <hr />

            <div className="container mb-3">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8">

                        <div className="d-flex justify-content-between gap-2">


                            <div className="d-flex align-items-center">
                                <RoadIcon className="me-2 mb-1" width={36} height={36} />
                                <h3>
                                    Señalizaciones viales
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
                            Señalizaciones viales realizadas por la Subgerencia de Tránsito y Movilidad Urbana
                        </small>
                        <div className="d-flex align-items-center mt-3 gap-3 justify-content-between bg-white p-3 border rounded" >
                            <div>
                                <span className="text-muted fw-medium p-0 m-0"><small>Total intervenido:</small></span>
                                {totalSenializacionesByUniMed.map((item) => (
                                    <h5 className="text-muted p-0 m-0" key={item.N_unimed_desc}> {item.cantidad} {item.N_unimed_desc === "M2" ? "m²" : item.N_unimed_desc}</h5>
                                ))}
                            </div>

                            <div className="d-flex align-items-center gap-2" style={{ width: "200px" }}>
                                <span className="text-muted">Año:</span>
                                {anio}
                                <span className="text-muted">Mes:</span>
                                {obtenerNombreMes(mes)}
                            </div>
                        </div>

                        <div className="d-flex justify-content-end mt-3 mb-2 gap-2">
                            <button className="btn btn-primary d-flex align-items-center gap-2" disabled={isLoading || senializaciones.length === 0} onClick={handleDownload}>
                                Exportar
                                <DownloadIcon width={24} height={24} />
                            </button>

                        </div>



                        {isLoading ? <div className="d-flex justify-content-center align-items-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="">Loading...</span>
                            </div>
                        </div> : <table className="table table-borderless table-responsive">
                            <thead >
                                <tr className="border-bottom">
                                    <th className="text-muted fw-normal pb-3">Indicador</th>
                                    <th className="text-muted fw-normal pb-3 text-end">Cantidad</th>
                                    <th className="text-muted fw-normal pb-3">Unidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {senializaciones.map((senializacion) => (
                                    <RoadSignsPerMonthDetail key={senializacion.C_Senializa_Indicador} senializacion={senializacion} setChangeQuantity={setChangeQuantity} />
                                ))}
                            </tbody>
                        </table>}

                        <div className="d-flex justify-content-end gap-2">
                            <Button
                                variant="secondary"
                                onClick={handleCancel}
                                disabled={isLoading}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleSubmit}
                                disabled={isLoading}
                            >
                                {isLoading ? <Spinner animation="border" /> : "Grabar"}
                            </Button>
                        </div>

                    </div>

                </div>
            </div>

            <FooterIndicators />


        </>
    )
}