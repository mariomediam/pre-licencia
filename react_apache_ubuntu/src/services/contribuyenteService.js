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

    return content;
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
      return content(0);
    }

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
};
