import UseAxios from "../utils/useAxios";

// const URL = `${process.env.REACT_APP_API}/contribuyente`;

const obtenerContribuyentePagination = async (URLBuscarContribuyente) => {
  
    try {
      let api = UseAxios();
       
      let { data } = await api.get(`${URLBuscarContribuyente}&page_size=20`);      
  
      return data;
    } catch (error) {
      throw error;
    }
  };  

  export {
    obtenerContribuyentePagination,
  };