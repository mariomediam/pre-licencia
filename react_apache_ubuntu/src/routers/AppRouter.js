import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginView from "../views/LoginView";
import { AuthProvider } from "../context/AuthContext";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { MainIndicators } from "../views/managementIndicators/MainIndicators";
import { CurrentPermitDetail } from "../components/managementIndicators/currentPermits/CurrentPermitDetail";

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
            <Route path=":anio" element={<MainIndicators />} />
            <Route path="" element={<MainIndicators />} />
          </Route>

          {/* <Route path="/indicadores/:anio" element={<MainIndicators />} /> */}
          <Route
            path="/indicadores/autorizaciones-vigentes/:anio"
            element={<CurrentPermitDetail />}
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
