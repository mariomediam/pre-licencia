import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useParams } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";

import Header from "../../../components/Header";
import { setCurrentLicProvUbica } from "../../../store/slices";
import { obtenerLicProvTipo } from "../../../services/licFuncService";
import { UbicacionListaComponent } from "../../../components/licenciaFuncionamiento/licenciaProvisional/UbicacionListaComponent";

export const UbicacionView = () => {
  const dispatch = useDispatch();

  const [datosTipo, setDatosTipo] = useState({
    licProvNombre: "",
    licProvIcon: "",
  });

  

  const { tipo: tipoStr } = useParams();
  const tipo = parseInt(tipoStr);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onClicVolver = (event) => {
    window.history.back();
  };

  const onClicAgregar = (event) => {
    dispatch(
      setCurrentLicProvUbica({
        ubicaOrden: 0,
        ubicaCodigo: "",
        ubicaDescrip: "",
        ubicaUTMNorte: "",
        ubicaUTMEste: "",
        ubicaLogin: "",
        ubicaDigitFecha: Date.now(),
        ubicaDigitPC: "",
        licProvTipo: tipo,
      })
    );
    handleShow();
  };

  useEffect(() => {
    const obtenerTipo = async () => {
      const { licProvNombre, licProvIcon } = await obtenerLicProvTipo(tipo);
      setDatosTipo({ licProvNombre, licProvIcon });
    };
    obtenerTipo();
  }, [tipo]);

  return (
    <div>
      <Header />
      <div className="px-3 mb-0">
        <Breadcrumb>
          <Breadcrumb.Item>Licencias de funcionamiento</Breadcrumb.Item>
          <Breadcrumb.Item
            href="/licencia/provisional"
            className="text-decoration-none"
          >
            Autorizaciones provisionales
          </Breadcrumb.Item>
          <Breadcrumb.Item
            onClick={onClicVolver}
            className="text-decoration-none "
          >
            <i className={`${datosTipo.licProvIcon}`}></i>{" "}
            {datosTipo.licProvNombre}
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <h4 className="mt-4 mb-3 text-center">
        <i className="fas fa-map-marker-alt me-2"></i>
        {`Ubicaciones para ${datosTipo.licProvNombre}`}
      </h4>

      <div className="d-flex flex-fill justify-content-center mt-2">
        <UbicacionListaComponent
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
        />

        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", right: "0px", width: "70px" }}>
            <div style={{ position: "fixed", bottom: "25px" }}>
              <button
                className="btn btn-primary rounded-circle"
                style={{ width: "70px", height: "70px" }}
                title="Agregar ubicación"
                onClick={onClicAgregar}
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
