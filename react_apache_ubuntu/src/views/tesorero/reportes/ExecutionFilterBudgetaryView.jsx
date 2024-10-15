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

  const { rubro } = filterSearch;

  const updateRubro = (value) => {
    dispatch(updateFilterSearch({ "rubro": value }));
  }

  console.log("Se renderiza ExecutionFilterBudgetaryView");

  return (
    <div className=" d-flex gap-3 flex-wrap animate__animated animate__fadeIn animate__faster">
      <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "130px" }}
      >
        <FilterSIAFFFComponent value={rubro} setValue={updateRubro}/>
      </div>
      <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "130px" }}
      >
        <FilterSIAFResourceComponent />
      </div>
      <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "180px" }}
      >
        <FilterSIAFClassifierComponent />
      </div>
      <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "130px" }}
      >
        <FilterSIAFGoalComponent />
      </div>
      <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "130px" }}
      >
        <FilterSIAFOperationComponent />
      </div>
    </div>
  );
};
