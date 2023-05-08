import { obtenerPlanillaCorreos } from "../../../../services/rrhhService";
import { setDestinatarios, startLoadingDestinatarios } from "./planillaCorreosSlice";

export const getPlanillasCorreo = (anio, mes, tipo, numero) => {
    return async (dispatch, getState) => {    
        dispatch(startLoadingDestinatarios());
        console.log("se ejecuto getPlanillasCorreo")
        const data = await obtenerPlanillaCorreos(anio, mes, tipo, numero);
        
        dispatch(setDestinatarios({ destinatarios: data }));
      };
}