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
    const { anio_eje, mes_eje, sec_ejec, c_proinv_codigo } = params;

    let URLProyectosProgramacionMensual = `${URL}/proyectos-programacion-mensual?ano_eje=${anio_eje}&mes_eje=${mes_eje}&sec_ejec=${sec_ejec}`;

    if(c_proinv_codigo){
      URLProyectosProgramacionMensual += `&c_proinv_codigo=${c_proinv_codigo.trim()}`;
    }

    let api = UseAxios();
    try {
      let {
        data: { content },
      } = await api.get(URLProyectosProgramacionMensual);
      
      if(content.length > 0 && c_proinv_codigo){
        return content[0];
      }

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

  // {{url_api}}/api/siaf/programacion-proyecto-inversion?c_prgpro=95

  const obtenerProgramacionProyectoInversion = async (params) => {
    const { c_prgpro } = params;
    let api = UseAxios();
    try {
      let {
        data: { content },
      } = await api.get(`${URL}/programacion-proyecto-inversion/${c_prgpro}`);
      return content;
    } catch (error) {
      throw error;
    }
  } 


//   curl --location --request PUT 'http://127.0.0.1:8000/api/siaf/programacion-proyecto-inversion/91' \
// --header 'Content-Type: application/json' \
// --header 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ4MTAwOTgzLCJpYXQiOjE3NDgwNTc3ODMsImp0aSI6ImEwMTM1MjlmNTgwMDQ3NzNhMjNlMTI4NTVmYjNhNzU1IiwidXNlcl9pZCI6Ik1NRURJTkEgICAgICAgICAgICAgIn0.I7BWHMSCVAWVHqKI67izsdJ00eCs8AH6vlmG8jXhDQM' \
// --data '{    
//     "m_prgpro_mes": 5,
//     "q_prgpro_financ": 1000000,
//     "p_prgpro_fisica": 66,
//     "q_prgpro_caida": 30000,
//     "q_prgpro_increm": 5000,
//     "q_prgpro_riesgo": 12000,
//     "t_prgpro_estsit": "Estaedo situacional xyz",
//     "t_prgpro_coment": "Comentarios abc",
//     "c_usuari_login": "MMEDINA ",
//     "n_prgpro_pc": "127.0.0.1",
//     "d_prgpro_fecdig": "2025-05-22T14:45:52.187000",
//     "c_proinv": 19,
//     "n_proinv_nombre": "MEJORAMIENTO DEL SERVICIO DE TRANSITABILIDAD PEATONAL Y VEHICULAR DE LA UPIS LOS ANGELES EN EL DISTRITO DE PIURA, PROVINCIA DE PIURA - PIURA",
//     "ano_eje": 2025,
//     "c_proinv_codigo": "2331918 ",
//     "c_estado": 2
// }'

const actualizarProgramacionProyectoInversion = async (params) => {
  const { c_prgpro } = params;
  let api = UseAxios();
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    let {
      data: { content },
    } = await api.put(`${URL}/programacion-proyecto-inversion/${c_prgpro}`, params, {
      headers,
    });
    return content;
  } catch (error) {
    throw error;
  } 
}
  

const descargarProyeccionMensual = async (params) => {
  const { ano_eje, mes_eje, sec_ejec } = params;
  let api = UseAxios();
  try {
    const response = await api.post(`${URL}/download-proyeccion-mensual`, { ano_eje, mes_eje, sec_ejec }, { responseType: 'blob' });

    const file = new Blob([response.data], {  
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    return file;
  } catch (error) {
    throw error;
  }
}

export { obtenerMaestroDocumento, obtenerPersona, obtenerProveedorSIGA, obtenerExpedienteFase, obtenerExpedienteSecuencia, downloadAccrualFormat, procesoActualizarRegistro, buscarCartaOrden, downloadCartaOrdenFideicomiso, obtenerProyectosProgramacionMensual, obtenerUltimaSincro, obtenerProductoProyectoNombre, obtenerResumenProductoProyecto, agregarProyectoInversion, obtenerProgramacionProyectoInversion, actualizarProgramacionProyectoInversion, descargarProyeccionMensual };