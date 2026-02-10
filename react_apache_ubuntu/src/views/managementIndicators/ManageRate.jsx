import { useState } from "react";
import Swal from "sweetalert2";
import Header from "../../components/Header";
import { Breadcrumb, Spinner } from "react-bootstrap";
import CoinsIcon from "../../icons/CoinsIcon";
import DownloadIcon from "../../icons/DownloadIcon";
import SearchIcon from "../../icons/SearchIcon";
import { SelectTasa } from "../../services/indicatorsService";
import { ManageReteItem } from "../../components/managementIndicators/rates/ManageReteItem";
import { EditRateModal } from "../../components/managementIndicators/rates/EditRateModal";
import { FooterIndicators } from "./FooterIndicators";
import { RateProjectionsModal } from "../../components/managementIndicators/rates/RateProjectionsModal";

export const ManageRate = () => {
    const [filtro, setFiltro] = useState("03");
    const [busqueda, setBusqueda] = useState("");
    const [rates, setRates] = useState([]);
    const [rateSelected, setRateSelected] = useState({});

    const [showEditRate, setShowEditRate] = useState(false);
    const handleCloseEditRate = () => setShowEditRate(false);
    const handleShowEditRate = () => setShowEditRate(true);
    const [isLoading, setIsLoading] = useState(false);



    const [showRateProjections, setShowRateProjections] = useState(false);
    const handleCloseRateProjections = () => setShowRateProjections(false);
    const handleShowRateProjections = () => setShowRateProjections(true);


    const handleBuscar = async () => {

        try {
            setIsLoading(true);

            const opcion = filtro
            const valor = busqueda.trim();

            const data = await SelectTasa({ opcion, valor });
            setRates(data);
        } catch (error) {
            setIsLoading(false);
            Swal.fire({
                icon: "error",
                title: "Error al buscar tasas",
                text: error.response.data.message,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleExportar = () => {
        console.log("Exportando...");
    };

    return (
        <div>
            <Header />
            <div className="ps-3">
                <Breadcrumb>
                    <Breadcrumb.Item active>Gerencia de Tránsito y Movilidad Urbana</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <hr className="p-0 m-0" />
            <div className="container">
                <div className="row justify-content-center">
                    <div
                        className="align-items-center p-2 col-sm-12 col-lg-8"
                        style={{ border: "0px solid black" }}
                    >
                        <h3 className="mt-0 text-center">
                            <CoinsIcon className="me-2 mb-1" />
                            Administrar tasas de recaudación
                        </h3>
                    </div>
                </div>
            </div>

            {/* Buscador */}
            <div className="container mb-3">
                <div
                    className="bg-white rounded-3 p-3 p-md-4 shadow-sm"
                    style={{ border: "1px solid #e0e0e0" }}
                >
                    <label className="form-label text-muted small mb-2">Buscar tasa por:</label>
                    <div className="d-flex flex-column flex-md-row gap-2 gap-md-3 align-items-stretch align-items-md-center">
                        {/* Select + Input agrupados */}
                        <div className="d-flex flex-column flex-sm-row flex-grow-1 gap-0">
                            <select
                                className="form-select"
                                aria-label="Filtro"
                                value={filtro}
                                onChange={(e) => setFiltro(e.target.value)}
                                style={{
                                    width: "160px",
                                    minWidth: "160px",
                                    flexShrink: 0,
                                    borderTopRightRadius: 0,
                                    borderBottomRightRadius: 0,
                                    borderRight: "none"
                                }}
                            >
                                <option value="03">Descripción</option>
                                <option value="04">Unidad orgánica</option>
                                <option value="02">Código de tasa</option>
                            </select>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ingrese su búsqueda..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleBuscar();
                                    }
                                }}
                                style={{
                                    flex: 1,
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0
                                }}
                            />
                        </div>

                        {/* Botones */}
                        <div className="d-flex gap-2 flex-shrink-0">
                            <button
                                type="button"
                                className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
                                onClick={handleBuscar}
                                style={{ minWidth: "110px" }}
                                disabled={isLoading}
                            >
                                <SearchIcon width={16} height={16} />
                                Buscar
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2"
                                onClick={handleExportar}
                                style={{ minWidth: "120px" }}
                                disabled={isLoading}
                            >
                                <DownloadIcon width={16} height={16} />
                                Exportar
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabla de resultados */}

                {isLoading ? (
                    <div className="d-flex justify-content-center align-items-center">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : (
                    <>

                        {rates.length > 0 && (
                            <div className="bg-white rounded-3 shadow-sm mt-4 overflow-hidden" style={{ border: "1px solid #e0e0e0" }}>
                                <table className="table table-hover mb-0 animate__animated animate__fadeIn animate__faster" style={{ tableLayout: "fixed" }}>
                                    <thead>
                                        <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "2px solid #e0e0e0" }}>
                                            <th style={{ width: "120px", padding: "16px 20px", fontWeight: "600", color: "#6c757d", fontSize: "14px" }}>Código de tasa</th>
                                            <th style={{ padding: "16px 20px", fontWeight: "600", color: "#6c757d", fontSize: "14px" }}>Descripción</th>
                                            <th style={{ width: "120px", padding: "16px 20px", fontWeight: "600", color: "#6c757d", fontSize: "14px", textAlign: "right" }}>Monto</th>
                                            <th style={{ width: "120px", padding: "16px 20px", fontWeight: "600", color: "#6c757d", fontSize: "14px", textAlign: "center" }}>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rates.map((rate) => (
                                            <ManageReteItem key={rate.C_Tasa_SATP} rate={rate} handleShowEditRate={handleShowEditRate} setRateSelected={setRateSelected}
                                                handleShowRateProjections={handleShowRateProjections}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}
            </div>
            <EditRateModal
                show={showEditRate}
                handleClose={handleCloseEditRate}
                rateSelected={rateSelected}
                handleBuscar={handleBuscar}
            />

            <RateProjectionsModal
                show={showRateProjections}
                handleClose={handleCloseRateProjections}
                rateSelected={rateSelected}
            />

            <FooterIndicators />

        </div>
    );
}