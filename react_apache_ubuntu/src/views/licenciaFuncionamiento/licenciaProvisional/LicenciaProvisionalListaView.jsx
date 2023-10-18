import { useEffect } from "react";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Breadcrumb } from "react-bootstrap";

import Header from "../../../components/Header";
import { LicProvListaNavComponent } from "../../../components/licenciaFuncionamiento/licenciaProvisional/LicProvListaNavComponent";
import { LicProvListaComponent } from "../../../components/licenciaFuncionamiento/licenciaProvisional/LicProvListaComponent";
import { setResetLicProv } from "../../../store/slices";

export const LicenciaProvisionalListaView = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClicVolver = (event) => {
    event.preventDefault();
    document.startViewTransition(() => {
      flushSync(() => {
        navigate(`/licencia/provisional`);        
      });
    });
  };

  useEffect(() => {
    dispatch(setResetLicProv());
  }, [dispatch])


  return (
    <div>
      <Header />
      <div className="ps-3 mb-0">
        <Breadcrumb>
          <Breadcrumb.Item>Licencias de funcionamiento</Breadcrumb.Item>
          <Breadcrumb.Item onClick={onClicVolver} className="text-decoration-underline ">Autorizaciones provisionales</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="d-flex flex-fill justify-content-center mt-5">
        <div style={{ maxWidth: "1100px" }}>
            <LicProvListaNavComponent />
            <LicProvListaComponent />
        </div>
      </div>
    </div>
  );
};
