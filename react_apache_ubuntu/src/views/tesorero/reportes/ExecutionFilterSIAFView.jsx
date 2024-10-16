import { useDispatch, useSelector } from "react-redux";

import { FillterNumberExped } from "../../../components/tesorero/reports/filters/FillterNumberExped"
import { FilterSIAFCertificateComponent } from "../../../components/tesorero/reports/filters/FilterSIAFCertificateComponent"
import { FilterSIAFCurrentAccountComponent } from "../../../components/tesorero/reports/filters/FilterSIAFCurrentAccountComponent"
import { FilterSIAFProviderComponent } from "../../../components/tesorero/reports/filters/FilterSIAFProviderComponent"

import { updateFilterSearch } from "../../../store/slices/helpers/filterSearch/thunks";

export const ExecutionFilterSIAFView = () => {

  const dispatch = useDispatch();
  const { filterSearch } = useSelector((state) => state.filterSearch);

  const { expedsiaf = "", certifanual = "" } = filterSearch;

  const updateExpedSIAF = (value) => {
    dispatch(updateFilterSearch({ expedsiaf: value }));
  }

  const updateCertifAnual = (value) => {
    dispatch(updateFilterSearch({ certifanual: value }));
  }


  return (
    <>
    
    <div className=" d-flex gap-3 flex-wrap mt-2 animate__animated animate__fadeIn animate__faster">
      <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "140px" }}
      >
        <FillterNumberExped value={expedsiaf} setValue={updateExpedSIAF} />
      </div>

      <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "140px" }}
      >
        <FilterSIAFCertificateComponent value={certifanual} setValue={updateCertifAnual} />
      </div>

      <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "450px" }}
      >
        <FilterSIAFProviderComponent />
      </div>

      <div
        className="flex-grow-1 flex-md-grow-0"
        style={{ maxWidth: "100%", flexBasis: "140px" }}
      >
        <FilterSIAFCurrentAccountComponent />
      </div>
      
      
    </div>
    <small className="text-color-default fw-light mt-0">Estos filtros solo se aplican a la información registrada en SIAF</small>
    </>
  )
}
