import { Routes, Route } from "react-router-dom";
import TrabajadorView from "../views/TrabajadorView";
import PreLicenciaView from "../views/licenciaFuncionamiento/PreLicenciaView";
import PreLicenciaEditView from "../views/licenciaFuncionamiento/PreLicenciaEditView";
import { ViewPdf } from "../utils/ViewPdf";
import { ContribuyentesView } from "../views/contribuyentes/ContribuyentesView";
import { DefaultView } from "../views/DefaultView";
import { SolicitudCiiuView } from "../views/licenciaFuncionamiento/SolicitudCiiuView";
import {
  DetallePlanillaView,
  GenerarBoletaView,
  EnviarBoletaView,
  SelectDestinarioView,
} from "../views/rrhh";
import { BoletasEnviadasView } from "../views/rrhh/remuneraciones/boletas/BoletasEnviadasView";
import { TrabajadorCorreoView } from "../views/rrhh/remuneraciones/boletas/TrabajadorCorreoView";
import { LicenciaProvisionalView } from "../views/licenciaFuncionamiento/licenciaProvisional/LicenciaProvisionalView";
import { LicenciaProvisionalListaView } from "../views/licenciaFuncionamiento/licenciaProvisional/LicenciaProvisionalListaView";
import { LicProvGestorComponent } from "../components/licenciaFuncionamiento/licenciaProvisional/LicProvGestorComponent";
import { UbicacionView } from "../views/licenciaFuncionamiento/licenciaProvisional/UbicacionView";
import { RequerimientosView } from "../views/abastecimientos/RequerimientosView";
import { RequerimientoGestionView } from "../views/abastecimientos/RequerimientoGestionView";
import { TributoArchivoView } from "../views/tesorero/TributoArchivoView";
import { TributoArchivoContribView } from "../views/tesorero/TributoArchivoContribView";
import { TributoArchivoReporteView } from "../views/tesorero/TributoArchivoReporteView";
import { TributoArchivoConciliaView } from "../views/tesorero/TributoArchivoConciliaView";
import { ExecutionView } from "../views/tesorero/reportes/ExecutionView";
import { AccrualFormatView } from "../views/tesorero/reportes/AccrualFormatView";
import { TrustFormatView } from "../views/tesorero/reportes/TrustFormatView";
import { SeguimientoProyecto } from "../views/territorial/proyectosInversion/SeguimientoProyecto";
import { ProyectoAgregar } from "../views/territorial/proyectosInversion/ProyectoAgregar";
import { ProyectoEditar } from "../views/territorial/proyectosInversion/ProyectoEditar";
import { DashboardProyectos } from "../views/territorial/proyectosInversion/DashboardProyectos";
import { SincronizaGastoDiario } from "../views/territorial/proyectosInversion/SincronizaGastoDiario";

export const DashboardRoutes = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/inicio" element={<DefaultView />} />
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
          <Route
            path="/solicitud/agregar_ciiu"
            element={<SolicitudCiiuView />}
          />
          <Route path="/rrhh/remuneraciones/generar_boleta/">
            <Route path=":anio/:mes" element={<GenerarBoletaView />} />
            <Route path="" element={<GenerarBoletaView />} />
          </Route>
          <Route
            path="/rrhh/remuneraciones/detalle_planilla/:anio/:mes/:tipo/:numero"
            element={<DetallePlanillaView />}
          />
          <Route path="/rrhh/remuneraciones/enviar_boleta/">
            <Route path=":anio/:mes" element={<EnviarBoletaView />} />
            <Route path="" element={<EnviarBoletaView />} />
          </Route>
          <Route
            path="/rrhh/remuneraciones/select_destinatario/:anio/:mes/:tipo/:numero"
            element={<SelectDestinarioView />}
          />
          <Route
            path="/rrhh/remuneraciones/boletas_enviadas/:anio/:mes/:tipo/:numero"
            element={<BoletasEnviadasView />}
          />
          <Route
            path="/rrhh/remuneraciones/correos_colaborador"
            element={<TrabajadorCorreoView />}
          />
          <Route
            path="/licencia/provisional"
            element={<LicenciaProvisionalView />}
          />
          <Route
            path="/licencia/provisional/listar/:tipo"
            element={<LicenciaProvisionalListaView />}
          />
          <Route path="/licencia/provisional/gestionar/:tipo/">
            <Route path=":accion" element={<LicProvGestorComponent />} />
            <Route path="" element={<LicProvGestorComponent />} />
          </Route>
          <Route
            path="/licencia/provisional/ubica-listar/:tipo"
            element={<UbicacionView />}
          />
          <Route
            path="/abastecimientos/requerimientos"
            element={<RequerimientosView />}
          />
          <Route
            path="/abastecimientos/requerimiento/gestionar"
            element={<RequerimientoGestionView />}
          />
          <Route
            path="/tesorero/tributo/archivo"
            element={<TributoArchivoView />}
          />
          <Route
            path="/tesorero/tributo/contribuyente"
            element={<TributoArchivoContribView />}
          />
          <Route
            path="/tesorero/tributo/reporte"
            element={<TributoArchivoReporteView />}
          />
          <Route
            path="/tesorero/tributo/concilia"
            element={<TributoArchivoConciliaView />}
          />
           <Route 
            path="/tesorero/reportes/ejecucion"
            element={<ExecutionView />}
           />
           <Route
           path="/tesorero/reportes/accrual-format"
           element={<AccrualFormatView />}
          />
           <Route
           path="/tesorero/reportes/trust-format"
           element={<TrustFormatView />}
          />
          <Route path="/territorial/seguimiento-inversion/">
            <Route index element={<SeguimientoProyecto />} />
            <Route path=":anio/:mes" element={<SeguimientoProyecto />} />
          </Route>
          <Route
            path="/territorial/proyectos-inversion/agregar/:ano_eje/:cui"
            element={<ProyectoAgregar />}
          />
           <Route
           path="/territorial/proyectos-inversion/editar/:c_prgpro"
           element={<ProyectoEditar />}
          />
         
          <Route path="/territorial/proyectos-inversion/dashboard">
            <Route index element={<DashboardProyectos />} />
            <Route path=":anio" element={<DashboardProyectos />} />
          </Route>
          <Route
           path="/territorial/proyectos-inversion/sincroniza-gasto-diario"
           element={<SincronizaGastoDiario />}
          />
        </Routes>

      </div>
    </>
  );
};
