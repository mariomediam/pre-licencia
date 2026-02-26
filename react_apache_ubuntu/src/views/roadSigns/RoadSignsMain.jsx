import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { Breadcrumb } from "react-bootstrap";
import Swal from "sweetalert2";

import RoadIcon from "../../icons/RoadIcon";
import DownloadIcon from "../../icons/DownloadIcon";
import { obtenerSenializacionAgrupadaPorAnioyMes, descargarCapacitacion, listarSenializacionIndicador } from "../../services/transporteService";
import { RoadSignsPerMonth } from "../../components/roadSigns/RoadSignsPerMonth";
import { FooterIndicators } from "../managementIndicators/FooterIndicators";

// crear array con años desde el 2024 hasta la actualidad
const anios = Array.from(
    { length: new Date().getFullYear() - 2024 + 1 },
    (_, i) => new Date().getFullYear() - i
);

const currentYear = new Date().getFullYear();

const TIPO_INDICADOR_TODOS = 0;



export const RoadSignsMain = () => {

    const { anio } = useParams();
    const navigate = useNavigate();
    const [senializaciones, setSenializaciones] = useState([]);
    const [senializacionMonthly, setSenializacionMonthly] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [totalSenializaciones, setTotalSenializaciones] = useState([]);
    const [tipoIndicador, setTipoIndicador] = useState([])
    const [selectedTipoIndicador, setSelectedTipoIndicador] = useState(TIPO_INDICADOR_TODOS)



    const onChangeAnio = (e) => {
        const anio = e.target.value;
        navigate(`/transportation/road-signs/${anio}`);
    }

    useEffect(() => {
        const getTipoIndicador = async () => {
            const data = await listarSenializacionIndicador();
            data.unshift({ C_Senializa_Indicador: TIPO_INDICADOR_TODOS, N_Senializa_Indicador: "Todos" })
            setTipoIndicador(data);
            setSelectedTipoIndicador(TIPO_INDICADOR_TODOS);
        }
        getTipoIndicador();
    }, []);



    useEffect(() => {
        if (!anio) {
            navigate(`/transportation/road-signs/${currentYear}`);
        }
    }, [anio, navigate]);

    useEffect(() => {
        try {
            setIsLoading(true);
            const getSenializaciones = async () => {

                let data = await obtenerSenializacionAgrupadaPorAnioyMes({ anio });
                console.log("ejecutando getSenializaciones");

                if (selectedTipoIndicador !== TIPO_INDICADOR_TODOS) {
                    data = data.filter(item => item.C_Senializa_Indicador === selectedTipoIndicador);
                }
                setSenializaciones(data);
            }
            getSenializaciones();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error al obtener las capacitaciones",
                text: error.response.data.message,
            });
        } finally {
            setIsLoading(false);
        }
    }, [anio, selectedTipoIndicador]);

    useEffect(() => {
        if (senializaciones.length > 0) {
            //   quiero agrupar senializaciones por N_unimed_desc
            // de tal manera que me retorne [{ "N_unimed_desc": "M2", "cantidad": 100 }, { "N_unimed_desc": "UNIDAD", "cantidad": 20 }]
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


            setTotalSenializaciones(agrupado);
        } else {
            setTotalSenializaciones([]);
        }
    }, [senializaciones]);

    useEffect(() => {
        if (senializaciones.length > 0) {
            const resultado = Object.values(
                senializaciones.reduce((acc, item) => {
                    const mes = item.M_Senializa_Mes;
                    const unidad = item.N_unimed_desc;

                    if (!acc[mes]) {
                        acc[mes] = {
                            M_Senializa_Mes: mes.toString(),
                            unidades: {}
                        };
                    }

                    if (!acc[mes].unidades[unidad]) {
                        acc[mes].unidades[unidad] = {
                            N_unimed_desc: unidad,
                            cantidad: 0
                        };
                    }

                    acc[mes].unidades[unidad].cantidad += item.Q_Senializa_Cantidad;

                    return acc;
                }, {})
            ).map(mesData => ({
                M_Senializa_Mes: mesData.M_Senializa_Mes,
                unidades: Object.values(mesData.unidades)
            }));

            setSenializacionMonthly(resultado);
        } else {
            setSenializacionMonthly([]);
        }
    }, [senializaciones]);

    const handleDownload = async () => {
        return;
        // try {
        //   await descargarCapacitacion({ anio });
        // } catch (error) {
        //   Swal.fire({
        //     icon: "error",
        //     title: "Error al descargar la capacitación",
        //     text: error.response.data.message,
        //   });
        // }
    }

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
                        <div className="d-flex align-items-center">
                            <RoadIcon className="me-2 mb-1" width={36} height={36} />
                            <h3>
                                Señalización vial
                            </h3>
                        </div>
                        <small className="text-muted">
                            Señalización vial realizada por la Subgerencia de Tránsito y Movilidad Urbana
                        </small>
                        <div className="d-flex align-items-center mt-3 gap-3 justify-content-between bg-white p-3 border rounded" >

                            <div>
                                <span className="text-muted fw-medium p-0 m-0"><small>Total intervenido:</small></span>
                                {totalSenializaciones.map((item) => (
                                    <h5 className="text-muted p-0 m-0" key={item.N_unimed_desc}> {item.cantidad} {item.N_unimed_desc === "M2" ? "m²" : item.N_unimed_desc}</h5>
                                ))}
                            </div>

                            <div className="d-flex align-items-center gap-2" style={{ width: "200px" }}>
                                <span className="text-muted">Año:</span>


                                <select className="form-select" onChange={onChangeAnio} value={anio}>

                                    {anios.map((anio) => (
                                        <option key={anio} value={anio} defaultValue={anio === currentYear}>
                                            {anio}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between mt-3">
                            <div className="d-flex align-items-center gap-2">

                                <small className="text-muted">Tipo de señalización:</small>
                                <select className="form-select" onChange={(e) => setSelectedTipoIndicador(parseInt(e.target.value))} value={selectedTipoIndicador}>
                                    {tipoIndicador.map((item) => (
                                        <option key={item.C_Senializa_Indicador} value={item.C_Senializa_Indicador}>{item.N_Senializa_Indicador}</option>
                                    ))}
                                </select>
                            </div>


                            <button className="btn btn-primary d-flex align-items-center gap-2" disabled={isLoading || senializaciones.length === 0} onClick={handleDownload}>
                                Exportar
                                <DownloadIcon width={16} height={16} />
                            </button>
                        </div>



                        {isLoading ? <div className="d-flex justify-content-center align-items-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="">Loading...</span>
                            </div>
                        </div> : <RoadSignsPerMonth senializacionesMonthly={senializacionMonthly} anio={anio} />}
                    </div>

                </div>

            </div>

            <FooterIndicators />

        </>
    );
}
