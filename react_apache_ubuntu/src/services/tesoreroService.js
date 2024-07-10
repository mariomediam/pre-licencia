import UseAxios from "../utils/useAxios";

const URL = `${process.env.REACT_APP_API}/tesorero`;

const obtenerTributoTipoOperacion = async (tipOpe) => {
  try {
    let api = UseAxios();

    let URLTributoTipoOperacion = `${URL}/tributo-tipo-operacion`;

    if (tipOpe) {
      URLTributoTipoOperacion += `?type=${tipOpe}`;
    }

    let {
      data: { content },
    } = await api.get(`${URLTributoTipoOperacion}`);
    return content;
  } catch (error) {
    throw error;
  }
};


const obtenerTributoArchivo = async (params) => {
  try {
    let api = UseAxios();

    const { opcion, valor01, valor02, valor03 } = params;

    let URLTributoArchivo = `${URL}/tributo-archivo?opcion=${opcion}`;

    if (valor01) {
      URLTributoArchivo += `&valor01=${valor01}`;
    }

    if (valor02) {
      URLTributoArchivo += `&valor02=${valor02}`;
    }

    if (valor03) {
      URLTributoArchivo += `&valor03=${valor03}`;
    }

    let {
      data: { content },
    } = await api.get(`${URLTributoArchivo}`);
    return content;
  } catch (error) {
    throw error;
  }
};


const obtenerTributoPeriodosDisponibles = async (params) => {
  try {
    let api = UseAxios();

    const { tipo, anio } = params;

    let URLPeriodosDisponibles = `${URL}/tributo-periodos-disponibles?tipo=${tipo}`;

    if (anio) {
      URLPeriodosDisponibles += `&anio=${anio}`;
    }
    
    let {
      data: { content },
    } = await api.get(`${URLPeriodosDisponibles}`);
    return content;
  } catch (error) {
    throw error;
  }
}

const UploadTributoArchivo = async ( params ) => {
  try {
    let api = UseAxios();

    const { tipo, anio, mes, archivo } = params;

    let URLTributoArchivo = `${URL}/tributo-archivo/`;

    const formData = new FormData();
    formData.append("tipo", tipo);
    formData.append("anio", anio);
    formData.append("mes", mes);
    formData.append("archivo", archivo);

    const headers = {
      "Content-Type": "multipart/form-data",
    };
    let {
      data: { content },
    } = await api.post(`${URLTributoArchivo}`, formData, {
      headers,
    });

    return content;
  } catch (error) {
    throw error;
  }
};

const eliminarTributoArchivo = async (archivoId) => {
  try {
    let api = UseAxios();

    const URLDEleteTributoArchivo = `${URL}/tributo-archivo/${archivoId}`;    

    let {
      data: { content },
    } = await api.delete(`${URLDEleteTributoArchivo}`);

    return content;
  } catch (error) {
    throw error;
  }
};


const downloadTributoArchivo = async (archivoId) => {
  try {
    let api = UseAxios();

    let URLDownloadTributoArchivo = `${URL}/download-tributo-archivo/${archivoId}`;
    const response =  await api.get(`${URLDownloadTributoArchivo}`, { responseType: 'blob' });
    const file = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    return file;

  } catch (error) {
    throw error;
  }
};


export { obtenerTributoTipoOperacion, obtenerTributoArchivo, obtenerTributoPeriodosDisponibles, UploadTributoArchivo, eliminarTributoArchivo, downloadTributoArchivo };
