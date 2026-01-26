import { useParams, useNavigate } from "react-router-dom";

import { getIndicators } from "../../components/managementIndicators/indicatorData";
import { HeaderIdicators } from "./HeaderIdicators";
import { FooterIndicators } from "./FooterIndicators";
import { getOffices } from "../../components/managementIndicators/officesData";
import { CardItemIndicator } from "../../components/managementIndicators/CardItemIndicator";
import ArrowLeftIcon from "../../icons/ArrowLeft";

export const ListIndicators = () => {
  const navigate = useNavigate();
  const { tipo: urlTipo = "01", code: urlCode = "00" } = useParams();

  const indicators = getIndicators();
  const offiices = getOffices();

  const filteredOffices = offiices.find((row) => row.type === urlTipo && row.code === urlCode);

  const filteredIndicators = indicators.filter((row) => row.type === urlTipo && row.code === urlCode);
  
  if (filteredOffices === undefined) {
    return null;
  }

  const { title : officeTitle, subTitle: officeSubTitle } = filteredOffices;

  return (
    <div className="main-indicators-font min-vh-100 d-flex flex-column" style={{ backgroundColor: "#f8f9fc" }}>
      <HeaderIdicators selectedType={urlTipo} />
      
      {/* Header Section */}
      <div className="container-lg mx-auto py-5 flex-grow-1">
        <button className="btn btn-link text-primary text-decoration-none d-flex align-items-center gap-1 fw-medium p-0" onClick={() => navigate(-1)}>
          <ArrowLeftIcon width={16} height={16} />
          Volver
        </button>
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-3" style={{ fontSize: "2.5rem" }}>Indicadores de {officeTitle}</h1>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <p className="text-muted mb-0">
                {officeSubTitle}
              </p>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <main className="px-3 px-md-4 d-flex gap-3">
          {
            filteredIndicators.map((indicator) => (
              <CardItemIndicator key={indicator.code} dataItemIndicator={indicator} />
            ))
          }
        </main>
      </div>

      {/* Footer */}
      <FooterIndicators />
    </div>
  );
};
