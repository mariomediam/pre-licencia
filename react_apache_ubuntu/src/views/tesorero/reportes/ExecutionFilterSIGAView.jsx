import { FillterNumberExped } from "../../../components/tesorero/reports/filters/FillterNumberExped";
import { FilterSIGAAccountingPLanComponent } from "../../../components/tesorero/reports/filters/FilterSIGAAccountingPLanComponent";
import { FilterSIGAPreCommitmentComponent } from "../../../components/tesorero/reports/filters/FilterSIGAPreCommitmentComponent";
import { FilterSIGAProviderComponent } from "../../../components/tesorero/reports/filters/FilterSIGAProviderComponent";

export const ExecutionFilterSIGAView = () => {
  return (
    <>
      <div className=" d-flex gap-3 flex-wrap mt-2 animate__animated animate__fadeIn animate__faster">
        <div
          className="flex-grow-1 flex-md-grow-0"
          style={{ maxWidth: "100%", flexBasis: "140px" }}
        >
          <FillterNumberExped />
        </div>
        <div
          className="flex-grow-1 flex-md-grow-0"
          style={{ maxWidth: "100%", flexBasis: "140px" }}
        >
          <FilterSIGAPreCommitmentComponent />
        </div>
        <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "450px" }}
      >
        <FilterSIGAProviderComponent />
      </div>
      <div
          className="flex-grow-1 flex-md-grow-0"
          style={{ maxWidth: "100%", flexBasis: "140px" }}
        >
          <FilterSIGAAccountingPLanComponent />
        </div>
      </div>

      <small className="text-color-default fw-light mt-0">
        Estos filtros solo se aplican a la información registrada en SIGA
      </small>
    </>
  );
};
