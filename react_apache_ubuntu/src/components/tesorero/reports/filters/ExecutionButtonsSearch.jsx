import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";

import XIcon from "../../../../icons/XIcon";
import SearchIcon from "../../../../icons/SearchIcon";
import { updateFilterSearch } from "../../../../store/slices/helpers/filterSearch/thunks";
import { getDetailedExecution } from "../../../../store/slices/sigaNet/thunks";

export const ExecutionButtonsSearch = () => {
  const SEARCH_SOURCES = {
    "SIAF": ["siaf"],
    "SIGA.NET": ["siga.net"],
    "SIAF y SIGA.NET": ["siaf", "siga.net"]
  }

  const { filterSearch } = useSelector((state) => state.filterSearch);



  const firstDay = new Date(new Date().getFullYear(), 0, 1)
    .toISOString()
    .split("T")[0];
  const currentDate = new Date().toISOString().split("T")[0];

  const initialValue = {
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
    siafexped: "",
    siafcertifanual: "",
    siafprov: "",
    siafctacte: "",
    sigaexped: "",
    sigaprecomp: "",
    sigaprov: "",
    sigaplancont: "",
  };

  const dispatch = useDispatch();

  const clearValues = () => {
    dispatch(updateFilterSearch(initialValue));
  };

  const getFiltersWithValues = () => {
    let filtersWithValues = {}
    let filters = Object.keys(filterSearch)
    for (let key of filters) {
      if (filterSearch[key] !== "") {
        filtersWithValues[key] = filterSearch[key];
      }
    }

    const [desde = "", hasta = ""] = filterSearch.periodo;
    filtersWithValues.desde = desde;
    filtersWithValues.hasta = hasta;
    delete filtersWithValues.periodo;

    return filtersWithValues;
  }


  const onClickOption1 = async (sources) => {
    console.log("01")
   
    let filtersWithValues = getFiltersWithValues();
    filtersWithValues.sources = sources;
    alert(JSON.stringify(filtersWithValues));

    await dispatch(getDetailedExecution(filtersWithValues));
    console.log("11")
    
  };

  return (
    <div className="d-flex gap-2">
      {" "}
      <Button variant="outline-secondary" onClick={clearValues}>
        <div className="d-flex align-items-center">
          <XIcon /> <span>Limpiar</span>
        </div>
      </Button>{" "}
      <div className="dropdown">
        <button
          className="btn btn-primary dropdown-toggle d-flex align-items-center"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <SearchIcon className="me-1" /> <span className="me-1">Buscar</span>
        </button>
        <ul className="dropdown-menu">          
          {Object.keys(SEARCH_SOURCES).map((key) => (
            <li key={key}>
              <button
                className="dropdown-item"
                onClick={() => onClickOption1(SEARCH_SOURCES[key])}
              >
                {key}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
