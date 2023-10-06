import { useSelector } from "react-redux";

import { LicProvListaItemComponent } from "./LicProvListaItemComponent";
import Loading from "../../Loading";

export const LicProvListaComponent = () => {
  const { licProv, isLoading } = useSelector((state) => state.licProv);

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
        )))}
    </div>
  );
};
