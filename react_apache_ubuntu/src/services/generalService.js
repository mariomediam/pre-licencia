import UseAxios from "../utils/useAxios";

const URL = `${process.env.REACT_APP_API}`;

const obtenerJefeDepen = async (anio, coddep) => {
    try {
      let api = UseAxios();
      
  
      let URLJefeDepen = `${URL}/jefe-depen?anio=${anio}&coddep=${coddep}`;
  
      let {
        data: { content },
      } = await api.get(`${URLJefeDepen}`);

      console.log("content", content)
  
      return content;
    } catch (error) {
      throw error;
    }
  };

  export {
    obtenerJefeDepen,
  }