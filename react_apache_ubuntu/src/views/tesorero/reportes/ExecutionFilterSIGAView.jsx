import { useDispatch, useSelector } from "react-redux";

import { FillterNumberExped } from "../../../components/tesorero/reports/filters/FillterNumberExped";
import { FilterSIGAAccountingPLanComponent } from "../../../components/tesorero/reports/filters/FilterSIGAAccountingPLanComponent";
import { FilterSIGAPreCommitmentComponent } from "../../../components/tesorero/reports/filters/FilterSIGAPreCommitmentComponent";
import { FilterSIGAProviderComponent } from "../../../components/tesorero/reports/filters/FilterSIGAProviderComponent";

import { updateFilterSearch } from "../../../store/slices/helpers/filterSearch/thunks";

export const ExecutionFilterSIGAView = () => {

  const dispatch = useDispatch();
  const { filterSearch } = useSelector((state) => state.filterSearch);

  const { sigaexped = "", sigaprecomp = "", sigaprov = "", sigaplancont = "" } = filterSearch;

  const updateSigaExped = (value) => {
    dispatch(updateFilterSearch({ sigaexped: value }));
  }

  const updateSigaPrecomp = (value) => {
    dispatch(updateFilterSearch({ sigaprecomp: value }));
  }

  const updateSigaProv = (value) => {
    dispatch(updateFilterSearch({ sigaprov: value }));
  }

  const updateSigaPlanCont = (value) => {
    dispatch(updateFilterSearch({ sigaplancont: value }));
  }

  return (
    <>
      <div className=" d-flex gap-3 flex-wrap mt-2 animate__animated animate__fadeIn animate__faster">
        <div
          className="flex-grow-1 flex-md-grow-0"
          style={{ maxWidth: "100%", flexBasis: "140px" }}
        >
          <FillterNumberExped value={sigaexped} setValue={updateSigaExped} />
        </div>
        <div
          className="flex-grow-1 flex-md-grow-0"
          style={{ maxWidth: "100%", flexBasis: "140px" }}
        >
          <FilterSIGAPreCommitmentComponent value={sigaprecomp} setValue={updateSigaPrecomp} />
        </div>
        <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "450px" }}
      >
        <FilterSIGAProviderComponent  value={sigaprov} setValue={updateSigaProv}/>
      </div>
      <div
          className="flex-grow-1 flex-md-grow-0"
          style={{ maxWidth: "100%", flexBasis: "140px" }}
        >
          <FilterSIGAAccountingPLanComponent value={sigaplancont} setValue={updateSigaPlanCont}/>
        </div>
      </div>

      <small className="text-color-default fw-light mt-0">
        Estos filtros solo se aplican a la información registrada en SIGA
      </small>
    </>
  );
};
