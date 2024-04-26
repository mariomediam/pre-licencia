import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Breadcrumb, Alert, CloseButton } from "react-bootstrap";

import Header from "../../components/Header";
import { RequeElaboraComponent } from "../../components/abastecimientos/requerimientos/RequeElaboraComponent";
import { tipoDeRequerimientos } from "../../utils/varios";
import { RequeComprometeComponent } from "../../components/abastecimientos/requerimientos/RequeComprometeComponent";

export const RequerimientoGestionView = () => {
  const navigate = useNavigate();

  const { currentReque } = useSelector((state) => state.requerimiento);
  const {
    n_jefe_nombre,
    C_anipre,
    C_sf_dep,
    n_dependencia,
    C_biesertipo,
    f_libre,
    accion,
    C_reque,
    tipo_dependencia,
  } = currentReque;

  const [titleForm, setTitleForm] = useState(
    "Elaborar requerimiento de bienes y servicios"
  );

  const onClicVolver = (event) => {
    navigate(
      `/abastecimientos/requerimientos?anio=${C_anipre}&depend=${C_sf_dep}`
    );
  };

  useEffect(() => {
    const tipoRequerimientoSelected = tipoDeRequerimientos.find(
      (tipoRequerimiento) => {
        return (
          tipoRequerimiento.C_biesertipo === C_biesertipo &&
          tipoRequerimiento.f_libre === f_libre
        );
      }
    );

    if (tipoRequerimientoSelected) {
      let title = "";

      if (accion === "NUEVO") {
        title += "Elaborar requerimiento ";
      }

      if (accion === "EDITAR") {
        title += "Modificar requerimiento ";
      }

      if (accion === "PRECOMPROMETER") {
        title += "Precomprometer requerimiento ";
      }

      if (f_libre === "0") {
        title += "de ";
      }

      title += tipoRequerimientoSelected.descripcion.toString().toLowerCase();

      if (accion === "EDITAR" || accion === "PRECOMPROMETER") {
        title += ` ${C_reque}-${C_anipre}`;
      }

      setTitleForm(title);
    }
  }, [C_biesertipo, f_libre, accion, C_reque, C_anipre]);

  return (
    <div className="">
      <Header />
      <div className="ps-3 mb-0">
        <Breadcrumb>
          <Breadcrumb.Item active>Requerimientos</Breadcrumb.Item>
          <Breadcrumb.Item active>Elaborar requerimiento</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <hr />

      <h3 className="mt-0 mb-3 text-center">
        <i className="fas fa-box-open me-3"></i>
        {titleForm}
      </h3>

      <div className="d-flex justify-content-center px-5 pt-4">
        <div className="col-sm-12 col-lg-10 col-xl-6 p-4 shadow border rounded">
          <div className="d-flex justify-content-between ">
            <small className="text-muted">Unidad orgánica:</small>
            <CloseButton onClick={onClicVolver} />
          </div>
          <p className="mb-2">
            {C_sf_dep} - {n_dependencia}
          </p>

          {tipo_dependencia === 0 && (
            <>
              <small className="text-muted">Encargado:</small>

              {n_jefe_nombre && n_jefe_nombre.trim().length > 0 ? (
                <p>{n_jefe_nombre}</p>
              ) : (
                <Alert variant="danger">
                  <small>
                    No se encontro el jefe de dependencia, por favor contacte la
                    Oficina de Procesos Técnicos y Bienestar Social
                  </small>
                </Alert>
              )}
            </>
          )}

          <hr />

          <div>
            {accion !== "PRECOMPROMETER" ? (
              <RequeElaboraComponent />
            ) : (
              <RequeComprometeComponent />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
