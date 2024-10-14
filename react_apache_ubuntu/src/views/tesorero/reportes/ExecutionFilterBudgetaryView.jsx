import { FilterSIAFClassifierComponent } from "../../../components/tesorero/reports/filters/FilterSIAFClassifierComponent";
import { FilterSIAFFFComponent } from "../../../components/tesorero/reports/filters/FilterSIAFFFComponent";
import { FilterSIAFGoalComponent } from "../../../components/tesorero/reports/filters/FilterSIAFGoalComponent";
import { FilterSIAFOperationComponent } from "../../../components/tesorero/reports/filters/FilterSIAFOperationComponent";
import { FilterSIAFResourceComponent } from "../../../components/tesorero/reports/filters/FilterSIAFResourceComponent";

export const ExecutionFilterBudgetaryView = () => {
  return (
    <div className=" d-flex gap-3 flex-wrap animate__animated animate__fadeIn animate__faster">
      <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "130px" }}
      >
        <FilterSIAFFFComponent />
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
