import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginView from "../views/LoginView";
import { AuthProvider } from "../context/AuthContext";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { MainIndicators } from "../views/managementIndicators/MainIndicators";
import { CurrentPermitDetail } from "../components/managementIndicators/currentPermits/CurrentPermitDetail";
import { AuthorizedVehiclesDetail } from "../components/managementIndicators/authorizedVehicles/AuthorizedVehiclesDetail";
import { TransportationTicketsDetail } from "../components/managementIndicators/transportationTickets/TransportationTicketsDetail";
import { OldVehiclesDetail } from "../components/managementIndicators/oldVehicles/OldVehiclesDetail";
import { OccurrencesTypeDetail } from "../components/managementIndicators/occurrencesType/OccurrencesTypeDetail";
import { OccurrencesTimeDetail } from "../components/managementIndicators/occurrencesTime/OccurrencesTimeDetail";
import { PatrolGoalDetail } from "../components/managementIndicators/patrolGoal/PatrolGoalDetail";
import { AmountsTransitTicketsDetail } from "../components/managementIndicators/amountsTransitTickets/AmountsTransitTicketsDetail";
import { InvestmentProjectsDetail } from "../components/managementIndicators/InvestmentProjects/InvestmentProjectsDetail";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginView />
              </PublicRoute>
            }
          />

          <Route path="/indicadores/">
            <Route path=":tipo/:anio" element={<MainIndicators />} />
            <Route path=":tipo" element={<MainIndicators />} />
            <Route path="" element={<MainIndicators />} />
          </Route>

          {/* <Route path="/indicadores/:anio" element={<MainIndicators />} /> */}
          <Route
            path="/indicadores/autorizaciones-vigentes/:anio"
            element={<CurrentPermitDetail />}
          />
          <Route
            path="/indicadores/autorizaciones-emitidas/:anio"
            element={<AuthorizedVehiclesDetail />}
          />
          <Route
            path="/indicadores/infracciones-transporte/:anio"
            element={<TransportationTicketsDetail />}
          />
          <Route
            path="/indicadores/antiguedad-vehiculos/:anio"
            element={<OldVehiclesDetail />}
          />
          <Route
            path="/indicadores/ocurrencias-tipo/:anio"
            element={<OccurrencesTypeDetail />}
          />
          <Route
            path="/indicadores/ocurrencias-mes/:anio"
            element={<OccurrencesTimeDetail />}
          />
          <Route
            path="/indicadores/patullaje-meta/:anio"
            element={<PatrolGoalDetail />}
          />
          <Route
            path="/indicadores/montos-papeleta/:anio"
            element={<AmountsTransitTicketsDetail />}
          />
          <Route
            path="/indicadores/proyectos-inversion/:anio"
            element={<InvestmentProjectsDetail />}
          />


          <Route
            path="/*"
            element={
              <PrivateRoute>
                <DashboardRoutes />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
