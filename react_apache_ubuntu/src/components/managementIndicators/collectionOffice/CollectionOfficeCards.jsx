import CoinsIcon from "../../../icons/CoinsIcon";
import CashIcon from "../../../icons/CashIcon";
import TrendingUpIcon from "../../../icons/TrendingUpIcon";
import CheckIcon from "../../../icons/CheckIcon";

export const CollectionOfficeCards = ({ totalRaised, totalProjected }) => {
  const pendingAmount = totalProjected - totalRaised > 0 ? totalProjected - totalRaised : 0;
  const completionPercentage = totalProjected > 0 
    ? ((totalRaised / totalProjected) * 100).toFixed(1) 
    : 100;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "1.25rem 1.5rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
    border: "1px solid #e9ecef",
    minWidth: "200px",
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
      title: "Monto recaudado",
      value: formatCurrency(totalRaised),
      icon: <CoinsIcon width={16} height={16} style={{ color: "#7c3aed" }} />,
    },
    {
      title: "Recaudación proyectada",
      value: formatCurrency(totalProjected),
      icon: <TrendingUpIcon width={16} height={16} style={{ color: "#7c3aed" }} />,
    },
    {
      title: "Monto pendiente de recaudación",
      value: formatCurrency(pendingAmount),
      icon: <CashIcon width={16} height={16} style={{ color: "#7c3aed" }} />,
    },
    
    {
      title: "Cumplimiento",
      value: `${completionPercentage}%`,
      icon: <CheckIcon width={16} height={16} style={{ color: "#7c3aed" }} />,
    },
  ];

  return (
    <div className="d-flex flex-wrap gap-3 my-5">
      {cards.map((card, index) => (
        <div key={index} style={cardStyle}>
          <div className="d-flex align-items-center gap-2 mb-2">
            <div style={iconContainerStyle}>{card.icon}</div>
            <span style={titleStyle}>{card.title}</span>
          </div>
          <p style={valueStyle}>{card.value}</p>
        </div>
      ))}
    </div>
  );
};
