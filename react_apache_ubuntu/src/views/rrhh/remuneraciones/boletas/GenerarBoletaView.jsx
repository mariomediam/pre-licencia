import React from "react";
import { Breadcrumb } from "react-bootstrap";

import Header from "../../../../components/Header";
import { GenerarBoletaComponent } from "../../../../components/rrhh";

export const GenerarBoletaView = () => {
  return (
    <div>
      <Header />
      <div className="ps-3">
        <Breadcrumb>
          <Breadcrumb.Item active>Recursos humanos</Breadcrumb.Item>
          <Breadcrumb.Item active>Generar boletas</Breadcrumb.Item>
        </Breadcrumb>
      </div>
        <hr className="p-0 m-0" />
      <div className="container">
        <div className="row justify-content-center">
          <div
            className="align-items-center p-2 col-sm-12 col-lg-8"
            style={{ border: "0px solid black" }}
          >
            <h3 className="mt-0 text-center">
              <i className="far fa-file-pdf me-2"></i>
              Generar boletas
            </h3>
          </div>
        </div>
      </div>
      <GenerarBoletaComponent />
    </div>
  );
};
