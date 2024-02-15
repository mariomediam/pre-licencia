import UseAxios from "../utils/useAxios";

const URL = `${process.env.REACT_APP_API}/abastec`;


const obtenerAccesoDepen = async (anio, depen = undefined, filtro = undefined) => {
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

const obtenerRequeDepen = async (anio, sfDep, bieSerTipo, field = undefined, valor = undefined, libre = undefined, tipo_gasto = undefined) => {
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
  

export {
    obtenerAccesoDepen,
    obtenerRequeDepen,
    obtenerRequeById,
    obtenerAniosDepenById
}