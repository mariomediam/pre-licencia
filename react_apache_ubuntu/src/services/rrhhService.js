import UseAxios from "../utils/useAxios";

const URL = `${process.env.REACT_APP_API}/rrhh`;

const obtenerPlanillaBoleta = async (
  anio,
  mes,
  tipo = undefined,
  numero = undefined
) => {
  try {
    let api = UseAxios();

    let URLPlanillas = `${URL}/lista-planilla-boleta?anio=${anio}&mes=${mes}`;

    if (tipo) {
      URLPlanillas += `&tipo=${tipo}`;
    }

    if (numero) {
      URLPlanillas += `&numero=${numero}`;
    }

    let {
      data: { content },
    } = await api.get(`${URLPlanillas}`);

    if (tipo && numero) {      
      if (content.length === 0) {
        return {};
      }
      if (content.length === 1) {
        return content[0];
      }
    }

    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerPlanillaDetalle = async (anio, mes, tipo, numero) => {
  try {
    let api = UseAxios();

    let URLPlanilla = `${URL}/lista-planilla-detalle?anio=${anio}&mes=${mes}&tipo=${tipo}&numero=${numero}`;

    let {
      data: { content },
    } = await api.get(`${URLPlanilla}`);

    return content;
  } catch (error) {
    throw error;
  }
};



const generaBoletasPdf = async (anio, mes, tipo, numero) => {
  try {
    let api = UseAxios();

    let credenciales = {
     anio,
     mes,
      tipo,
      numero,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    let URLGeneraBoletas = `${URL}/genera-boletas/`;

    let {
      data: { message },
    } = await api.post(`${URLGeneraBoletas}`, credenciales, {
      headers,
    });

    return message;
  } catch (error) {
    throw error;
  }
};

const obtenerPlanillaBoletasYaGeneradas = async (
  anio,
  mes,
  tipo = undefined,
  numero = undefined
) => {
  try {    
    let api = UseAxios();

    let URLPlanillas = `${URL}/lista-planilla-generado?anio=${anio}&mes=${mes}`;

    if (tipo) {
      URLPlanillas += `&tipo=${tipo}`;
    }

    if (numero) {
      URLPlanillas += `&numero=${numero}`;
    }

    let {
      data: { content },
    } = await api.get(`${URLPlanillas}`);

    if (tipo && numero) {      
      if (content.length === 0) {
        return {};
      }
      if (content.length === 1) {
        return content[0];
      }
    }

    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerPlanillaCorreos = async (
  anio,
  mes,
  tipo,
  numero
) => {
  try {    
    let api = UseAxios();

    let URLPlanillasCorreo = `${URL}/lista-planilla-correo?anio=${anio}&mes=${mes}&tipo=${tipo}&numero=${numero}`;
    
    let {
      data: { content },
    } = await api.get(`${URLPlanillasCorreo}`);
   
    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerTipoPlanillaXTipo = async (
  tipo
) => {
  try {    
    let api = UseAxios();

    let URLTipoPlanilla = `${URL}/tipo-planilla-xtipo?tipo=${tipo}`;

    let {
      data: { content },
    } = await api.get(`${URLTipoPlanilla}`);
   
    if (content.length === 0) {
      return {};
    }
    if (content.length === 1) {
      return content[0];
    }
    return content
  } catch (error) {
    throw error;
  }
};

const enviarBoletas = async (anio, mes, tipo, numero, destinatarios) => {
  try {
    let api = UseAxios();

    let credenciales = {
     anio,
     mes,
      tipo,
      numero,
      destinatarios,
    };

    console.log({credenciales})

    const headers = {
      "Content-Type": "application/json",
    };

    let URLEnviarBoletas = `${URL}/enviar-boletas/`;

    let {
      data: { message },
    } = await api.post(`${URLEnviarBoletas}`, credenciales, {
      headers,
    });

    return message;
  } catch (error) {
    throw error;
  }
};

const obtenerBoletaEnvio = async (anio, mes, tipo, numero) => {
  try {
    let api = UseAxios();

    let URLBoletaEnvio = `${URL}/lista-boleta-envio?anio=${anio}&mes=${mes}&tipo=${tipo}&numero=${numero}`;

    let {
      data: { content },
    } = await api.get(`${URLBoletaEnvio}`);

    return content;
  } catch (error) {
    throw error;
  }
};



export { obtenerPlanillaBoleta, obtenerPlanillaDetalle, generaBoletasPdf, obtenerPlanillaBoletasYaGeneradas, obtenerPlanillaCorreos, obtenerTipoPlanillaXTipo, enviarBoletas, obtenerBoletaEnvio };
