import UseAxios from "../utils/useAxios";

const URL = `${process.env.REACT_APP_API}`;

const obtenerConsultaReniec = async (nroDniAConsultar, claveReniec) => {
    try {
      let api = UseAxios();
  
      let URLConsultaReniec = `${URL}/buscar-reniec?dniConsultar=${nroDniAConsultar}&claveReniec=${claveReniec}`;
  
      let {
        data: { consultarResponse },
      } = await api.get(`${URLConsultaReniec}`);
  
      return consultarResponse.return;
    } catch (error) {
      throw error;
    }
  };
  

  export {
    obtenerConsultaReniec,
  }