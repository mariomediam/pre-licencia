import { obtenerPlanillaBoleta, obtenerPlanillaBoletasYaGeneradas } from "../../../../services/rrhhService";
import { startLoadingBoletas, setBoletas } from "./boletasSlice";

export const getBoletasGeneradas = (anio, mes) => {
  return async (dispatch, getState) => {    
    dispatch(startLoadingBoletas());
    const data = await obtenerPlanillaBoleta(anio, mes);
  
    dispatch(setBoletas({ boletasGeneradas: data }));
  };
};


export const getPlanillaBoletaYaGeneradas = (anio, mes, tipo, numero) => {
  return async (dispatch, getState) => { 
    dispatch(startLoadingBoletas());
    const data = await obtenerPlanillaBoletasYaGeneradas(anio, mes);
  
    dispatch(setBoletas({ boletasGeneradas: data }));
  };
  } 
