import { obtenerPlanillaBoleta } from "../../../../services/rrhhService";
import { startLoadingBoletas, setBoletas } from "./boletasSlice";

export const getBoletasGeneradas = (anio, mes) => {
  return async (dispatch, getState) => {
    console.log("Leyendo de BD las boletas generadas")
    dispatch(startLoadingBoletas());
    const data = await obtenerPlanillaBoleta(anio, mes);
  
    dispatch(setBoletas({ boletasGeneradas: data }));
  };
};
