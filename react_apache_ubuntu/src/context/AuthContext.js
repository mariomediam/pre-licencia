import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { obtenerUserMenues, obtenerMenues } from "../services/usuarioService";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [userName, setUserName] = useState(() =>
  localStorage.getItem("authTokens")
    ? jwt_decode(
      JSON.parse(localStorage.getItem("authTokens")).access
    ).user_id
    : ""
);
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  let [loading, setLoading] = useState(false);
  let [mencodi, setMencodi] = useState("");
  //   const [menuSecundario, setMenuSecundario] = useState([]);
  const [varMPP, setVarMPP] = useState(() =>
    localStorage.getItem("varMPP")
      ? JSON.parse(localStorage.getItem("varMPP"))
      : {}
  );

  const navigate = useNavigate();

  // setLoading(false)

  // useEffect(() => {
  //   let userNameTmp = null;
  //   if (localStorage.getItem("authTokens")) {
  //     userNameTmp = jwt_decode(
  //       JSON.parse(localStorage.getItem("authTokens")).access
  //     ).user_id;
  //   }
  //   if (userName !== userNameTmp.trim()){
  //     alert(userName)
  //     alert(userNameTmp.trim())
  //     setUserName(userNameTmp ? userNameTmp.trim() : undefined);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  let tokenEsValido = () => {
    let valido = false;

    if (localStorage.getItem("authTokens")) {
      let authTokens = JSON.parse(localStorage.getItem("authTokens"));
      let authTokensDecode = jwt_decode(authTokens.access);
      const isExpired =
        dayjs.unix(authTokensDecode.exp).diff(dayjs()) - authTokens.diffTime <
        1;
      if (!isExpired) {
        valido = true;
      }
    }

    return valido;
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("varMPP");
    navigate("/", { replace: true });
  };

  const verMenusSecundarios = async () => {
    // setMencodi(e.target.id);

    if (mencodi) {
      if (userName) {
        const menuesTmp = await obtenerUserMenues(
          userName,
          "36",
          mencodi.substring(0, 2)
        );

        const menuesSecundariosTmp = menuesTmp.filter(
          (item) => item.menCodi !== mencodi
        );

        setVarMPP({ ...varMPP, menuSecundario: menuesSecundariosTmp, mencodiPrincipal: mencodi})

        localStorage.setItem(
          "varMPP",
          JSON.stringify({ ...varMPP, menuSecundario: menuesSecundariosTmp, mencodiPrincipal: mencodi })
        );
      }
      
    }
  };

  const verMenusPrincipal = async () => {
    
    if (userName) {
      const menuesPrincipalTmp = await obtenerMenues(userName, "36", "02");
      // setMenuPrincipal(menuesTmp);
      
      setVarMPP({ ...varMPP, menuPrincipal: menuesPrincipalTmp})

        localStorage.setItem(
          "varMPP",
          JSON.stringify({ ...varMPP, menuPrincipal: menuesPrincipalTmp })
        );
    }
  };

  useEffect(() => {
    verMenusSecundarios(mencodi);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mencodi]);

  let contextData = {
    userName: userName,
    setUserName: setUserName,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    user: user,
    setUser: setUser,
    loading: loading,
    setLoading: setLoading,
    tokenEsValido: tokenEsValido,
    logoutUser: logoutUser,
    menuSecundario: varMPP.menuSecundario ? varMPP.menuSecundario : [],
    mencodi: mencodi,
    setMencodi: setMencodi,
    menuPrincipal: varMPP.menuPrincipal ? varMPP.menuPrincipal : [],
    verMenusPrincipal: verMenusPrincipal,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
