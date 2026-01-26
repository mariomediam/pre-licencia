import { CardOficceIndicator } from "./CardOficceIndicator";
import { getIndicators } from "./indicatorsData";

export const CardIndicator = ({ anioSelected, tipoSelected }) => {
  const indicators = getIndicators(anioSelected);
  const filteredIndicators = indicators.filter(({ type }) => type === tipoSelected);
  
  // Separar gerencia principal (nivel 1) de subgerencias (nivel 2)
  const mainIndicator = filteredIndicators.find(({ nivel }) => nivel === 1);
  const subIndicators = filteredIndicators.filter(({ nivel }) => nivel === 2);

  return (
    <div className="d-flex flex-column gap-4">
      {/* Card principal - Gerencia */}
      {mainIndicator && (
        <CardOficceIndicator dataIndicator={mainIndicator} isMainCard={true} />
      )}
      
      {/* Cards de subgerencias */}
      {subIndicators.length > 0 && (
        <div className="row g-3">
          {subIndicators.map((indicator) => (
            <div key={indicator.code} className="col-12 col-sm-6 col-lg-3">
              <CardOficceIndicator dataIndicator={indicator} isMainCard={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
