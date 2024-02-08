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
    console.log(content)
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
      console.log(content)
      return content;
    } catch (error) {
      throw error;
    }
  };
  

export {
    obtenerAccesoDepen,
    obtenerRequeDepen
}