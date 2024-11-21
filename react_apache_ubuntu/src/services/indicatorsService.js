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

const ComparacionVehiculosAutorizados = async (dia, mes, anio01, anio02) => {
  let credenciales = {};

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    let {
      data: { content },
    } = await axios.get(
      `${URL}/comparacion-vehiculos-autorizados?dia=${dia}&mes=${mes}&anio01=${anio01}&anio02=${anio02}`,
      credenciales,
      { headers }
    );

    return content;
  } catch (error) {
    throw error;
  }
}

export { TranspVigente, VehiculosAutorizadosMes, ComparacionVehiculosAutorizados };
