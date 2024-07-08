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


export { obtenerTributoTipoOperacion, obtenerTributoArchivo, obtenerTributoPeriodosDisponibles };
