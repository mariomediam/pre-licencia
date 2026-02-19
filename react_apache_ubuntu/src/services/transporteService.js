import UseAxios from "../utils/useAxios";

const URL = `${process.env.REACT_APP_API}/transporte`;

const obtenerCapacitacion = async (params) => {

    const { opcion, valor1, valor2 } = params;

    try {
      let api = UseAxios();
  
      let URLCapacitacion = `${URL}/capacitacion?opcion=${opcion}`;

      if (valor1) {
        URLCapacitacion += `&valor1=${valor1}`;
      }

      if (valor2) {
        URLCapacitacion += `&valor2=${valor2}`;
      }

      const headers = {
        "Content-Type": "application/json",
      };
  
      let {
        data: { content },
      } = await api.get(`${URLCapacitacion}`, { headers });
  
      return content;
    } catch (error) {
      throw error;
    }
  };

  const obtenerCapacitacionAgrupadaPorAnioyMes = async ({anio}) => {

    try {
        const data = await obtenerCapacitacion({opcion: "01", valor1: anio});

        return data;
    } catch (error) {
        throw error;
    }
  };

  const obtenerCapacitacionPorAnioyMes = async ({anio, mes}) => {
    try {
        const data = await obtenerCapacitacion({opcion: "02", valor1: anio, valor2: mes});
        return data;
    } catch (error) {
        throw error;
    }
  };

const obtenerCapacitacionObservacion = async (params) => {
  const { opcion, valor1, valor2 } = params;

  try {
    let api = UseAxios();

    let URLCapacitacion = `${URL}/capacitacion-observacion?opcion=${opcion}`;

    if (valor1) {
      URLCapacitacion += `&valor1=${valor1}`;
    }

    if (valor2) {
      URLCapacitacion += `&valor2=${valor2}`;
    }

    const headers = {
      "Content-Type": "application/json",
    };

    let {
      data: { content },
    } = await api.get(`${URLCapacitacion}`, { headers });

    return content;
  } catch (error) {
    throw error;
  }
}

const obtenerCapacitacionObservacionPorAnioyMes = async ({anio, mes}) => {
  try {
    const data = await obtenerCapacitacionObservacion({opcion: "02", valor1: anio, valor2: mes});
    if (data.length > 0) {
      return data[0];
    }
    return data;
  } catch (error) {
    throw error;
  }
}

const obtenerCapacitacionTema = async (params) => {
  const { opcion, valor } = params;

  try {
    let api = UseAxios();

    let URLCapacitacion = `${process.env.REACT_APP_API}/indicadores/select-capacitacion-tema?opcion=${opcion}`;

    if (valor) {
      URLCapacitacion += `&valor=${valor}`;
    }

    const headers = {
      "Content-Type": "application/json",
    };

    let {
      data: { content },
    } = await api.get(`${URLCapacitacion}`, { headers });

    return content;
  } catch (error) {
    throw error;
  }
}

const listarCapacitacionTema = async () => {
  try {
    const data = await obtenerCapacitacionTema({opcion: "01"});
    return data;
  } catch (error) {
    throw error;
  }
}

// curl --location 'http://127.0.0.1:8000/api/indicadores/select-capacitacion-modalidad?opcion=01&valor=1' \
// --data ''

const obtenerCapacitacionModalidad = async (params) => {
  const { opcion, valor } = params;

  try {
    let api = UseAxios();

    let URLCapacitacion = `${process.env.REACT_APP_API}/indicadores/select-capacitacion-modalidad?opcion=${opcion}`;

    if (valor) {
      URLCapacitacion += `&valor=${valor}`;
    }

    const headers = {
      "Content-Type": "application/json",
    };

    let {
      data: { content },
    } = await api.get(`${URLCapacitacion}`, { headers });

    return content;
  } catch (error) {
    throw error;
  }
}

const listarCapacitacionModalidad = async () => {
  try {
    const data = await obtenerCapacitacionModalidad({opcion: "01"});
    return data;
  } catch (error) {
    throw error;
  }
}

// curl --location 'http://127.0.0.1:8000/api/indicadores/select-capacitacion-capacitador?opcion=01&valor=1' \
// --data ''

const obtenerCapacitacionCapacitador = async (params) => {
  const { opcion, valor } = params;

  try {
    let api = UseAxios();

    let URLCapacitacion = `${process.env.REACT_APP_API}/indicadores/select-capacitacion-capacitador?opcion=${opcion}`;

    if (valor) {
      URLCapacitacion += `&valor=${valor}`;
    }

    const headers = {
      "Content-Type": "application/json",
    };

    let {
      data: { content },
    } = await api.get(`${URLCapacitacion}`, { headers });

    return content;
  } catch (error) {
    throw error;
  }
}

const listarCapacitacionCapacitador = async () => {
  try {
    const data = await obtenerCapacitacionCapacitador({opcion: "01"});
    return data;
  } catch (error) {
    throw error;
  }
}




export { obtenerCapacitacion, obtenerCapacitacionAgrupadaPorAnioyMes, obtenerCapacitacionPorAnioyMes, obtenerCapacitacionObservacion, obtenerCapacitacionObservacionPorAnioyMes, listarCapacitacionTema, obtenerCapacitacionModalidad, listarCapacitacionModalidad, obtenerCapacitacionCapacitador, listarCapacitacionCapacitador };