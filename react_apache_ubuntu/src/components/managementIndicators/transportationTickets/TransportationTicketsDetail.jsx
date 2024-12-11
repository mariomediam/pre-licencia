import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import XIcon from "../../../icons/XIcon";
import { Nav } from "react-bootstrap";
import { TransportationTicketsMonthly } from "./TransportationTicketsMonthly";
import { TransportationTicketsAnual } from "./TransportationTicketsAnual";
// import { AuthorizedVehiclesMonthly } from "./AuthorizedVehiclesMonthly";
// import { AuthorizedVehiclesAnual } from "./AuthorizedVehiclesAnual";

const TABS = ["Evolución mensual", "Comparativo anual"];

export const TransportationTicketsDetail = () => {
  const navigate = useNavigate();
  const [tabSelected, setTabSelected] = useState(TABS[0]);
  const { anio: urlYear } = useParams();

  const onClickTab = (tab) => {
    setTabSelected(tab);
  };

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
              className={`text-dark ${tab === tabSelected ? "fw-bold" : ""}`}
            >
              {tab}
            </span>
            {tabSelected === tab && (
              <hr
                className="mt-0 pt-0 rounded text-dark"
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
      case "Evolución mensual":
        return <TransportationTicketsMonthly />;

      case "Comparativo anual":
        return <TransportationTicketsAnual />;

      default:
        return null;
    }
  };

  const onClickClose = () => {
    navigate(-1);
  };

  return (
    <div className="p-3">
      <header className="d-flex justify-content-between">
        <div className="d-flex gap-0">
          <div className="m-0 p-0">
            <p className="m-0 p-0 fs-5 fw-bold">Indicadores de gestión</p>
            <p
              className="p-0"
              style={{ marginTop: "-5px", marginBottom: "0px" }}
            >
              {`Transportes / Infracciones de transportes ${urlYear}`}
            </p>
          </div>
        </div>

        <div
          className="d-flex align-items-center gap-2 "
          role="button"
          onClick={onClickClose}
        >
          <XIcon className="cursor-pointer" />
        </div>
      </header>
      <main>
        <div>
          <TabNavigation
            tabs={TABS}
            tabSelected={tabSelected}
            onClickTab={onClickTab}
          />
        </div>
        <div className="px-3">
          <TabContent tabSelected={tabSelected} />
        </div>
      </main>
    </div>
  );
};
