import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import TrabajadorView from "./views/TrabajadorView";
import { AuthProvider } from "./context/AuthContext";
import PreLicenciaView from "./views/licenciaFuncionamiento/PreLicenciaView";

export default function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/buscar_trabajador" element={<TrabajadorView />} />        
          <Route path="/pre_licencia" element={<PreLicenciaView />} />
        </Routes>          
      </AuthProvider>
    </BrowserRouter>
  );
}
