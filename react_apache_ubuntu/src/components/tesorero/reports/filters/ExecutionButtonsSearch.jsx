import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

import XIcon from "../../../../icons/XIcon";
import SearchIcon from "../../../../icons/SearchIcon";
import { updateFilterSearch } from "../../../../store/slices/helpers/filterSearch/thunks";

export const ExecutionButtonsSearch = () => {
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

  const onClickOption1 = () => {
    alert("Option 1");
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
          <li>
            <button className="dropdown-item" onClick={onClickOption1}>
              SIAF
            </button>
          </li>
          <li>
            <button className="dropdown-item" onClick={onClickOption1}>
              SIGA.NET
            </button>
          </li>
          <li>
            <button className="dropdown-item" onClick={onClickOption1}>
              SIAF y SIGA.NET
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
