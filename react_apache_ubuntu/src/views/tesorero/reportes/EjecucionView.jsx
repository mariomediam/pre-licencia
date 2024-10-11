import { useState } from "react";
import { Breadcrumb, Form } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

import Header from "../../../components/Header";
import ReportIcon from "../../../icons/ReportIcon";
import { EjecucionFilterGeneralView } from "./EjecucionFilterGeneralView";

const TABS = ["General", "Presupuestal", "Documento", "SIAF", "SIGA.NET"];

export const EjecucionView = () => {
  const [tabSelected, setTabSelected] = useState(TABS[0]);

  const onClickTab = (tab) => {
    setTabSelected(tab);
  };

  return (
    <>
      <Header />
      <div className="ps-3">
        <Breadcrumb>
          <Breadcrumb.Item active>Reportes</Breadcrumb.Item>
          <Breadcrumb.Item active>SIAF</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <hr />
      <div className="d-flex justify-content-center align-items-center">
        <ReportIcon className="me-1 thumbnail text-color-default mb-1" />
        <h3 className="text-color-default">
          Ejecución detalla de ingresos y gastos
        </h3>
      </div>
      <div className="p-3 d-flex justify-content-center">
        <div className="full-width" style={{ maxWidth: "1500px" }}>
          <div className="col-12 col-sm-10 ">
            <div className="col-12 col-sm-5"></div>

            <Nav
              variant="underline"
              defaultActiveKey={`link-${TABS[0]}`}
              className="mt-2"
            >
              {TABS.map((tab, index) => (
                <Nav.Item key={index}>
                  <Nav.Link
                    eventKey={`link-${tab}`}
                    onClick={() => onClickTab(tab)}
                  >
                    <span
                      className={`text-color-default ${
                        tab === tabSelected ? "fw-bold" : ">"
                      }`}
                    >
                      {tab}
                    </span>
                    {tabSelected === tab && (
                      <hr
                        className="mt-0 pt-0 rounded text-color-default"
                        style={{ height: "3px" }}
                      />
                    )}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </div>
          <div className="px-3">
          {tabSelected === TABS[0] && <EjecucionFilterGeneralView />}

          </div>
        </div>
      </div>
      
    </>
  );
};
