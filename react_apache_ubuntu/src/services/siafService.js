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


  const downloadAccrualFormat = async (params) => {
    const { anio, expediente, secuencia, correlativo, retentions } = params;
    let api = UseAxios();
    try {
      const response = await api.post(`${URL}/download-formato-devengado`, { anio, expediente, secuencia, correlativo, retentions }, { responseType: 'blob' });

      const file = new Blob([response.data], {
        type: "application/pdf",
      });

      return file;

    } catch (error) {
      throw error;
    }
  }

  // {{url_api}}/api/siaf/proceso-actualizar-registro

  const procesoActualizarRegistro = async (filtro) => {
    const credenciales = {
      ...filtro,
    };
  
    let api = UseAxios();
  
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      let {
        data: { content },
      } = await api.post(`${URL}/proceso-actualizar-registro`, credenciales, {
        headers,
      });
  
      return content;
    } catch (error) {
      throw error;
    }
  };

  


  
export { obtenerMaestroDocumento, obtenerPersona, obtenerProveedorSIGA, obtenerExpedienteFase, obtenerExpedienteSecuencia, downloadAccrualFormat, procesoActualizarRegistro };