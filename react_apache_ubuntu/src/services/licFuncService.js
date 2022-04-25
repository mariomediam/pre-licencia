import UseAxios from "../utils/useAxios";

const URL = `${process.env.REACT_APP_API}/licfunc`;

const obtenerPrecalUsuEstado = async (login, estado) => {
  try {
    let api = UseAxios();

    let URLPrecalUsuEstado = `${URL}/precal-usu-estado?login=${login}`;

    if (estado) {
      URLPrecalUsuEstado = `${URLPrecalUsuEstado}&estado=${estado}`;
    }

    let {
      data: { content },
    } = await api.get(`${URLPrecalUsuEstado}`);

    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerPrecalificacionPorId = async (precalId) => {
  try {
    let api = UseAxios();

    let URLPrecalificacion = `${URL}/precalificacion/${precalId}`;

    let {
      data: { content },
    } = await api.get(`${URLPrecalificacion}`);

    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerGirosPorPrecalId = async (precalId) => {
  try {
    let api = UseAxios();

    let URLPrecalificacion = `${URL}/precal-giro-neg/${precalId}`;

    let {
      data: { content },
    } = await api.get(`${URLPrecalificacion}`);

    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerCuestionarioPorPrecalId = async (precalId) => {
  try {
    let api = UseAxios();

    let URLPrecalificacion = `${URL}/precal-cuestionario/${precalId}`;

    let {
      data: { content },
    } = await api.get(`${URLPrecalificacion}`);

    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerEvaluacionPorPrecalIdTipoEval = async (precalId, tipoEvalId) => {
  try {
    let api = UseAxios();

    let URLPrecalificacion = `${URL}/precal-eval/${precalId}/${tipoEvalId}`;

    let {
      data: { content },
    } = await api.get(`${URLPrecalificacion}`);

    if (content && tipoEvalId === 3) {

      let miTipoLicencia = content.precalificacion?.tipoLicencia || "None";

      if (miTipoLicencia && miTipoLicencia.length > 0) {


        let URLTipoLicencia = `${URL}/tipo-licencia/${miTipoLicencia}`;

        let {
          data: { content: contTipoLic },
        } = await api.get(`${URLTipoLicencia}`);

        return { ...content, tipoLicencia: contTipoLic };
      } else {

        return content;
      }
    } else {

      return content;
    }
  } catch (error) {
    throw error;
  }
};

const obtenerUsuarioTipoEval = async (login, tipoEvalId = undefined) => {
  try {
    let api = UseAxios();

    let URLAccesos = `${URL}/eval-usu/${login}`;

    let {
      data: { content },
    } = await api.get(`${URLAccesos}`);

    if (tipoEvalId) {
      return content.filter((row) => row.tipoEval === tipoEvalId);
    } else {
      return content;
    }
  } catch (error) {
    throw error;
  }
};

const agregarEvaluacion = async (
  precalificacion,
  tipoEval,
  precalEvalComent,
  precalEvalDigitUser,
  precalEvalDigitPC,
  resultEval,
  precalRiesgo = undefined,
  documentosSelecc = undefined,
  tipoLicencia = undefined
) => {
  let credenciales = {
    precalificacion: precalificacion,
    tipoEval: tipoEval,
    precalEvalComent: precalEvalComent,
    precalEvalDigitUser: precalEvalDigitUser,
    precalEvalDigitPC: precalEvalDigitPC,
    resultEval: resultEval,
    precalRiesgo: precalRiesgo,
    documentos: documentosSelecc,
    tipoLicencia: tipoLicencia,
  };

  let api = UseAxios();

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    let {
      data: { content },
    } = await api.post(`${URL}/precal-eval/${precalificacion}`, credenciales, {
      headers,
    });

    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerDocumPorPrecalIdTipoEval = async (precalId, tipoEvalId) => {
  try {
    let api = UseAxios();

    let URLDocumentacion = `${URL}/precal-eval-docum/${precalId}/${tipoEvalId}`;

    let {
      data: { content },
    } = await api.get(`${URLDocumentacion}`);

    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerTipoDocum = async () => {
  try {
    let api = UseAxios();

    let URLTipoDocum = `${URL}/tipo-docum`;

    let {
      data: { content },
    } = await api.get(`${URLTipoDocum}`);

    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerTipoLicencia = async () => {
  try {
    let api = UseAxios();

    let URLTipoLicencia = `${URL}/tipo-licencia`;

    let {
      data: { content },
    } = await api.get(`${URLTipoLicencia}`);

    return content;
  } catch (error) {
    throw error;
  }
};

export {
  obtenerPrecalUsuEstado,
  obtenerPrecalificacionPorId,
  obtenerGirosPorPrecalId,
  obtenerCuestionarioPorPrecalId,
  obtenerEvaluacionPorPrecalIdTipoEval,
  obtenerUsuarioTipoEval,
  agregarEvaluacion,
  obtenerDocumPorPrecalIdTipoEval,
  obtenerTipoDocum,
  obtenerTipoLicencia,
};
