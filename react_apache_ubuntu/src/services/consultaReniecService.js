import UseAxios from "../utils/useAxios";

const URL = `${process.env.REACT_APP_API}`;

const obtenerConsultaReniec = async (nroDni) => {
    try {
      let api = UseAxios();
  
      let URLConsultaReniec = `${URL}/buscar-reniec?numero=${nroDni}`;
  
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