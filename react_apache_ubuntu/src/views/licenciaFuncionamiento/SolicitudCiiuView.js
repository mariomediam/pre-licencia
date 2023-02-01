import React from "react";
import { Breadcrumb } from "react-bootstrap";

import Header from "../../components/Header";
import { SolicitudCiiuComponent } from "../../components/licenciaFuncionamiento/SolicitudCiiuComponent";

export const SolicitudCiiuView = () => {

    
  return (
    <div>
      <Header />
      <div className="ps-3">
        <Breadcrumb>
          <Breadcrumb.Item active>Solicitud</Breadcrumb.Item>
          <Breadcrumb.Item active>Agregar CIIU</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div
            className="align-items-center p-2 col-sm-12 col-lg-8"
            style={{ border: "0px solid black" }}
          >
            <h3 className="mt-0 text-center">
              <i className="fas fa-store me-3"></i>
              Agregar CIIU a Solicitud
            </h3>
            <SolicitudCiiuComponent />
          </div>
        </div>
      </div>
    </div>
  );
};
