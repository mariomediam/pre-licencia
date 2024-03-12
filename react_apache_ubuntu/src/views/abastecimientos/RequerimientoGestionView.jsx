import { useSelector } from "react-redux";
import { Breadcrumb, Alert } from "react-bootstrap";

import Header from "../../components/Header";
import { RequeElaboraComponent } from "../../components/abastecimientos/requerimientos/RequeElaboraComponent";


export const RequerimientoGestionView = () => {

  const { currentReque } = useSelector((state) => state.requerimiento);
  const { n_jefe_nombre, C_sf_dep, n_dependencia } = currentReque;

  console.log("14")

  return (
    <div className="" >
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

      <div className="d-flex justify-content-center px-5 pt-4"  >
        <div className="col-sm-12 col-lg-10 col-xl-6 p-4 shadow border rounded" >
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
          
          <div>
            <RequeElaboraComponent />            
          </div>
        </div>
      </div>
    </div>
  );
};
