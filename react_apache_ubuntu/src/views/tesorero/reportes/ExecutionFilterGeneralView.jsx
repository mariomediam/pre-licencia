import { FilterPeriodComponent } from "../../../components/tesorero/reports/filters/FilterPeriodComponent";
import { FilterSIAFCycleComponent } from "../../../components/tesorero/reports/filters/FilterSIAFCycleComponent";
import { FilterSIAFPhaseComponent } from "../../../components/tesorero/reports/filters/FilterSIAFPhaseComponent";

export const ExecutionFilterGeneralView = () => {
  return (
    <div className=" d-flex gap-3 flex-wrap animate__animated animate__fadeIn animate__faster">
      <FilterPeriodComponent />
      <div className="flex-grow-1 flex-md-grow-0" style={{ maxWidth: '100%', flexBasis: '250px' }}>
        <FilterSIAFCycleComponent />
      </div>
      <div className="flex-grow-1 flex-md-grow-0" style={{ maxWidth: '100%', flexBasis: '250px' }}>
      <FilterSIAFPhaseComponent />
      </div>
    </div>
  );
};
