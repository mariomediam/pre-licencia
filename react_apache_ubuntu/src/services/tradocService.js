import UseAxios from "../utils/useAxios";

const URL = `${process.env.REACT_APP_API}/tradoc`;

const obtenerExpedientePorNroAnio = async (numero, anio) => {
    try {
      let api = UseAxios();

      numero = numero.toString().padStart(8, "0");
  
      let URLExpediente = `${URL}/expedientes/${numero}/${anio}`;
  
      let {
        data: { content },
      } = await api.get(`${URLExpediente}`);
  
      return content;
    } catch (error) {
      throw error;
    }
  };

  export {
    obtenerExpedientePorNroAnio,
  }