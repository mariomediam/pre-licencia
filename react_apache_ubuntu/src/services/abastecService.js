import UseAxios from "../utils/useAxios";

const URL = `${process.env.REACT_APP_API}/abastec`;

const obtenerAccesoDepen = async (
  anio,
  depen = undefined,
  filtro = undefined
) => {
  try {
    let api = UseAxios();

    let URLAccesoDepen = `${URL}/acceso-depen?anio=${anio}`;

    if (depen) {
      URLAccesoDepen += `&depen=${depen}`;
    }

    if (filtro) {
      URLAccesoDepen += `&filtro=${filtro}`;
    }

    let {
      data: { content },
    } = await api.get(`${URLAccesoDepen}`);
    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerRequeDepen = async (
  anio,
  sfDep,
  bieSerTipo,
  field = undefined,
  valor = undefined,
  libre = undefined,
  tipo_gasto = undefined
) => {
  try {
    let api = UseAxios();

    let URLARequeDepen = `${URL}/reque-depen?anio=${anio}&sfdep=${sfDep}&tipo=${bieSerTipo}`;

    if (field) {
      URLARequeDepen += `&field=${field}`;
    }

    if (valor) {
      URLARequeDepen += `&valor=${valor}`;
    }

    if (libre) {
      URLARequeDepen += `&libre=${libre}`;
    }

    let {
      data: { content },
    } = await api.get(`${URLARequeDepen}`);
    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerRequeById = async (anio, numero, tipo) => {
  try {
    let api = UseAxios();

    let URLReque = `${URL}/reque?anio=${anio}&numero=${numero}&tipo=${tipo}`;

    let {
      data: { content },
    } = await api.get(`${URLReque}`);
    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerAniosDepenById = async (anio, codDep) => {
  try {
    let api = UseAxios();

    let URLDependencia = `${URL}/depen-coddep?anio=${anio}&coddep=${codDep}`;

    let {
      data: { content },
    } = await api.get(`${URLDependencia}`);
    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerRequeSaldoPresupDepen = async (
  anio,
  codDep,
  bieSerTipo,
  formato = undefined
) => {
  try {
    let api = UseAxios();

    let URLSaldoDepen = `${URL}/saldo-depen?anio=${anio}&coddep=${codDep}&tipo=${bieSerTipo}`;

    if (formato) {
      URLSaldoDepen += `&formato=${formato}`;
    }

    let {
      data: { content },
    } = await api.get(`${URLSaldoDepen}`);
    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerBBSSDisponibleOrden = async (
  anio,
  secFun = undefined,
  codDep = undefined,
  bieSerTipo,
  file,
  valor
) => {
  try {
    let api = UseAxios();

    let URLBbSs = `${URL}/bbss-disponible-orden?anio=${anio}&tipo=${bieSerTipo}&file=${file}&valor=${valor}`;

    if (secFun) {
      URLBbSs += `&secfun=${secFun}`;
    }

    if (codDep) {
      URLBbSs += `&coddep=${codDep}`;
    }

    let {
      data: { content },
    } = await api.get(`${URLBbSs}`);
    return content;
  } catch (error) {
    throw error;
  }
};

const grabarRequerimiento = async (anio, numero, tipo, requerimiento) => {
  const credenciales = {
    requerimiento,
  };

  let api = UseAxios();

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    let {
      data: { content },
    } = await api.post(
      `${URL}/reque/${anio}/${numero}/${tipo}`,
      credenciales,
      {
        headers,
      }
    );

    if (content?.length > 0) {
      content = content[0];
    }

    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerRequerimiento = async (anio, numero, tipo) => {  
  let api = UseAxios();

  try {
    let {
      data: { content },
    } = await api.get(`${URL}/reque/${anio}/${numero}/${tipo}`);

    content["D_reque_fecha"] = content["D_reque_fecha"].toString().substring(0, 10);
    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerRequeSaldoPresup = async (anio, numero, tipo) => {
  try {
    let api = UseAxios();

    let URLReque = `${URL}/reque-saldo-presup?anio=${anio}&numero=${numero}&tipo=${tipo}`;

    let {
      data: { content },
    } = await api.get(`${URLReque}`);

    let contentFormat = []

    if (content?.length > 0) {
      content.forEach(item => {
        contentFormat.push({
          "C_anipre": item.C_anipre,
          "C_clapre": item.C_clapre,
          "C_depen": item.C_depen,
          "C_secfun": item.C_secfun,
          "C_objpoi": item.C_objpoi,
          "C_metapoi": item.C_metapoi,
          "C_activpoi": item.C_activpoi,
          "total_reque": parseFloat(item.total_reque),
          "N_metapresup_desc": item.N_metapresup_desc,
          "N_activpoi_desc": item.N_activpoi_desc,
          "N_clapre_desc": item.N_clapre_desc,
          "N_depend_Descripcion": item.N_depend_Descripcion,
          "presupuesto" : [
            {
              "C_fuefin": item.C_fuefin,
              "C_recurso": item.C_recurso,
              "total_precompromiso": parseFloat(item.total_precompromiso ? item.total_precompromiso : 0)
            }
          ]}
        )
      }
      )      
    }


    return contentFormat;
  } catch (error) {
    throw error;
  }
};



const obtenerRequeSaldoPresupItem = async (item) => {  

  const {C_anipre, C_clapre, C_depen, C_secfun, C_objpoi, C_metapoi, C_activpoi} = item;

  let api = UseAxios();

  try {
    let {
      data: { content },
    } = await api.get(`${URL}/reque-saldo-presup-item?anio=${C_anipre}&secfun=${C_secfun}&depen=${C_depen}&clasif=${C_clapre}&meta=${C_metapoi}&obj=${C_objpoi}&actividad=${C_activpoi}`);
    
    return content;
  } catch (error) {
    throw error;
  }
};


const precomprometerRequerimiento = async (anio, numero, tipo, gastos) => {


  const credenciales = {
    ...gastos,
  };

  let api = UseAxios();

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    let {
      data: { content },
    } = await api.post(
      `${URL}/reque-precompromete/${anio}/${numero}/${tipo}`,
      credenciales,
      {
        headers,
      }
    );

    if (content?.length > 0) {
      content = content[0];
    }
    return content;
  } catch (error) {
    throw error;
  }
};

const anularRequerimiento = async (anio, numero, tipo, observaciones) => {


  const credenciales = {
    observaciones,
  };


  console.log(credenciales)
  let api = UseAxios();

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    let {
      data: { message },
    } = await api.delete(
      `${URL}/reque/${anio}/${numero}/${tipo}`,
      {
        headers,
        data: credenciales,
      }
    );
 
    return message;

  } catch (error) {
    throw error;
  }
};

const imprimirRequerimiento = async (anio, numero, tipo) => {
  try {
    let api = UseAxios();

    let URLReque = `${URL}/reque-imprime/${anio}/${numero}/${tipo}`;
    const response =  await api.get(`${URLReque}`, { responseType: 'blob' });
    const file = new Blob([response.data], { type: 'application/pdf' });
    return file;

  } catch (error) {
    throw error;
  }
};


export {
  obtenerAccesoDepen,
  obtenerRequeDepen,
  obtenerRequeById,
  obtenerAniosDepenById,
  obtenerRequeSaldoPresupDepen,
  obtenerBBSSDisponibleOrden,
  grabarRequerimiento,
  obtenerRequerimiento,
  obtenerRequeSaldoPresup,
  obtenerRequeSaldoPresupItem,
  precomprometerRequerimiento,
  anularRequerimiento,
  imprimirRequerimiento
};
