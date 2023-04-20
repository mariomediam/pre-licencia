import UseAxios from "../utils/useAxios";

const URL = `${process.env.REACT_APP_API}/rrhh`;

const obtenerPlanillaBoleta = async (anio, mes) => {
    try {
      let api = UseAxios();
  
      let URLPlanillas = `${URL}/lista-planilla-boleta?anio=${anio}&mes=${mes}`;
  
      let {
        data: { content },
      } = await api.get(`${URLPlanillas}`);
  
      return content;
    } catch (error) {
      throw error;
    }
  };

  export { obtenerPlanillaBoleta };
  