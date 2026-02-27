import UseAxios from "../utils/useAxios";
import axios from "axios";

const URL = `${process.env.REACT_APP_API}/transporte`;

const obtenerCapacitacion = async (params) => {

    const { opcion, valor1, valor2 } = params;

    try {      
  
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
      } = await axios.get(`${URLCapacitacion}`, { headers });
  
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

  const obtenerCapacitacionPorAnio = async ({anio}) => {
    try {
        const data = await obtenerCapacitacion({opcion: "04", valor1: anio});
        return data;
    } catch (error) {
        throw error;
    }
  };


  const obterCapacitacionPorId = async ({id}) => {
    try {
      const data = await obtenerCapacitacion({opcion: "03", valor1: id});
      return data;
    } catch (error) {
      throw error;
    }
  }

const obtenerCapacitacionObservacion = async (params) => {
  const { opcion, valor1, valor2 } = params;

  try {
    
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
    } = await axios.get(`${URLCapacitacion}`, { headers });

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

const insertarCapacitacion = async (params) => {
  const { fecha, tema, modalidad, capacitador, empresas, lugar, cantidad, observacion } = params;

  const body = {
    fecha,
    tema,
    modalidad,
    capacitador,
    empresas,
    lugar,
    cantidad,
    observacion
  }

  try {
    let api = UseAxios();
    let URLCapacitacion = `${URL}/capacitacion/`;
    let { data } = await api.post(URLCapacitacion, body);
    return data;
  } catch (error) {
    throw error;
  }
}

const actualizarCapacitacion = async (params) => {
  const { id, fecha, tema, modalidad, capacitador, empresas, lugar, cantidad, observacion } = params;

  const body = {
    fecha,
    tema,
    modalidad,
    capacitador,
    empresas,
    lugar,
    cantidad,
    observacion
  }

  try {
    let api = UseAxios();
    let URLCapacitacion = `${URL}/capacitacion/${id}`;
    let { data } = await api.put(URLCapacitacion, body);
    return data;
  } catch (error) {
    throw error;
  }
}

const eliminarCapacitacion = async (id) => {
  
  try {
    let api = UseAxios();
    let URLCapacitacion = `${URL}/capacitacion/${id}`;
    let { data } = await api.delete(URLCapacitacion);
    return data;
  } catch (error) {
    throw error;
  }
}

const insertarCapacitacionObservacion = async (params) => {

  console.log("params", params)
  const { anio, mes, observacion } = params;
  const body = {
    anio,
    mes,
    observacion
  }

  try {
    let api = UseAxios();
    let URLCapacitacion = `${URL}/capacitacion-observacion/`;
    let { data } = await api.post(URLCapacitacion, body);
    return data;
  } catch (error) {
    throw error;
  }
}
const actualizarCapacitacionObservacion = async (params) => {
  const { id, observacion } = params;
  const body = {
    observacion
  }

  try {
    let api = UseAxios();
    let URLCapacitacion = `${URL}/capacitacion-observacion/${id}`;
    let { data } = await api.put(URLCapacitacion, body);
    return data;
  } catch (error) {
    throw error;
  }
}

const descargarCapacitacion = async (params) => {
  const { anio, mes } = params;

  let api = UseAxios();
  const body = {
    anio
  }

  if (mes) {
    body.mes = mes;
  }

  try {
    const response = await api.post(`${URL}/download-capacitacion/`, body, { responseType: 'blob' });
    const file = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    
    const mesesNombres = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const nombreMes = mes ? `_${mesesNombres[mes - 1]}` : '';
    const fileName = `Capacitaciones_${anio}${nombreMes}.xlsx`;
    
    const url = window.URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return file;
  } catch (error) {
    throw error;
  }
}

const obtenerSenializacion = async (params) => {
  const { opcion, valor1, valor2 } = params;

  try {      

    let URLSenializacion = `${URL}/senializacion?opcion=${opcion}`;

    if (valor1) {
      URLSenializacion += `&valor1=${valor1}`;
    }

    if (valor2) {
      URLSenializacion += `&valor2=${valor2}`;
    }

    const headers = {
      "Content-Type": "application/json",
    };

    let {
      data: { content },
    } = await axios.get(`${URLSenializacion}`, { headers });

    return content;
  } catch (error) {
    throw error;
  }
}

const obtenerSenializacionAgrupadaPorAnioyMes = async ({anio}) => {

  try {
      const data = await obtenerSenializacion({opcion: "01", valor1: anio});

      return data;
  } catch (error) {
      throw error;
  }
};

// curl --location --request GET 'http://127.0.0.1:8000/api/transporte/senializacion-indicador?opcion=01' \
// --data ''

const obtenerSenializacionIndicador = async (params) => {
  const { opcion, valor1, valor2 } = params;

  try {      

    let URLSenializacionIndicador = `${URL}/senializacion-indicador?opcion=${opcion}`;

    if (valor1) {
      URLSenializacionIndicador += `&valor1=${valor1}`;
    }

    if (valor2) {
      URLSenializacionIndicador += `&valor2=${valor2}`;
    }

    const headers = {
      "Content-Type": "application/json",
    };

    let {
      data: { content },
    } = await axios.get(`${URLSenializacionIndicador}`, { headers });

    return content;
  } catch (error) {
    throw error;
  }
}

const listarSenializacionIndicador = async () => {
  try {
    const data = await obtenerSenializacionIndicador({opcion: "01"});
    return data;
  } catch (error) {
    throw error;
  }
}

const obtenerSenializacionPorAnioyMes = async ({anio, mes}) => {
  try {
    const data = await obtenerSenializacion({opcion: "02", valor1: anio, valor2: mes});
    return data;
  } catch (error) {
    throw error;
  }
}

// curl --location --request POST 'http://127.0.0.1:8000/api/transporte/senializacion/2026/1' \
// --header 'Content-Type: application/json' \
// --header 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzcyMjY1MDgwLCJpYXQiOjE3NzIyMjE4ODAsImp0aSI6ImIwMGZiYjY1NmE5NTQzZjJhZDUwMzlkNWM3N2ZjODdkIiwidXNlcl9pZCI6Ik1NRURJTkEgICAgICAgICAgICAgIn0.wi9SA4geRObMnUPWowmcBa8i4arz-zx1A-35BvUH8MU' \
// --data '{
//     "senializaciones": [
//         {
//             "C_Senializa_Indicador": 5,
//             "N_Senializa_Indicador": "Flechas direccional",
//             "C_Senializa_Meta": 1,
//             "C_bieser_unimed": "037",
//             "C_Senializa": null,
//             "M_Senializa_Anio": null,
//             "M_Senializa_Mes": null,
//             "Q_Senializa_Cantidad": 0,
//             "C_Usuari_Login": null,
//             "D_Senializa_FecDig": null,
//             "N_unimed_desc": "M2"
//         },
//         {
//             "C_Senializa_Indicador": 6,
//             "N_Senializa_Indicador": "Letras y números",
//             "C_Senializa_Meta": 1,
//             "C_bieser_unimed": "037",
//             "C_Senializa": null,
//             "M_Senializa_Anio": null,
//             "M_Senializa_Mes": null,
//             "Q_Senializa_Cantidad": 0,
//             "C_Usuari_Login": null,
//             "D_Senializa_FecDig": null,
//             "N_unimed_desc": "M2"
//         },
//         {
//             "C_Senializa_Indicador": 4,
//             "N_Senializa_Indicador": "Linea de borde de calzada",
//             "C_Senializa_Meta": 1,
//             "C_bieser_unimed": "036",
//             "C_Senializa": 2,
//             "M_Senializa_Anio": 2026,
//             "M_Senializa_Mes": 2,
//             "Q_Senializa_Cantidad": 20,
//             "C_Usuari_Login": "mmedina ",
//             "D_Senializa_FecDig": "2026-02-25T00:00:00",
//             "N_unimed_desc": "UNIDAD"
//         },
//         {
//             "C_Senializa_Indicador": 3,
//             "N_Senializa_Indicador": "Linea de carril",
//             "C_Senializa_Meta": 1,
//             "C_bieser_unimed": "037",
//             "C_Senializa": null,
//             "M_Senializa_Anio": null,
//             "M_Senializa_Mes": null,
//             "Q_Senializa_Cantidad": 0,
//             "C_Usuari_Login": null,
//             "D_Senializa_FecDig": null,
//             "N_unimed_desc": "M2"
//         },
//         {
//             "C_Senializa_Indicador": 2,
//             "N_Senializa_Indicador": "Linea de pare",
//             "C_Senializa_Meta": 1,
//             "C_bieser_unimed": "037",
//             "C_Senializa": 3,
//             "M_Senializa_Anio": 2026,
//             "M_Senializa_Mes": 2,
//             "Q_Senializa_Cantidad": 30,
//             "C_Usuari_Login": "mmedina ",
//             "D_Senializa_FecDig": "2026-02-25T00:00:00",
//             "N_unimed_desc": "M2"
//         },
//         {
//             "C_Senializa_Indicador": 1,
//             "N_Senializa_Indicador": "Lineas peatonales",
//             "C_Senializa_Meta": 1,
//             "C_bieser_unimed": "037",
//             "C_Senializa": 1,
//             "M_Senializa_Anio": 2026,
//             "M_Senializa_Mes": 2,
//             "Q_Senializa_Cantidad": 100,
//             "C_Usuari_Login": "mmedina ",
//             "D_Senializa_FecDig": "2026-02-25T00:00:00",
//             "N_unimed_desc": "M2"
//         },
//         {
//             "C_Senializa_Indicador": 7,
//             "N_Senializa_Indicador": "Mantenimiento en pintura",
//             "C_Senializa_Meta": 2,
//             "C_bieser_unimed": "037",
//             "C_Senializa": null,
//             "M_Senializa_Anio": null,
//             "M_Senializa_Mes": null,
//             "Q_Senializa_Cantidad": 0,
//             "C_Usuari_Login": null,
//             "D_Senializa_FecDig": null,
//             "N_unimed_desc": "M2"
//         }
//     ]
// }'

const insertarSenializaciones = async (params) => {
  
  const { anio, mes, senializaciones } = params;

  const body = {
    senializaciones: senializaciones
  };

  
  let api = UseAxios();
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    let {
      data: { content },
    } = await api.post(`${process.env.REACT_APP_API}/transporte/senializacion/${anio}/${mes}`, body, { headers });
    return content;
  }
  catch (error) {
    throw error;
  }
}



export { obtenerCapacitacion, obtenerCapacitacionAgrupadaPorAnioyMes, obtenerCapacitacionPorAnioyMes, obtenerCapacitacionObservacion, obtenerCapacitacionObservacionPorAnioyMes, listarCapacitacionTema, obtenerCapacitacionModalidad, listarCapacitacionModalidad, obtenerCapacitacionCapacitador, listarCapacitacionCapacitador, insertarCapacitacion, obterCapacitacionPorId, actualizarCapacitacion, eliminarCapacitacion, insertarCapacitacionObservacion, actualizarCapacitacionObservacion, obtenerCapacitacionPorAnio, descargarCapacitacion, obtenerSenializacion, obtenerSenializacionAgrupadaPorAnioyMes, obtenerSenializacionIndicador, listarSenializacionIndicador, obtenerSenializacionPorAnioyMes, insertarSenializaciones };