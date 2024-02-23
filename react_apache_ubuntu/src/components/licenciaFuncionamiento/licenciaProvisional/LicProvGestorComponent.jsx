import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { Breadcrumb, Button, CloseButton } from "react-bootstrap";
import Swal from "sweetalert2";

import Header from "../../Header";

import { obtenerLicProvTipo } from "../../../services/licFuncService";
import { LicProvGestorCabComponent } from "./LicProvGestorCabComponent";
import { LicProvGestorTitularComponent } from "./LicProvGestorTitularComponent";
import { LicProvGestorOtrosComponent } from "./LicProvGestorOtrosComponent";
import {
  setCurrentLicProv,
  setResetCurrentLicProv,
  saveCurrentLicProv,
} from "../../../store/slices";
import { Toast } from "../../tools/PopMessage";

export const LicProvGestorComponent = () => {
  const { tipo: tipoStr, accion: accionStr } = useParams();




  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { currentLicProv } = useSelector(
  //   (state) => state.licProv
  // );

  // const [licProvData, setLicProvData] = useState({
  //   licProvExpNro: undefined,
  //   licProvExpAnio: undefined,
  //   licProvTitCod: undefined
  // })

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
    window.history.back();
  };

  const onClicBtnGRabar = async (event) => {
    try {
      event.preventDefault();

      const {licProvNro} = await dispatch(saveCurrentLicProv(accion));
      
      Toast.fire({
        icon: "success",
        title: "Licencia provisional grabada correctamente",
        background: "#F4F6F6",
        timer: 1500,
      });      
      setTimeout(() => {
        navigate(
          `/licencia/provisional/listar/${tipo}/?campo=autoriza&valor=${licProvNro}`
        );
      }, 1500);
    } catch (error) {
      
      Swal.fire({
        icon: "error",
        title: "Error grabando licencia provisional",
        text: JSON.stringify(error?.response?.data?.message),
      });
    }
  };

  useEffect(() => {
    const obtenerTipo = async () => {
      const { licProvNombre, licProvIcon } = await obtenerLicProvTipo(tipo);
      setDatosTipo({ licProvNombre, licProvIcon });
    };
    obtenerTipo();
    if (accion === 1) {
      dispatch(setResetCurrentLicProv());
      dispatch(setCurrentLicProv({ licProvTipo: tipo }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipo, dispatch]);

  useEffect(() => {
    if (accion === 1){
      dispatch(setResetCurrentLicProv());
      dispatch(setCurrentLicProv({ licProvTipo: tipo }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <div className="px-3 mb-0">
        <Breadcrumb>
          <Breadcrumb.Item>Licencias de funcionamiento</Breadcrumb.Item>
          <Breadcrumb.Item href="/licencia/provisional">Autorizaciones provisionales</Breadcrumb.Item>
          <Breadcrumb.Item
            onClick={onClicVolver}
            className="text-decoration-underline "
          >
            
            {datosTipo.licProvNombre}
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

            <div className="d-flex justify-content-center">
              <h3>
                <i className={`${datosTipo.licProvIcon} me-3`}></i>{" "}
                {datosTipo.licProvNombre}{" "}
              </h3>                            
            </div>
            <h6 className="d-flex justify-content-center mb-3">{TITULO_LICENCIA[accion]}</h6>
            

            <LicProvGestorCabComponent accion={accion} />
            <hr />
            <LicProvGestorTitularComponent accion={accion} />
            <hr />
            <LicProvGestorOtrosComponent accion={accion} />
            <hr />
            <div className="d-flex justify-content-center">
              <Button variant="primary" size="lg" onClick={onClicBtnGRabar}>
                Grabar <i className="far fa-save ms-2"></i>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
