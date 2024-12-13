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

  const obtenerProveedorSIGA = async (filtro) => {
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
      } = await api.post(`${URL}/proveedor-siga/`, credenciales, {
        headers,
      });
  
      return content;
    } catch (error) {
      throw error;
    }
  };

  const obtenerExpedienteFase = async (params) => {
    const { anio, expediente, ciclo, fase } = params;
    let api = UseAxios();
    try {
      let {
        data: { content },
      } = await api.get(`${URL}/seleccionar-expediente-fase?anio=${anio}&expediente=${expediente}&ciclo=${ciclo}&fase=${fase}`);
      return content;
    } catch (error) {
      throw error;
    }
  }

  const obtenerExpedienteSecuencia = async (params) => {
    const { anio, expediente, secuencia, correlativo } = params;
    let api = UseAxios();
    try {
      let {
        data: { content },
      } = await api.get(`${URL}/seleccionar-expediente-secuencia?anio=${anio}&expediente=${expediente}&secuencia=${secuencia}&correlativo=${correlativo}`);
      return content;
    } catch (error) {
      throw error;
    }
  }
  
export { obtenerMaestroDocumento, obtenerPersona, obtenerProveedorSIGA, obtenerExpedienteFase, obtenerExpedienteSecuencia };