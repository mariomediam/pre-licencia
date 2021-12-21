import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

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

// const login = async (usuario, password) => {
//     let credenciales = {
//         usuario:usuario,
//         password:password
//     }

//     try {
//         const headers = {
//             "Content-Type": "application/json"
//         }
//         let { data: {data} } = await axios.post(`${URL}/login/`, credenciales, { headers })

//         return data[0]

//     } catch (error) {
//         throw error
//     }
// }

export { Login };
