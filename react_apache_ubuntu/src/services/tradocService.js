import UseAxios from "../utils/useAxios";

const URL = `${process.env.REACT_APP_API}/tradoc`;

const obtenerExpedientePorNroAnio = async (numero, anio) => {
    try {
      let api = UseAxios();

      numero = numero.toString().padStart(8, "0");
  
      let URLExpediente = `${URL}/expedientes/${numero}/${anio}`;
  
      let {
        data: { content },
      } = await api.get(`${URLExpediente}`);

  
  
      return content;
    } catch (error) {
      throw error;
    }
  };



const SelectDependencia = async (params) => {
  const { ano, field, valor, solo_activas } = params;
  let credenciales = {};
  let api = UseAxios();
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    let {
      data: { content },
    } = await api.get(`${URL}/select-dependencia?ano=${ano}&field=${field}&valor=${valor}&solo_activas=${solo_activas}`, credenciales, { headers });
    return content;
  }
  catch (error) {
    throw error;
  }
}

  export {
    obtenerExpedientePorNroAnio,
    SelectDependencia,
  }