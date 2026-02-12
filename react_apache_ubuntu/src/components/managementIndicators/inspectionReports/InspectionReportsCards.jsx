import CoinsIcon from "../../../icons/CoinsIcon";
import { Spinner } from "react-bootstrap";
import TrendingUpIcon from "../../../icons/TrendingUpIcon";
import CashIcon from "../../../icons/CashIcon";
import CheckIcon from "../../../icons/CheckIcon";
import { formatMoney, formatNumber } from "../../../utils/varios";
import MoneyBagIcon from "../../../icons/MoneyBagIcon";
import FileTextIcon from "../../../icons/FileTextIcon";
import CashRegisterIcon from "../../../icons/CashRegisterIcon";



export const InspectionReportsCards = ({recaudado, porCobrar, porEjecutar, totalActas, isLoading = false   }) => {

    

    const cardStyle = {
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "1.25rem 1.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
        border: "1px solid #e9ecef",
        minWidth: "180px",
        flex: 1,
      };
    
      const iconContainerStyle = {
        width: "28px",
        height: "28px",
        borderRadius: "8px",
        backgroundColor: "#f0e6ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      };
    
      const titleStyle = {
        fontSize: "0.85rem",
        color: "#6c757d",
        marginBottom: "0.5rem",
        fontWeight: "500",
      };
    
      const valueStyle = {
        fontSize: "1.5rem",
        fontWeight: "700",
        color: "#212529",
        margin: 0,
      };

    const cards = [
        {
            title: "Total actas",
            value: `${totalActas}`,
            icon: <FileTextIcon width={16} height={16} style={{ color: "#7c3aed" }} />,
          },
        {
          title: "Recaudado",
          value: formatMoney(recaudado),
          icon: <MoneyBagIcon width={16} height={16} style={{ color: "#7c3aed" }} />,
        },
        {
          title: "Por cobrar",
          value: formatMoney(porCobrar),
          icon: <CashIcon width={16} height={16} style={{ color: "#7c3aed" }} />,
        },
        {
          title: "Por ejecutar",
          value: formatMoney(porEjecutar),
          icon: <CashRegisterIcon width={16} height={16} style={{ color: "#7c3aed" }} />,
        },
        
        {
          title: "Recaudado / (Por cobrar + Por ejecutar)",
          value: `${((recaudado *100) /(recaudado + porCobrar + porEjecutar) ).toFixed(1)}%`,
          icon: <CheckIcon width={16} height={16} style={{ color: "#7c3aed" }} />,
        },
      ];

  return (
    <div className="d-flex flex-wrap gap-3 my-3">
      {cards.map((card, index) => (
        <div key={index} style={cardStyle}>
          <div className="d-flex align-items-center gap-2 mb-2">
            <div style={iconContainerStyle}>{card.icon}</div>
            <span style={titleStyle}>{card.title}</span>
          </div>
          {
            isLoading ? (
              <div className="d-flex justify-content-center align-items-center">
                <small><Spinner animation="border" role="status" /></small> 
              </div>
            ) : (
              <p style={valueStyle}>{card.value}</p>
            )
          }
          
        </div>
      ))}
    </div>
  )
}
