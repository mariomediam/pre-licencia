import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { LicProvListaItemComponent } from "./LicProvListaItemComponent";
import Loading from "../../Loading";
import { AlertStartSearch } from "../../tools/AlertStartSearch";
import { AlertNotFound } from "../../tools/AlertNotFound";

export const LicProvListaComponent = () => {
  const navigate = useNavigate();

  const { licProv, isLoading } = useSelector((state) => state.licProv);
  const { tipo } = useParams();

  const [searchParams] = useSearchParams();

  const onClicAgregar = (event) => {
    event.preventDefault();
    navigate(`/licencia/provisional/gestionar/${tipo}/1`);
  };

  return (
    <div className="p-5">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {licProv.map((lic) => (
            <LicProvListaItemComponent
              key={`${lic.C_LicProv_Tipo}-${lic.M_LicProv_Nro}`}
              lic={lic}
            />
          ))}
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", right: "0px", width: "70px" }}>
              <div style={{ position: "fixed", bottom: "25px" }}>
                <button
                  className="btn btn-primary rounded-circle"
                  style={{ width: "70px", height: "70px" }}
                  title="Agregar autorización"
                  onClick={onClicAgregar}
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </>
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
