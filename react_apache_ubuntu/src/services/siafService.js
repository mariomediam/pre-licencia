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

  const buscarCartaOrden = async (filtro) => {
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
      } = await api.post(`${URL}/buscar-carta-orden`, credenciales, {
        headers,
      });
  
      return content;
    } catch (error) {
      throw error;
    }
  }

  const downloadCartaOrdenFideicomiso = async (params) => {
    const { cartas } = params;
    let api = UseAxios();
    try {
      const response = await api.post(`${URL}/download-carta-orden-fideicomiso`, { cartas }, { responseType: 'blob' });

      const file = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      return file;

    } catch (error) {
      throw error;
    }
  }

  const obtenerProyectosProgramacionMensual = async (params) => {
    const { anio_eje, mes_eje, sec_ejec } = params;
    let api = UseAxios();
    try {
      let {
        data: { content },
      } = await api.get(`${URL}/proyectos-programacion-mensual?ano_eje=${anio_eje}&mes_eje=${mes_eje}&sec_ejec=${sec_ejec}`);
      return content;
    } catch (error) {
      throw error;
    }
  }

  // {{url_api}}/api/siaf/ultima-sincro?ano_eje=2025&sec_ejec=301529

  const obtenerUltimaSincro = async (params) => {
    const { ano_eje, sec_ejec } = params;
    let api = UseAxios();
    try {
      let {
        data: { content },
      } = await api.get(`${URL}/ultima-sincro?ano_eje=${ano_eje}&sec_ejec=${sec_ejec}`);
      return content;
    } catch (error) {
      throw error;
    }
  }
  
  // {{url_api}}/api/siaf/producto-proyecto-nombre?ano_eje=2025&producto_proyecto=2461159

  const obtenerProductoProyectoNombre = async (params) => {
    const { ano_eje, producto_proyecto } = params;
    let api = UseAxios();
    try {
      let {
        data: { content },
      } = await api.get(`${URL}/producto-proyecto-nombre?ano_eje=${ano_eje}&producto_proyecto=${producto_proyecto}`);
      return content;
    } catch (error) {
      throw error;
    }
  }

  // /api/siaf/resumen-producto-proyecto?ano_eje=2025&producto_proyecto=2331918

  const obtenerResumenProductoProyecto = async (params) => {
    const { ano_eje, producto_proyecto } = params;
    let api = UseAxios();
    try {
      let {
        data: { content },
      } = await api.get(`${URL}/resumen-producto-proyecto?ano_eje=${ano_eje}&producto_proyecto=${producto_proyecto}`);
      return content;
    } catch (error) {
      throw error;
    }
  }

  // {{url_api}}/api/siaf/proyecto-inversion

  const agregarProyectoInversion = async (params) => {
   
    let api = UseAxios();
  
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      let {
        data: { content },
      } = await api.post(`${URL}/proyecto-inversion`, params, {
        headers,
      });
  
      return content;
    } catch (error) {
      throw error;
    }
  }
  
  
 
export { obtenerMaestroDocumento, obtenerPersona, obtenerProveedorSIGA, obtenerExpedienteFase, obtenerExpedienteSecuencia, downloadAccrualFormat, procesoActualizarRegistro, buscarCartaOrden, downloadCartaOrdenFideicomiso, obtenerProyectosProgramacionMensual, obtenerUltimaSincro, obtenerProductoProyectoNombre, obtenerResumenProductoProyecto, agregarProyectoInversion };