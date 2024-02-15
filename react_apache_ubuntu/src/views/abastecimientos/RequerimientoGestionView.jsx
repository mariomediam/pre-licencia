import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, Alert, Form } from "react-bootstrap";

import Header from "../../components/Header";
import { RequeCardOptionComponent } from "../../components/abastecimientos/requerimientos/RequeCardOptionComponent";
import { useState } from "react";

const tipoDeRequerimientos = [
  {
    id: "04",
    descripcion: "Libre de servicios",
    C_biesertipo: "02",
    f_libre: "1",
    pathImage: "/images/requerimientos/libre-servicios.svg",
  },
  {
    id: "03",
    descripcion: "Libre de bienes",
    C_biesertipo: "01",
    f_libre: "1",
    pathImage: "/images/requerimientos/libre-bienes.svg",
  },
  { id: "02", descripcion: "Servicios", C_biesertipo: "02", f_libre: "0", pathImage: "/images/requerimientos/servicios.svg", },
  
  { id: "01", descripcion: "Bienes", C_biesertipo: "01", f_libre: "0", pathImage: "/images/requerimientos/bienes.svg" },
  
  
 
];

export const RequerimientoGestionView = () => {
  const dispatch = useDispatch();

  const { currentReque } = useSelector((state) => state.requerimiento);
  const { n_jefe_nombre, C_sf_dep, n_dependencia } = currentReque;

  const [tipoRequeChecked, setTipoRequeChecked] = useState("04")

  return (
    <>
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
        Elaborar requerimiento de bienes y servicios
      </h3>

      <div className="d-flex justify-content-center px-5 pt-4">
        <div className="col-sm-12 col-lg-10 col-xl-6 p-4 shadow border rounded">
          <small className="text-muted">Unidad orgánica:</small>
          <p className="mb-2">
            {C_sf_dep} - {n_dependencia}
          </p>

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
          <hr />
          <p><small className="mb-2 pb-2">Seleccionar tipo de requerimiento:</small></p>
          <div>
            <Form>
              {tipoDeRequerimientos.map((tipoRequerimiento) => (
                <RequeCardOptionComponent
                  key={tipoRequerimiento.id}
                  tipoRequerimiento={tipoRequerimiento}
                  tipoRequeChecked = {tipoRequeChecked}
                  setTipoRequeChecked = {setTipoRequeChecked}
                />
              ))}
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
