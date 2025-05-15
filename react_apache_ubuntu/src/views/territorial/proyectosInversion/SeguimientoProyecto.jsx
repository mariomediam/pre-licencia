import { Breadcrumb } from "react-bootstrap";

import Header from "../../../components/Header";
import ChartHistogramIcon from "../../../icons/ChartHistogramIcon";
// import { GenerarBoletaComponent } from "../../../../components/rrhh";

export const SeguimientoProyecto = () => {
    return (
        <div>
          <Header />
          <div className="ps-3">
            <Breadcrumb>
              <Breadcrumb.Item active>Territorial</Breadcrumb.Item>
              <Breadcrumb.Item active>Proyectos de inversión</Breadcrumb.Item>
            </Breadcrumb>
          </div>
            <hr className="p-0 m-0" />
          <div className="container">
            <div className="row justify-content-center">
              <div
                className="align-items-center p-2 col-sm-12 col-lg-8"
                style={{ border: "0px solid black" }}
              >
                <h3 className="mt-0 text-center">
                  <ChartHistogramIcon className="me-2 mb-1" />
                  Seguimiento de Proyectos de Inversión
                </h3>
              </div>
            </div>
          </div>
          {/* <GenerarBoletaComponent /> */}
        </div>
      );
}
