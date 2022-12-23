import { Routes, Route } from "react-router-dom";
import TrabajadorView from "../views/TrabajadorView";
import PreLicenciaView from "../views/licenciaFuncionamiento/PreLicenciaView";
import PreLicenciaEditView from "../views/licenciaFuncionamiento/PreLicenciaEditView";
import { ViewPdf } from "../utils/ViewPdf";
import { ContribuyentesView } from "../views/contribuyentes/ContribuyentesView";
import { DefaultView } from "../views/DefaultView";

export const DashboardRoutes = () => {
  return (
    <>
      <div>
        <Routes>
          <Route
            path="/inicio"
            element={<DefaultView />}
          />
          <Route
            path="/contribuyente/ver_contribuyente"
            element={<ContribuyentesView />}
          />
          <Route path="/buscar_trabajador" element={<TrabajadorView />} />
          <Route path="/ver_pdf" element={<ViewPdf />} />
          <Route path="/pre_licencia" element={<PreLicenciaView />} />
          <Route
            path="/pre_licencia_ver/:precalId"
            element={<PreLicenciaEditView />}
          />
          {/* <Route path="/contribuyente/ver_contribuyente/:codContribIni" element={<ContribuyentesView />} /> */}
        </Routes>
      </div>
    </>
  );
};
