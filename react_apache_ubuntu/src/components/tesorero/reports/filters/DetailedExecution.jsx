import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Nav } from "react-bootstrap";
import { DetailedExecutionSIAF } from "./DetailedExecutionSIAF";
import { DetailedExecutionSiganet } from "./DetailedExecutionSiganet";
import Loading from "../../../Loading";

export const DetailedExecution = () => {
  const [tabSelected, setTabSelected] = useState("");
  const [tabSources, setTabSources] = useState([]);

  const { detailedExecution, isLoading } = useSelector(
    (state) => state.sigaNet
  );

  useEffect(() => {
    const tabs = Object.keys(detailedExecution);
    setTabSources(tabs);
    if (tabs.length > 0) {
      setTabSelected(Object.keys(detailedExecution)[0]);
    } else {
      setTabSelected("");
    }
  }, [detailedExecution]);

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
          <Nav.Link eventKey={`link-${tab}`} onClick={() => onClickTab(tab)} className="mb-0 pb-0">
            <span
              className={`text-color-default ${
                tab === tabSelected ? "fw-bold" : ""
              }`}
            >
              {tab.toUpperCase()}
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
      case "siaf":
        return <DetailedExecutionSIAF data={detailedExecution[tabSelected]} />;
      case "siga.net":
        return (
          <DetailedExecutionSiganet data={detailedExecution[tabSelected]} />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="col-12 col-sm-10 animate__animated animate__fadeIn animate__faster">
          <div className="col-12 col-sm-5">
            <TabNavigation
              tabs={tabSources}
              tabSelected={tabSelected}
              onClickTab={onClickTab}
            />
          </div>
          <div className="px-3">
            <TabContent tabSelected={tabSelected} />
          </div>
        </div>
      )}
    </div>
  );
};
