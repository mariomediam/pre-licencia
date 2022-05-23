import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { tokenEsValido } = useContext(AuthContext);
//   let logueado = false;

//   const usuarioLoqueado = () => {
//     console.log("Ejecutandose usuarioLoqueado()");
//     logueado = tokenEsValido();
//     console.log("logueado");
//     console.log(logueado);
//     return logueado;
//   };

//   logueado = usuarioLoqueado(); 

//   console.log("logueado")
//   console.log(logueado)
//   console.log("returnnnn")

//   return logueado ? children : <Navigate to="/login"/>;
  return tokenEsValido() ? children : <Navigate to="/login"/>;
};
