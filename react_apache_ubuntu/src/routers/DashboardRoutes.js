import { Routes, Route } from "react-router-dom";
import TrabajadorView from "../views/TrabajadorView";
import PreLicenciaView from "../views/licenciaFuncionamiento/PreLicenciaView";
import PreLicenciaEditView from "../views/licenciaFuncionamiento/PreLicenciaEditView";
import { ViewPdf } from "../utils/ViewPdf";

export const DashboardRoutes = () => {
  return (
    <>
      <div className="container">        
        <Routes>
          <Route path="/buscar_trabajador" element={<TrabajadorView />} />
          <Route path="/ver_pdf" element={<ViewPdf />} />
          <Route path="/pre_licencia" element={<PreLicenciaView />} />
          <Route
            path="/pre_licencia_ver/:precalId"
            element={<PreLicenciaEditView />}
          />
        </Routes>
      </div>
    </>
  );
};
