import { useDispatch, useSelector } from "react-redux";

import { FilterPeriodComponent } from "../../../components/tesorero/reports/filters/FilterPeriodComponent";
import { FilterSIAFCycleComponent } from "../../../components/tesorero/reports/filters/FilterSIAFCycleComponent";
import { FilterSIAFPhaseComponent } from "../../../components/tesorero/reports/filters/FilterSIAFPhaseComponent";

import { updateFilterSearch } from "../../../store/slices/helpers/filterSearch/thunks";

export const ExecutionFilterGeneralView = () => {
  const dispatch = useDispatch();
  const { filterSearch } = useSelector((state) => state.filterSearch);

  const { periodo = [], ciclo = "", fase = "" } = filterSearch;

  const updatePeriodo = (value) => {
    dispatch(updateFilterSearch({ periodo: value }));
  };

  const updateCiclo = (value) => {
    dispatch(updateFilterSearch({ ciclo: value, fase: "" }));
    
  };
  const updateFase = (value) => {
    dispatch(updateFilterSearch({ fase: value }));
  }

  
  return (
    <div className=" d-flex gap-3 flex-wrap animate__animated animate__fadeIn animate__faster">
      <FilterPeriodComponent value={periodo} setValue={updatePeriodo} />

      <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "250px" }}
      >
        <FilterSIAFCycleComponent value={ciclo} setValue={updateCiclo} />
      </div>
      <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "250px" }}
      >
        <FilterSIAFPhaseComponent value={fase} setValue={updateFase} cycle={ciclo} />
      </div>
    </div>
  );
};
