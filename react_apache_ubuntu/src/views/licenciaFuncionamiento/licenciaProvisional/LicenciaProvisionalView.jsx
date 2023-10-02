import { Breadcrumb, Container, Row } from "react-bootstrap";

import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import { obtenerLicProvTipo } from "../../../services/licFuncService";
import { LicenciaProvisionalItem } from "./LicenciaProvisionalItem";

export const LicenciaProvisionalView = () => {
  const [licProvTipos, setLicProvTipos] = useState([]);

  useEffect(() => {
    obtenerLicProvTipo().then((data) => {
      setLicProvTipos(data);
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="ps-3 mb-0">
        <Breadcrumb>
          <Breadcrumb.Item active>Licencias de funcionamiento</Breadcrumb.Item>
        </Breadcrumb>        
      </div>

      <h3 className="mt-0 mb-3 text-center">
        <i className="fas fa-store me-3"></i>
        Licencias provisionales
      </h3>

      <div className="d-flex justify-content-center mx-1 flex-wrap">
        <Row className="gap-3">
          {licProvTipos.map((licProvTipo) => (
            <LicenciaProvisionalItem
              key={licProvTipo.licProvTipoId}
              {...licProvTipo}
            />
          ))}
        </Row>
      </div>
    </div>
  );
};
