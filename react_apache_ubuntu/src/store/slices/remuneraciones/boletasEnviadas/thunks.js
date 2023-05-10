import { obtenerBoletaEnvio } from "../../../../services/rrhhService";
import { startLoadingBoletasEnvio, setBoletasEnvio } from "./boletasEnviadasSlice";

export const getBoletasEnvio = (anio, mes, tipo, numero) => {
    return async (dispatch, getState) => {    
      dispatch(startLoadingBoletasEnvio());
      const data = await obtenerBoletaEnvio(anio, mes, tipo, numero);
    
      dispatch(setBoletasEnvio({ boletasEnvio: data }));
    };
  };