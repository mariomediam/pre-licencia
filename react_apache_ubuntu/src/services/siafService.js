import UseAxios from "../utils/useAxios";

const URL = `${process.env.REACT_APP_API}/siaf`;


const obtenerMaestroDocumento = async () => {
    
    try {
        let api = UseAxios();
    
        let URLMaestroDocumento = `${URL}/maestro-documento`;    
        
        let {
          data: { content },
        } = await api.get(`${URLMaestroDocumento}`);
        return content;
      } catch (error) {
        throw error;
      }
  };

  const obtenerPersona = async (filtro) => {

    console.log("filtro", filtro);
    const credenciales = {
      filtro,
    };
  
    let api = UseAxios();
  
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      let {
        data: { content },
      } = await api.post(`${URL}/persona/`, credenciales, {
        headers,
      });
  
      return content;
    } catch (error) {
      throw error;
    }
  };
  
export { obtenerMaestroDocumento, obtenerPersona };