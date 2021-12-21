import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";


const URL = `${process.env.REACT_APP_API}`;

const UseAxios = () => {


  if (localStorage.getItem("authTokens")) {

    let authTokens = JSON.parse(localStorage.getItem("authTokens"));
    

    const axiosInstance = axios.create({
      URL,
      headers: { Authorization: `Bearer ${authTokens?.access}` },
    });

    axiosInstance.interceptors.request.use(async (req) => {

      
      let authTokensDecode = jwt_decode(authTokens.access);
     
      const isExpired = dayjs.unix(authTokensDecode.exp).diff(dayjs()) - authTokens.diffTime  < 1;

      if (!isExpired) return req;

      const response = await axios.post(`${URL}/seguridad/refresh-session`, {
        refresh: authTokens.refresh,
      });
      
      response.data["refresh"] = authTokens.refresh
  
      response.data["diffTime"] = authTokens.diffTime

      localStorage.setItem("authTokens", JSON.stringify(response.data));

      req.headers.Authorization = `Bearer ${response.data.access}`;
      return req;
    });

    return axiosInstance;
  } 
};

export default UseAxios;
