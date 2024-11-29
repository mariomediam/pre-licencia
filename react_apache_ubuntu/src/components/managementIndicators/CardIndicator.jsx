// import { useParams } from "react-router-dom";

import { CardItemIndicator } from "./CardItemIndicator";
import { getIndicators } from "./indicatorsData";

export const CardIndicator = ({ anioSelected, tipoSelected }) => {

  const indicators = getIndicators(anioSelected);

  return (
    <div className="d-flex gap-3 flex-wrap cards-container">
      
      {indicators.filter(({type}) => type === tipoSelected).map((indicator) => (
        <CardItemIndicator key={indicator.code} indicator={indicator} />
      ))}
    </div>
  );
};
