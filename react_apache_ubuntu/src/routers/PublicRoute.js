import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
  const { tokenEsValido } = useContext(AuthContext);
  return tokenEsValido() ? <Navigate to="/inicio"/> : children ;
};
