import { FilterPeriodComponent } from "../../../components/tesorero/reports/filters/FilterPeriodComponent";
import { FilterSIAFCycleComponent } from "../../../components/tesorero/reports/filters/FilterSIAFCycleComponent";
import { FilterSIAFPhaseComponent } from "../../../components/tesorero/reports/filters/FilterSIAFPhaseComponent";

export const EjecucionFilterGeneralView = () => {
  return (
    <div className="d-flex gap-3 flex-wrap">
      <FilterPeriodComponent />
      <FilterSIAFCycleComponent />
      <FilterSIAFPhaseComponent />
    </div>
  );
};
