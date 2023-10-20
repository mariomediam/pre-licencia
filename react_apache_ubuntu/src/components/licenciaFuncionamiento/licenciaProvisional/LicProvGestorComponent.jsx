import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, Button, CloseButton } from "react-bootstrap";

import Header from "../../Header";
import { obtenerLicProvTipo } from "../../../services/licFuncService";
import { LicProvGestorCabComponent } from "./LicProvGestorCabComponent";
import { LicProvGestorTitularComponent } from "./LicProvGestorTitularComponent";
import { LicProvGestorOtrosComponent } from "./LicProvGestorOtrosComponent";
import { setCurrentLicProv, setResetCurrentLicProv } from "../../../store/slices";

export const LicProvGestorComponent = () => {
  const { tipo : tipoStr, accion : accionStr} = useParams();

  const dispatch = useDispatch();

  const { currentLicProv } = useSelector(
    (state) => state.licProv
  );
  
  const [licProvData, setLicProvData] = useState({
    C_Exped: undefined,
    C_Exped_Anio: undefined,
    C_LicProv_TitCod: undefined
  })

  const tipo = parseInt(tipoStr);
  const accion = parseInt(accionStr);

  const [datosTipo, setDatosTipo] = useState({
    licProvNombre: "",
    licProvIcon: "",
  });

  const TITULO_LICENCIA = {
    1: "Agregar autorización",
    2: "Modificar autorización",
    3: "Renovar autorización",
  };

  const onClicVolver = (event) => {
    // event.preventDefault();
    // document.startViewTransition(() => {
    //   flushSync(() => {
    //     navigate(`/licencia/provisional`);
    //   });
    // });
  };

  useEffect(() => {
    const obtenerTipo = async () => {
      const { licProvNombre, licProvIcon } = await obtenerLicProvTipo(tipo);
      setDatosTipo({ licProvNombre, licProvIcon });
    };
    obtenerTipo();
    dispatch(setResetCurrentLicProv())
    dispatch(setCurrentLicProv({...currentLicProv, C_LicProv_Tipo: tipo}))

  }, [tipo]);




  return (
    <div>
      <Header />
      <div className="px-3 mb-0">
        <Breadcrumb>
          <Breadcrumb.Item>Licencias de funcionamiento</Breadcrumb.Item>
          <Breadcrumb.Item>Autorizaciones provisionales</Breadcrumb.Item>
          <Breadcrumb.Item
            onClick={onClicVolver}
            className="text-decoration-underline "
          >
            {TITULO_LICENCIA[accion]}
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className="d-flex flex-fill justify-content-center my-5 px-2">
          <div
            className="flex-fill bg-white rounded-3 p-3"
            style={{ maxWidth: "700px" }}
          >
            <div className="d-flex justify-content-end">
              <CloseButton onClick={onClicVolver} />
            </div>

            <div className="d-flex justify-content-center mb-3">
              <h3>
                <i className={`${datosTipo.licProvIcon} me-3`}></i>{" "}
                {datosTipo.licProvNombre}{" "}
              </h3>
            </div>

            <LicProvGestorCabComponent accion={accion} licProvData={licProvData} setLicProvData={setLicProvData}/>
            <hr />
            <LicProvGestorTitularComponent accion={accion} licProvData={licProvData} setLicProvData={setLicProvData}/>
            <hr />
            <LicProvGestorOtrosComponent accion={accion} />
            <hr />
            <div className="d-flex justify-content-center">
            <Button variant="primary" size="lg">
              Grabar <i className="far fa-save ms-2"></i>
            </Button>
              </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
