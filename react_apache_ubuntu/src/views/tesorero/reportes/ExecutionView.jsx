import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Breadcrumb, Nav } from "react-bootstrap";

import Header from "../../../components/Header";
import ReportIcon from "../../../icons/ReportIcon";
import { ExecutionFilterGeneralView } from "./ExecutionFilterGeneralView";
import { ExecutionFilterBudgetaryView } from "./ExecutionFilterBudgetaryView";
import { ExecutionFilterDocumentView } from "./ExecutionFilterDocumentView";
import { ExecutionFilterSIAFView } from "./ExecutionFilterSIAFView";
import { ExecutionFilterSIGAView } from "./ExecutionFilterSIGAView";

import { updateFilterSearch } from "../../../store/slices/helpers/filterSearch/thunks";

const TABS = ["General", "Presupuestal", "Documento", "SIAF", "SIGA.NET"];

const firstDay = new Date(new Date().getFullYear(), 0, 1)
  .toISOString()
  .split("T")[0];
const currentDate = new Date().toISOString().split("T")[0];

const initialFilterSearch = {
  periodo: [firstDay, currentDate],
  ciclo: "G",
  fase: "",
  rubro: "",
  recurso: "",
  clasificador: "",
  meta: "",
  operacion: "",
  documento: "",
  numerodoc: "",
  glosa: "",
  expedsiaf: "",
  certifanual: "",
  siafprov: "",
};

export const ExecutionView = () => {
  const dispatch = useDispatch();
  const [tabSelected, setTabSelected] = useState(TABS[0]);

  // const { filterSearch } = useSelector((state) => state.filterSearch);

  const onClickTab = (tab) => {
    setTabSelected(tab);
  };

  useEffect(() => {
    dispatch(updateFilterSearch(initialFilterSearch));
  }, [dispatch]);

  const TabNavigation = ({ tabs, tabSelected, onClickTab }) => (
    <Nav
      variant="underline"
      defaultActiveKey={`link-${tabs[0]}`}
      className="mt-2"
    >
      {tabs.map((tab, index) => (
        <Nav.Item key={index}>
          <Nav.Link eventKey={`link-${tab}`} onClick={() => onClickTab(tab)}>
            <span
              className={`text-color-default ${
                tab === tabSelected ? "fw-bold" : ""
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
  );

  const TabContent = ({ tabSelected }) => {
    switch (tabSelected) {
      case "General":
        return <ExecutionFilterGeneralView />;
      case "Presupuestal":
        return <ExecutionFilterBudgetaryView />;
      case "Documento":
        return <ExecutionFilterDocumentView />;
      case "SIAF":
        return <ExecutionFilterSIAFView />;
      case "SIGA.NET":
        return <ExecutionFilterSIGAView />;
      default:
        return null;
    }
  };
  console.log("Se renderiza el componente ExecutionView");

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
            <TabNavigation
              tabs={TABS}
              tabSelected={tabSelected}
              onClickTab={onClickTab}
            />
          </div>
          <div className="px-3">
            <TabContent tabSelected={tabSelected} />
          </div>
        </div>
      </div>
      {/* {JSON.stringify(filterSearch)} */}
    </>
  );
};
