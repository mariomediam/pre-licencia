import {
  enviarBoletas,
  obtenerPlanillaCorreos,
} from "../../../../services/rrhhService";
import {
  setDestinatarios,
  startLoadingDestinatarios,
  setSendingMails,
} from "./planillaCorreosSlice";

export const getPlanillasCorreo = (anio, mes, tipo, numero) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingDestinatarios());    
    const data = await obtenerPlanillaCorreos(anio, mes, tipo, numero);

    dispatch(setDestinatarios({ destinatarios: data }));
  };
};

export const startSendingMails = (anio, mes, tipo, numero, correos) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setSendingMails(true));
      await enviarBoletas(anio, mes, tipo, numero, correos);      
    } catch (error) {      
      throw new Error(error.response.data.message);
    } finally {
      dispatch(setSendingMails(false));
    }    
  };
};
