import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { tokenEsValido } = useContext(AuthContext);
  return tokenEsValido() ? children : <Navigate to="/login"/>;
};
