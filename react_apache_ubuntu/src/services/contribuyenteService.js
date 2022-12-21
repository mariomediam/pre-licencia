import UseAxios from "../utils/useAxios";

const URL = `${process.env.REACT_APP_API}/contribuyente`;

const obtenerContribuyentePagination = async (URLBuscarContribuyente) => {
  try {
    let api = UseAxios();

    let { data } = await api.get(`${URLBuscarContribuyente}&page_size=20`);

    return data;
  } catch (error) {
    throw error;
  }
};

const obtenerContribuyenteDocumento = async (codigoContrib) => {
  try {
    let api = UseAxios();

    let URLContribDocumento = `${URL}/consultar-contribuyente-documento?codigo=${codigoContrib}`;

    let {
      data: { content },
    } = await api.get(`${URLContribDocumento}`);

    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerContribuyenteTelefono = async (codigoContrib) => {
  try {
    let api = UseAxios();

    let URLContribTelefono = `${URL}/consultar-contribuyente-telefono?codigo=${codigoContrib}`;

    let {
      data: { content },
    } = await api.get(`${URLContribTelefono}`);

    return content.map((obj) => ({
      ...obj,
      telefId: obj.TipTel.trim() + obj.Número.trim(),
    }));
  } catch (error) {
    throw error;
  }
};

const obtenerContribuyenteDirElect = async (codigoContrib) => {
  try {
    let api = UseAxios();

    let URLContribDirElect = `${URL}/consultar-contribuyente-direlect?codigo=${codigoContrib}`;

    let {
      data: { content },
    } = await api.get(`${URLContribDirElect}`);

    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerContribuyenteNacion = async (codigoContrib) => {
  try {
    let api = UseAxios();

    let URLContribNacion = `${URL}/consultar-contribuyente-nacion?codigo=${codigoContrib}`;

    let {
      data: { content },
    } = await api.get(`${URLContribNacion}`);

    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerContribuyenteCodigo = async (codigoContrib) => {
  try {
    let api = UseAxios();

    let URLContribCodigo = `${URL}/buscar-contribuyente-codigo?codigo=${codigoContrib}`;

    let {
      data: { content },
    } = await api.get(`${URLContribCodigo}`);

    if (content.length > 0) {
      return content[0];
    }

    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerTipoContribuyente = async () => {
  try {
    let api = UseAxios();

    let URLTipoContrib = `${URL}/tipo-contribuyente`;

    let {
      data: { content },
    } = await api.get(`${URLTipoContrib}`);

    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerLugarGeneral = async (
  codigo,
  nombre,
  tipoLugar,
  sector,
  calificacion,
  dpto,
  prov,
  dist
) => {
  try {
    let api = UseAxios();

    let urlFiltro = "";

    if (codigo && codigo.trim().length > 0) {
      urlFiltro += `&codigo=${codigo}`;
    }
    if (nombre && nombre.trim().length > 0) {
      urlFiltro += `&nombre=${nombre}`;
    }
    if (tipoLugar && tipoLugar.trim().length > 0) {
      urlFiltro += `&tiplug=${tipoLugar}`;
    }
    if (sector && sector.trim().length > 0) {
      urlFiltro += `&sector=${sector}`;
    }
    if (calificacion && calificacion.trim().length > 0) {
      urlFiltro += `&calif=${calificacion}`;
    }
    if (dpto && dpto.trim().length > 0) {
      urlFiltro += `&dpto=${dpto}`;
    }
    if (prov && prov.trim().length > 0) {
      urlFiltro += `&prov=${prov}`;
    }
    if (dist && dist.trim().length > 0) {
      urlFiltro += `&dist=${dist}`;
    }

    if (urlFiltro.trim().length === 0) {
      throw new Error("Debe ingresar filtros");
    }

    let URLLugar = encodeURI(`${URL}/consultar-lugar-general?${urlFiltro}`);

    let {
      data: { content },
    } = await api.get(`${URLLugar}`);

    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerLugarPagination = async (URLLugar) => {
  try {
    let api = UseAxios();

    let { data } = await api.get(`${URLLugar}&page_size=20`);

    return data;
  } catch (error) {
    throw error;
  }
};

const obtenerCalleGeneral = async (codigo, nombre) => {
  try {
    let api = UseAxios();

    let urlFiltro = "";

    if (codigo && codigo.trim().length > 0) {
      urlFiltro += `&codigo=${codigo}`;
    }
    if (nombre && nombre.trim().length > 0) {
      urlFiltro += `&nombre=${nombre}`;
    }

    if (urlFiltro.trim().length === 0) {
      throw new Error("Debe ingresar filtros");
    }

    let URLLugar = encodeURI(`${URL}/consultar-lugar-general?${urlFiltro}`);

    let {
      data: { content },
    } = await api.get(`${URLLugar}`);

    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerCallePagination = async (URLCalle) => {
  try {
    let api = UseAxios();

    let { data } = await api.get(`${URLCalle}&page_size=20`);

    return data;
  } catch (error) {
    throw error;
  }
};

const obtenerTipoDocumento = async () => {
  try {
    let api = UseAxios();

    let URLTipoDocumento = `${URL}/tipo-documento`;

    let {
      data: { content },
    } = await api.get(`${URLTipoDocumento}`);

    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerDocumentoTipoNro = async (tipo, numero) => {
  try {
    let api = UseAxios();

    let urlFiltro = "";

    if (tipo && tipo.trim().length > 0) {
      urlFiltro += `&tipo=${tipo}`;
    }
    if (numero && numero.trim().length > 0) {
      urlFiltro += `&numero=${numero}`;
    }

    if (urlFiltro.trim().length === 0) {
      throw new Error("Debe ingresar filtros");
    }

    let URLLugar = encodeURI(`${URL}/consultar-documento-tiponro?${urlFiltro}`);

    let {
      data: { content },
    } = await api.get(`${URLLugar}`);

    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerTipoTelefono = async () => {
  try {
    let api = UseAxios();

    let URLTipoTelefono = `${URL}/tipo-telefono`;

    let {
      data: { content },
    } = await api.get(`${URLTipoTelefono}`);

    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerTipoNacion = async () => {
  try {
    let api = UseAxios();

    let URLNacion = `${URL}/tipo-nacion`;

    let {
      data: { content },
    } = await api.get(`${URLNacion}`);

    return content;
  } catch (error) {
    throw error;
  }
};

const updateContribuyenteAll = async (codigoContrib, contribuyenteAll) => {
  let api = UseAxios();

  try {

    
    const headers = {
      "Content-Type": "application/json",
    };

    let {
      data: { content }
    } = await api.post(
      `${URL}/actualizar-all/${codigoContrib}`,
      contribuyenteAll,
      {
        headers,
      }
    );
    return content;
  } catch (error) {
    throw error;
  }
};

const insertContribuyenteAll = async (codigoContrib, contribuyenteAll) => {
  let api = UseAxios();

  try {

    
    const headers = {
      "Content-Type": "application/json",
    };

    let {
      data: { content }
    } = await api.post(
      `${URL}/insertar-all/${codigoContrib}`,
      contribuyenteAll,
      {
        headers,
      }
    );
    return content;
  } catch (error) {
    throw error;
  }
};

const consultarContribuyenteCodigo = async (codigoContrib) => {
  try {
    let api = UseAxios();

    let URLContribCodigo = `${URL}/consultar-contribuyente-codigo?codigo=${codigoContrib}`;

    let {
      data: { content },
    } = await api.get(`${URLContribCodigo}`);

    if (content.length > 0) {
      return content[0];
    }

    return content;
  } catch (error) {
    throw error;
  }
};

const obtenerCorrelativoCodContribuyente = async () => {
  try {
    let api = UseAxios();

    let URLCorrelativo = `${URL}/generar-correlativo`;

    let {
      data: { content },
    } = await api.get(`${URLCorrelativo}`);

    return content;
  } catch (error) {
    throw error;
  }
};

const verificaNombreContribuyente = async (tipoContrib, nombreContrib) => {
  try {
    let api = UseAxios();

    let credenciales = {
      tipoContrib: tipoContrib,
      nombreCompleto: nombreContrib
    };

    const headers = {
      "Content-Type": "application/json",
    };

    let URLValidaNombre = `${URL}/verifica-contribuyente-nombre`;

    let {
      data: { content },
    } = await api.post(
      `${URLValidaNombre}`,
      credenciales,
      {
        headers,
      }
    );

    return content;
  } catch (error) {
    throw error;
  }
};





export {
  obtenerContribuyentePagination,
  obtenerContribuyenteDocumento,
  obtenerContribuyenteTelefono,
  obtenerContribuyenteDirElect,
  obtenerContribuyenteNacion,
  obtenerContribuyenteCodigo,
  obtenerTipoContribuyente,
  obtenerLugarGeneral,
  obtenerLugarPagination,
  obtenerCalleGeneral,
  obtenerCallePagination,
  obtenerTipoDocumento,
  obtenerDocumentoTipoNro,
  obtenerTipoTelefono,
  obtenerTipoNacion,
  updateContribuyenteAll,
  insertContribuyenteAll,
  consultarContribuyenteCodigo,
  obtenerCorrelativoCodContribuyente,
  verificaNombreContribuyente,
};
