import { useDispatch, useSelector } from "react-redux";

import { FillterNumberExped } from "../../../components/tesorero/reports/filters/FillterNumberExped"
import { FilterSIAFCertificateComponent } from "../../../components/tesorero/reports/filters/FilterSIAFCertificateComponent"
import { FilterSIAFCurrentAccountComponent } from "../../../components/tesorero/reports/filters/FilterSIAFCurrentAccountComponent"
import { FilterSIAFProviderComponent } from "../../../components/tesorero/reports/filters/FilterSIAFProviderComponent"

import { updateFilterSearch } from "../../../store/slices/helpers/filterSearch/thunks";

export const ExecutionFilterSIAFView = () => {

  const dispatch = useDispatch();
  const { filterSearch } = useSelector((state) => state.filterSearch);

  const { siafexped = "", siafcertifanual = "", siafprov = "", siafctacte = "" } = filterSearch;

  const updatesiafexped = (value) => {
    dispatch(updateFilterSearch({ siafexped: value }));
  }

  const updatesiafcertifanual = (value) => {
    dispatch(updateFilterSearch({ siafcertifanual: value }));
  }

  const updateSiafProv = (value) => {
    dispatch(updateFilterSearch({ siafprov: value }));
  }

  const updateSiafCtaCte = (value) => {
    dispatch(updateFilterSearch({ siafctacte: value }));
  }


  return (
    <>
    
    <div className=" d-flex gap-3 flex-wrap mt-2 animate__animated animate__fadeIn animate__faster">
      <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "140px" }}
      >
        <FillterNumberExped value={siafexped} setValue={updatesiafexped} />
      </div>

      <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "140px" }}
      >
        <FilterSIAFCertificateComponent value={siafcertifanual} setValue={updatesiafcertifanual} />
      </div>

      <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "450px" }}
      >
        <FilterSIAFProviderComponent value={siafprov} setValue={updateSiafProv} />
      </div>

      <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "140px" }}
      >
        <FilterSIAFCurrentAccountComponent value={siafctacte} setValue={updateSiafCtaCte}/>
      </div>
      
      
    </div>
    <small className="text-color-default fw-light mt-0">Estos filtros solo se aplican a la información registrada en SIAF</small>
    </>
  )
}
