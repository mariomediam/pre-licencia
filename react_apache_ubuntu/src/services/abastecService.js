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

export {
  obtenerAccesoDepen,
  obtenerRequeDepen,
  obtenerRequeById,
  obtenerAniosDepenById,
  obtenerRequeSaldoPresupDepen,
  obtenerBBSSDisponibleOrden,
  grabarRequerimiento,
  obtenerRequerimiento,
};
