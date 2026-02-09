import TrendingUpIcon from "../../../icons/TrendingUpIcon";
import { formatMoney } from "../../../utils/varios";
import EditIcon from "../../../icons/EditIcon";

export const ManageReteItem = ({ rate, handleShowEditRate, setRateSelected }) => {


    const handleEditRate = () => {
        setRateSelected(rate);
        handleShowEditRate();
    };
  return (
    <tr style={{ borderBottom: "1px solid #e9ecef" }}>
        {/* Columna Id */}
        <td style={{ padding: "20px", verticalAlign: "top" }}>
            <div style={{ fontWeight: "600", fontSize: "15px", color: "#212529" }}>
                {rate.C_Tasa_SATP}
            </div>
            <div style={{ fontSize: "12px", color: "#6c757d", marginTop: "4px" }}>
                Id {rate.C_Tasa}
            </div>
        </td>

        {/* Columna Descripción */}
        <td style={{ padding: "20px", verticalAlign: "top" }}>
            <div style={{ fontWeight: "600", fontSize: "14px", color: "#212529", lineHeight: "1.4" }}>
                {rate.N_Tasa_Descrip}
            </div>
            <div style={{ fontSize: "13px", marginTop: "6px" }}>
                {rate.N_depend_Descripcion && "Oficina responsable: "} {rate.N_depend_Descripcion}
            </div>
            <div style={{ fontSize: "13px", color: "#6c757d", marginTop: "1px" }}>
                {rate.N_Tasa_PartidaMPP && "Partida: "} {rate.N_Tasa_PartidaMPP}
            </div>
        </td>

        {/* Columna Monto */}
        <td style={{ padding: "20px", verticalAlign: "top", textAlign: "right" }}>
            <span style={{ fontWeight: "500", fontSize: "14px", color: "#212529" }}>
                {formatMoney(rate.Q_Tasa_Monto)}
            </span>
        </td>

        {/* Columna Acciones */}
        <td style={{ padding: "20px", verticalAlign: "top", textAlign: "center" }}>
            <div className="d-flex justify-content-center gap-2">
                <button 
                    className="btn btn-outline-primary btn-sm d-flex align-items-center justify-content-center"
                    style={{ width: "36px", height: "36px", borderRadius: "8px" }}
                    title="Proyección"
                >
                    <TrendingUpIcon width={16} height={16} />
                </button>
                <button 
                    className="btn btn-outline-primary btn-sm d-flex align-items-center justify-content-center"
                    style={{ width: "36px", height: "36px", borderRadius: "8px" }}
                    title="Editar"
                    onClick={handleEditRate}
                >
                    <EditIcon width={16} height={16} />
                </button>
            </div>
        </td>
    </tr>
  );
}
