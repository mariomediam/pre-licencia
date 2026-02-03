import axios from "axios";

const URL = `${process.env.REACT_APP_API}/transporte`;

const TranspVigente = async () => {
  let credenciales = {};

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    let {
      data: { content },
    } = await axios.get(`${URL}/vehiculos-vigentes`, credenciales, { headers });

    return content;
  } catch (error) {
    throw error;
  }
};

const VehiculosAutorizadosMes = async (anio) => {
  let credenciales = {};

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    let {
      data: { content },
    } = await axios.get(
      `${URL}/vehiculos-autorizados-mes?anio=${anio}`,
      credenciales,
      { headers }
    );

    return content;
  } catch (error) {
    throw error;
  }
};

const ComparacionVehiculosAutorizados = async (
  dia,
  mes,
  anio01,
  anio02,
  opcion = 1
) => {
  let credenciales = {};

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    let {
      data: { content },
    } = await axios.get(
      `${URL}/comparacion-vehiculos-autorizados?dia=${dia}&mes=${mes}&anio01=${anio01}&anio02=${anio02}&opcion=${opcion}`,
      credenciales,
      { headers }
    );

    return content;
  } catch (error) {
    throw error;
  }
};

const InfraccionesTransporte = async (anio) => {
  let credenciales = {};

  try {
    let urlInfracciones = `${URL}/infracciones-transporte`;

    if (anio) {
      urlInfracciones += `?anio=${anio}`;
    }

    const headers = {
      "Content-Type": "application/json",
    };
    let {
      data: { content },
    } = await axios.get(urlInfracciones, credenciales, { headers });

    return content;
  } catch (error) {
    throw error;
  }
};

const ComparacionInfraccionesTransporte = async (dia, mes, anio01, anio02) => {
  let credenciales = {};

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    let {
      data: { content },
    } = await axios.get(
      `${URL}/comparacion-infracciones-transporte?dia=${dia}&mes=${mes}&anio01=${anio01}&anio02=${anio02}`,
      credenciales,
      { headers }
    );

    return content;
  } catch (error) {
    throw error;
  }
};

const AntiguedadVehiculos = async () => {
  let credenciales = {};

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    let {
      data: { content },
    } = await axios.get(`${URL}/antiguedad-vehiculos`, credenciales, {
      headers,
    });

    return content;
  } catch (error) {
    throw error;
  }
};

const OcurrenciasxAnio = async ( params ) => {

  const { anio, opcion } = params;

  let credenciales = {};

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    let {
      data: { content },
    } = await axios.get(`${URL}/ocurrencias-anio?anio=${anio}&opcion=${opcion}`, credenciales, {
      headers,
    });

    return content;
  }
  catch (error) {
    throw error;
  }
}

const MontosPapeleta = async ( params ) => {
  
    const { anio, tipo } = params;
  
    let credenciales = {};
  
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      let {
        data: { content },
      } = await axios.get(`${URL}/montos-papeleta?anio=${anio}&tipo=${tipo}`, credenciales, {
        headers,
      });
  
      return content;
    }
    catch (error) {
      throw error;
    }
  }

  // {{url_api}}/api/transporte/comparacion-montos-papeleta?dia=21&mes=11&anio01=2023&anio02=2024

  const ComparacionMontosPapeleta = async ( params ) => {
    
      const { dia, mes, anio01, anio02 } = params;
    
      let credenciales = {};
    
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        let {
          data: { content },
        } = await axios.get(`${URL}/comparacion-montos-papeleta?dia=${dia}&mes=${mes}&anio01=${anio01}&anio02=${anio02}`, credenciales, {
          headers,
        });
    
        return content;
      }
      catch (error) {
        throw error;
      }
    }

    // {{url_api}}/api/indicadores/buscar-recaudacion-satp?anio=2025&mes=1&tasas=347,334


    const BuscarRecaudacionSatp = async ( params ) => {
      const { anio, mes, tasas } = params;
      let credenciales = {};
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        let {
          data: { content },
        } = await axios.get(`${process.env.REACT_APP_API}/indicadores/buscar-recaudacion-satp?anio=${anio}&mes=${mes}&tasas=${tasas}`, credenciales, {
          headers,
        });
        return content;
      }
      catch (error) {
        throw error;
      }
    }

//     curl --location 'http://127.0.0.1:8000/api/indicadores/select-proyeccion-por-anio-y-dependencia?opcion=02&anio=2026&dependencia=110659' \
// --data ''
const SelectProyeccionPorAnioYDependencia = async ( params ) => {
  const { opcion, anio, dependencia } = params;
  let credenciales = {};
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    let {
      data: { content },
    } = await axios.get(`${process.env.REACT_APP_API}/indicadores/select-proyeccion-por-anio-y-dependencia?opcion=${opcion}&anio=${anio}&dependencia=${dependencia}`, credenciales, {
      headers,
    });

    if (opcion === "02") {
      return content[0]
    }

    return content;
  }
  catch (error) {
    throw error;
  }
}

// curl --location 'http://127.0.0.1:8000/api/indicadores/select-recaudacion-por-anio-y-dependencia?anio=2026&dependencia=110659' \
// --data ''

const SelectRecaudacionPorAnioYDependencia = async ( params ) => {
  const { anio, dependencia } = params;
  let credenciales = {};
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    let {
      data: { content },
    } = await axios.get(`${process.env.REACT_APP_API}/indicadores/select-recaudacion-por-anio-y-dependencia?anio=${anio}&dependencia=${dependencia}`, credenciales, {
      headers,
    });
    return content;
  }
  catch (error) {
    throw error;
  }
}


export {
  TranspVigente,
  VehiculosAutorizadosMes,
  ComparacionVehiculosAutorizados,
  InfraccionesTransporte,
  ComparacionInfraccionesTransporte,
  AntiguedadVehiculos,
  OcurrenciasxAnio,
  MontosPapeleta,
  ComparacionMontosPapeleta,
  BuscarRecaudacionSatp,
  SelectProyeccionPorAnioYDependencia,
  SelectRecaudacionPorAnioYDependencia,
};
