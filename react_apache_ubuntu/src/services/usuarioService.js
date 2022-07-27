import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import UseAxios from "../utils/useAxios";

const URL = `${process.env.REACT_APP_API}`;

const Login = async (usuario, password) => {
  
  let credenciales = {
    usuario: usuario,
    password: password,
  };

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    let {
      data: { data },
    } = await axios.post(`${URL}/login/`, credenciales, { headers });

    if (data[0].estado.trim() === "OK") {
      let credenciales = {
        username: usuario,
        password: password,
      };

      let { data: authToken } = await axios.post(
        `${URL}/seguridad/login`,
        credenciales,
        { headers }
      );

      let tokenAcceso = (jwt_decode(authToken.access))

      authToken["diffTime"] = dayjs.unix(tokenAcceso.iat).diff(dayjs())

      localStorage.setItem("authTokens", JSON.stringify(authToken));
      
    }

    return data[0];
  } catch (error) {
    throw error;
  }
};

const obtenerMenues = async (usuario, sistema, opcion) => {
  try {
    let api = UseAxios();

    let URLMenues = `${URL}/seguridad/menues?usuario=${usuario}&sistema=${sistema}&opcion=${opcion}`;

    let {
      data: { content },
    } = await api.get(`${URLMenues}`);

    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerUserMenues = async (usuario, sistema, menu) => {
  try {
    let api = UseAxios();

    let URLMenues = `${URL}/seguridad/usermenues?usuario=${usuario}&sistema=${sistema}&menu=${menu}`;

    let {
      data: { content },
    } = await api.get(`${URLMenues}`);

    return content;
  } catch (error) {
    throw error;
  }
};



export { Login, obtenerMenues, obtenerUserMenues };
