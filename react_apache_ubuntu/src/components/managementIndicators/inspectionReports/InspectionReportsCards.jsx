import CoinsIcon from "../../../icons/CoinsIcon";
import { Spinner } from "react-bootstrap";
import TrendingUpIcon from "../../../icons/TrendingUpIcon";
import CashIcon from "../../../icons/CashIcon";
import CheckIcon from "../../../icons/CheckIcon";
import { formatMoney } from "../../../utils/varios";
import MoneyBagIcon from "../../../icons/MoneyBagIcon";
import FileTextIcon from "../../../icons/FileTextIcon";
import CashRegisterIcon from "../../../icons/CashRegisterIcon";



export const InspectionReportsCards = ({ recaudado, porCobrar, impuesto, totalActas, isLoading = false, isMain = false }) => {



  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "1.25rem 1.5rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
    border: "1px solid #e9ecef",
    minWidth: "180px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "120px",
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
    margin: 0,
    fontWeight: "500",
  };

  const valueStyle = {
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#212529",
    margin: 0,
  };

  const allCards = [
    {
      title: "Total actas",
      value: `${totalActas}`,
      icon: <FileTextIcon width={16} height={16} style={{ color: "#7c3aed" }} />,      
    },
    {
      title: "Meta anual",
      value: formatMoney(5000000),
      icon: <TrendingUpIcon width={16} height={16} style={{ color: "#7c3aed" }} />,
      showOnlyInMain: true,
    },
    {
      title: "Impuesto",
      value: formatMoney(impuesto),
      icon: <CashRegisterIcon width={16} height={16} style={{ color: "#7c3aed" }} />,
      subtitle: "Monto sin beneficios",
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
      title: "Recaudado / (Por cobrar)",
      value: `${((recaudado * 100) / (porCobrar + recaudado)).toFixed(1)}%`,
      icon: <CheckIcon width={16} height={16} style={{ color: "#7c3aed" }} />,
    },
  ];

  const cards = allCards.filter(card => !card.showOnlyInMain || isMain);

  return (
    <div className="d-flex flex-wrap gap-3 my-3">
      {cards.map((card, index) => (
        <div key={index} style={cardStyle}>
          <div className="d-flex align-items-center gap-2">
            <div style={iconContainerStyle}>{card.icon}</div>
            <div className="d-flex flex-column">
            <span style={titleStyle}>{card.title}</span>
            {card.subtitle && <small className="text-muted p-0 m-0" style={{ fontSize: "0.75rem" }}>{card.subtitle}</small>}
            </div>
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
