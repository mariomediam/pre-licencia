import { obtenerPlanillaDetalle } from "../../../../services/rrhhService";
import { startLoadingPlanilla, setPlanilla } from "./planillaSlice";

export const getPlanilla = (anio, mes, tipo, numero) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingPlanilla());
    const data = await obtenerPlanillaDetalle(anio, mes, tipo, numero);
    dispatch(setPlanilla({ detalle: data }));
  };
};
