import { FillterNumberExped } from "../../../components/tesorero/reports/filters/FillterNumberExped"
import { FilterSIAFCertificateComponent } from "../../../components/tesorero/reports/filters/FilterSIAFCertificateComponent"
import { FilterSIAFCurrentAccountComponent } from "../../../components/tesorero/reports/filters/FilterSIAFCurrentAccountComponent"
import { FilterSIAFProviderComponent } from "../../../components/tesorero/reports/filters/FilterSIAFProviderComponent"


export const ExecutionFilterSIAFView = () => {
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
        <FilterSIAFCertificateComponent />
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
