import { useDispatch, useSelector } from "react-redux";

import { FilterSIAFClassifierComponent } from "../../../components/tesorero/reports/filters/FilterSIAFClassifierComponent";
import { FilterSIAFFFComponent } from "../../../components/tesorero/reports/filters/FilterSIAFFFComponent";
import { FilterSIAFGoalComponent } from "../../../components/tesorero/reports/filters/FilterSIAFGoalComponent";
import { FilterSIAFOperationComponent } from "../../../components/tesorero/reports/filters/FilterSIAFOperationComponent";
import { FilterSIAFResourceComponent } from "../../../components/tesorero/reports/filters/FilterSIAFResourceComponent";

import { updateFilterSearch } from "../../../store/slices/helpers/filterSearch/thunks";

export const ExecutionFilterBudgetaryView = () => {
  const dispatch = useDispatch();
  const { filterSearch } = useSelector((state) => state.filterSearch);

  const {
    rubro = "",
    recurso = "",
    clasificador = "",
    meta = "",
    operacion = "",
  } = filterSearch;

  const updateRubro = (value) => {
    dispatch(updateFilterSearch({ rubro: value }));
  };

  const updateRecurso = (value) => {
    dispatch(updateFilterSearch({ recurso: value }));
  };

  const updateClasificador = (value) => {
    dispatch(updateFilterSearch({ clasificador: value }));
  };

  const updateMeta = (value) => {
    dispatch(updateFilterSearch({ meta: value }));
  };

  const updateOperacion = (value) => {
    dispatch(updateFilterSearch({ operacion: value }));
  };

  return (
    <div className=" d-flex gap-3 flex-wrap animate__animated animate__fadeIn animate__faster border">
      <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "130px" }}
      >
        <FilterSIAFFFComponent value={rubro} setValue={updateRubro} />
      </div>
      <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "130px" }}
      >
        <FilterSIAFResourceComponent value={recurso} setValue={updateRecurso} />
      </div>
      <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "180px" }}
      >
        <FilterSIAFClassifierComponent
          value={clasificador}
          setValue={updateClasificador}
        />
      </div>
      <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "130px" }}
      >
        <FilterSIAFGoalComponent value={meta} setValue={updateMeta} />
      </div>
      <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "130px" }}
      >
        <FilterSIAFOperationComponent
          value={operacion}
          setValue={updateOperacion}
        />
      </div>
    </div>
  );
};
