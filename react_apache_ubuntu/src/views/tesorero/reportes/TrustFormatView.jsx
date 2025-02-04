import { useState } from "react";
import { Breadcrumb } from "react-bootstrap";

import Header from "../../../components/Header";
import FilesIcon from "../../../icons/FilesIcon";
import { TrustFormatModalComponent } from "../../../components/tesorero/reports/filters/TrustFormat/TrustFormatModalComponent";
// import { AccrualFormatStepperView } from "./AccrualFormatStepperView";

export const TrustFormatView = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  return (
    <>
      <Header />
      <div className="ps-3">
        <Breadcrumb>
          <Breadcrumb.Item active>Reportes</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <hr />
      <div className="d-flex justify-content-center align-items-center">
        <FilesIcon className="me-1 thumbnail text-color-default mb-1" />
        <h3 className="text-color-default">Formato para fideicomiso</h3>
      </div>
      <div className="d-flex justify-content-center pt-3 pb-3">
        <div style={{ maxWidth: "576px" }}>
          {/* <AccrualFormatStepperView /> */}
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", right: "300px", width: "70px" }}>
          <div style={{ position: "fixed", bottom: "45px" }}>
            <button
              className="btn btn-primary rounded-circle"
              style={{ width: "70px", height: "70px" }}
              title="Agregar carta orden"
              onClick={handleShow}
              // disabled={periodosDisponibles.length === 0}
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>

      <TrustFormatModalComponent show={show} handleClose={handleClose} />
    </>
  );
};
