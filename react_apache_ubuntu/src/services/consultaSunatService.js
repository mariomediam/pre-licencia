import UseAxios from "../utils/useAxios";

const URL = `${process.env.REACT_APP_API}`;

const obtenerConsultaSunat = async (nroRuc) => {
  try {
    let api = UseAxios();

    let URLConsultaReniec = `${URL}/buscar-sunat?numero=${nroRuc}`;

    let {
      data
    } = await api.get(`${URLConsultaReniec}`);
    
    return data;
  } catch (error) {
    throw error;
  }
};

export { obtenerConsultaSunat };
