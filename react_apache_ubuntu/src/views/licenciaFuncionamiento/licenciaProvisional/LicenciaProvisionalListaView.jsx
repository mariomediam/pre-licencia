import { Breadcrumb } from "react-bootstrap";

import Header from "../../../components/Header";
import { LicProvListaNavComponent } from "../../../components/licenciaFuncionamiento/licenciaProvisional/LicProvListaNavComponent";
import { LicProvListaComponent } from "../../../components/licenciaFuncionamiento/licenciaProvisional/LicProvListaComponent";

export const LicenciaProvisionalListaView = () => {
  return (
    <div>
      <Header />
      <div className="ps-3 mb-0">
        <Breadcrumb>
          <Breadcrumb.Item>Licencias de funcionamiento</Breadcrumb.Item>
          <Breadcrumb.Item active>Autorizaciones provisionales</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="d-flex flex-fill justify-content-center ">
        <div style={{ maxWidth: "1100px" }}>
            <LicProvListaNavComponent />
            <LicProvListaComponent />
        </div>
      </div>
    </div>
  );
};
