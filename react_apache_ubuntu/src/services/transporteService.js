import UseAxios from "../utils/useAxios";

const URL = `${process.env.REACT_APP_API}/transporte`;

// curl --location 'http://127.0.0.1:8000/api/transporte/capacitacion?opcion=01&valor1=2026' \
// --header 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzcxNDMyNjc5LCJpYXQiOjE3NzEzODk0NzksImp0aSI6IjY1NDkxMGVlMmYwZTRjZDQ5NTdhOGFhZjg2MTNiYmE3IiwidXNlcl9pZCI6Ik1NRURJTkEgICAgICAgICAgICAgIn0.g8hzANq2ypDDugft8Y9iAQeyluGNhPtbf4mEGuaozVs' \
// --data ''


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

export { obtenerCapacitacion, obtenerCapacitacionAgrupadaPorAnioyMes, obtenerCapacitacionPorAnioyMes, obtenerCapacitacionObservacion, obtenerCapacitacionObservacionPorAnioyMes };