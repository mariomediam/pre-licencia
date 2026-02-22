import ArrowRightIcon from "../../icons/ArrowRight";
import { useNavigate } from "react-router-dom";

const currentYear = new Date().getFullYear();

  
export const CardItemIndicator = ({ dataItemIndicator }) => {
  const { type, code, title, subTitle, icon, codIndicator } = dataItemIndicator;

  const navigate = useNavigate();

  
const links = {
  "010201": `/indicadores/actas-control/${currentYear}`,
  "010401": `/indicadores/transportes-capacitacion/${currentYear}`,
}

  const onClickGoTo = () => {
    // if (codIndicator === "010201") {
    //   navigate(`/indicadores/actas-control/${currentYear}`);
    // } else {
    //   navigate(`/indicadores-detail/${type}/${code}`);
    // }
    const link = links[codIndicator];
    if (link) {
      navigate(link);
    }
    else {
      navigate(`/indicadores-detail/${type}/${code}`);
    }
  }

  return (
    <div className="bg-white border rounded-4 shadow-sm p-4 card-subindicator d-flex flex-column h-100">
      <div
        className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 mb-3"
        style={{ width: "3rem", height: "3rem" }}
      >
        {icon}
      </div>
      <h6 className="m-0 p-0 fw-semibold mb-2">{title}</h6>
      <p className="text-muted small m-0 p-0 flex-grow-1">{subTitle}</p>
      <button 
        type="button"
        className="btn btn-link text-primary text-decoration-none d-flex align-items-center gap-1 mt-3 small fw-medium p-0"
        onClick={onClickGoTo}
      >
        Ver indicadores<ArrowRightIcon width={16} height={16} />
      </button>
    </div>
  );
}