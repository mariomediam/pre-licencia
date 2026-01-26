import { useParams } from "react-router-dom";

import { CardIndicator } from "../../components/managementIndicators/CardIndicator";
import { HeaderIdicators } from "./HeaderIdicators";
import { FooterIndicators } from "./FooterIndicators";


export const MainIndicators = () => {

  const { tipo: urlTipo = "01" } = useParams();

  return (
    <div className="main-indicators-font min-vh-100 d-flex flex-column" style={{ backgroundColor: "#f8f9fc" }}>
      <HeaderIdicators selectedType={urlTipo} />
      
      {/* Header Section */}
      <div className="container-lg mx-auto py-5 flex-grow-1">
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-3" style={{ fontSize: "2.5rem" }}>Plataforma de Datos</h1>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <p className="text-muted mb-0">
                Plataforma centralizada para el monitoreo y seguimiento de objetivos de la{" "}
                <span className="fw-bold text-dark">Gerencia de Transporte y Movilidad Urbana</span>{" "}
                de la Municipalidad Provincial de Piura
              </p>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <main className="px-3 px-md-4">
          <CardIndicator tipoSelected={urlTipo} />
        </main>
      </div>

      {/* Footer */}
      <FooterIndicators />
    </div>
  );
};
