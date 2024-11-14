import { Breadcrumb } from "react-bootstrap";

import Header from "../../../components/Header";
import CashRegisterIcon from "../../../icons/CashRegisterIcon";
import { AccrualFormatStepperView } from "./AccrualFormatStepperView";

export const AccrualFormatView = () => {
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
        <CashRegisterIcon className="me-1 thumbnail text-color-default mb-1" />
        <h3 className="text-color-default">Formato para fase devengado</h3>
      </div>
      <div className="d-flex justify-content-center pt-3" >
      <div style={{ maxWidth: "576px" }}>
        <AccrualFormatStepperView />
      </div>
      </div>
    </>
  );
};
