import Header from "../../components/Header";
import { Breadcrumb } from "react-bootstrap";

export const RequerimientoGestionView = () => {
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

    <div className="d-flex justify-content-center px-5">
      <div className="col-sm-12 col-lg-10 col-xl-6">
        <h1>Hola</h1>
      </div>
    </div>

</>
  )
}
