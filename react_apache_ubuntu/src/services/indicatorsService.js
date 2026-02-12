import axios from "axios";
import UseAxios from "../utils/useAxios";

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

// curl --location 'http://127.0.0.1:8000/api/indicadores/select-tasa?opcion=02&valor=i65' \
// --data ''
const SelectTasa = async ( params ) => {  
  const { opcion, valor } = params;
  let credenciales = {};
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    let {
      data: { content },
    } = await axios.get(`${process.env.REACT_APP_API}/indicadores/select-tasa?opcion=${opcion}&valor=${valor}`, credenciales, {
      headers,
    });

    if (opcion.includes("01", "02") && content.length > 0) {
      return content[0];
    }
    return content;
  }
  catch (error) {
    throw error;
  }
}

// curl --location 'http://127.0.0.1:8000/api/indicadores/select-recaudacion-por-anio-y-tasa?anio=2026&tasa=28' \
// --data ''

const SelectRecaudacionPorAnioYTasa = async ( params ) => {
  const { anio, tasa } = params;
  let credenciales = {};
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    let {
      data: { content },
    } = await axios.get(`${process.env.REACT_APP_API}/indicadores/select-recaudacion-por-anio-y-tasa?anio=${anio}&tasa=${tasa}`, credenciales, {
      headers,
    });    

    return content;
  }
  catch (error) {
    throw error;
  }
}

// curl --location 'http://127.0.0.1:8000/api/indicadores/select-proyeccion-por-anio-y-tasa?opcion=01&anio=2026&tasa=28' \
// --data ''

const SelectProyeccionPorAnioYTasa = async ( params ) => {
  const {opcion, anio, tasa} = params;
  let credenciales = {};
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    let {
      data: { content },
    } = await axios.get(`${process.env.REACT_APP_API}/indicadores/select-proyeccion-por-anio-y-tasa?opcion=${opcion}&anio=${anio}&tasa=${tasa}`, credenciales, {
      headers,
    });
   
    return content;
  }
  catch (error) {
    throw error;
  }
}

// curl --location --request PUT 'http://127.0.0.1:8000/api/indicadores/update-tasa/358' \
// --header 'Content-Type: application/json' \
// --header 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzcwNjk0MzgwLCJpYXQiOjE3NzA2NTExODAsImp0aSI6IjkwODU0ZmU4ZjdhYTRjNDFhM2VhYzc5YjQ2NzgzODRjIiwidXNlcl9pZCI6Ik1NRURJTkEgICAgICAgICAgICAgIn0.ljZSxhL_plcYjeXdpzc3Y-J7kIHhxza-Zaj4keYoZm4' \
// --data '{
//     "dependencia": 110689
// }'

const UpdateTasa = async ( params ) => {
  const { c_tasa, dependencia } = params;
  let api = UseAxios();
  
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const body = {
      dependencia: dependencia
    };
    let {
      data: { content },
    } = await api.put(`${process.env.REACT_APP_API}/indicadores/update-tasa/${c_tasa}`, body, { headers });
    return content;
  }
  catch (error) {
    throw error;
  }
}


// curl --location 'http://127.0.0.1:8000/api/indicadores/insertar-proyecciones/141/2026' \
// --header 'Content-Type: application/json' \
// --header 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzcwNzQxNzE3LCJpYXQiOjE3NzA2OTg1MTcsImp0aSI6ImU1YWIwZTJlODI3NzQzYzA4MDdkZWZiOGNjODgwYmRhIiwidXNlcl9pZCI6Ik1NRURJTkEgICAgICAgICAgICAgIn0.4DeTpUrmJ4S56jigHSukJ4NCWLTG6QSfNDmR65S9yiA' \
// --data '{
//     "proyecciones": [
//         {
//             "M_Mes": 2,
//             "Q_Proyecc_Monto": 100
//         },
//         {
//             "M_Mes": 4,
//             "Q_Proyecc_Monto": 200
//         }
//     ]
// }'
const InsertarProyecciones = async ( params ) => {

  console.log("params *****************", params);
  const { c_tasa, anio, proyecciones } = params;

  const body = {
    proyecciones: proyecciones
  };

  console.log("body *******************", body);

  let api = UseAxios();
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    let {
      data: { content },
    } = await api.post(`${process.env.REACT_APP_API}/indicadores/insertar-proyecciones/${c_tasa}/${anio}`, body, { headers });
    return content;
  }
  catch (error) {
    throw error;
  }
} ;


// curl --location 'http://127.0.0.1:8000/api/indicadores/buscar-recaudacion-actas-control-satp?anio=2026&tipo=1' \
// --data ''

const BuscarRecaudacionActasControlSatp = async ( params ) => {
  const { anio, tipo } = params;


  let credenciales = {};
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    let {
      data: { content },
    } = await axios.get(`${process.env.REACT_APP_API}/indicadores/buscar-recaudacion-actas-control-satp?anio=${anio}&tipo=${tipo}`, credenciales, {
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
  SelectTasa,
  SelectRecaudacionPorAnioYTasa,
  SelectProyeccionPorAnioYTasa,
  UpdateTasa,
  InsertarProyecciones,
  BuscarRecaudacionActasControlSatp
};

