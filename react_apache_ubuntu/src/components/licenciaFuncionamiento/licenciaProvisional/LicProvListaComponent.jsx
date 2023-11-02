import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { LicProvListaItemComponent } from "./LicProvListaItemComponent";
import Loading from "../../Loading";
import { AlertStartSearch } from "../../tools/AlertStartSearch";
import { AlertNotFound } from "../../tools/AlertNotFound";

export const LicProvListaComponent = () => {
  const { licProv, isLoading } = useSelector((state) => state.licProv);

  const [searchParams] = useSearchParams();

  return (
    <div className="p-5">
      {isLoading ? (
        <Loading />
      ) : (
        licProv.map((lic) => (
          <LicProvListaItemComponent
            key={`${lic.C_LicProv_Tipo}-${lic.M_LicProv_Nro}`}
            lic={lic}
          />
        ))
      )}

      {licProv.length === 0 && (
        <div className="d-flex justify-content-center">
          <div className="col-sm-12 col-md-4 ">
            {searchParams.size === 0 ? <AlertStartSearch /> : <AlertNotFound />}
          </div>
        </div>
      )}
    </div>
  );
};
