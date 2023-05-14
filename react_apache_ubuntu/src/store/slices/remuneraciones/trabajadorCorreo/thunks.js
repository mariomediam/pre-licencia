import { obtenerTrabajadorCorreo, actualizarTrabajadorCorreo, eliminarTrabajadorCorreo } from "../../../../services/rrhhService";
import {
  setTrabajadorCorreo,
  startLoadingTrabajadorCorreo,
  setIsSaving,
} from "./trabajadorCorreoSlice";

export const startGetTrabajadorCorreo = (valor) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingTrabajadorCorreo());    
    const data = await obtenerTrabajadorCorreo(valor);
    dispatch(setTrabajadorCorreo({ trabajadorCorreo: data }));
  };
};

export const startUpdateTrabajadorCorreo = (dni, correo) => {
  return async (dispatch, getState) => {

    try {
      dispatch(setIsSaving(true));    
      await actualizarTrabajadorCorreo(dni, correo);
    } catch (error) {      
      throw new Error(error.response.data.message);
    } finally {
      dispatch(setIsSaving(false));
    }   
    
  };
}

export const startDeleteTrabajadorCorreo = (dni) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setIsSaving(true));    
      await eliminarTrabajadorCorreo(dni);
    } catch (error) {      
      throw new Error(error.response.data.message);
    } finally {
      dispatch(setIsSaving(false));
    }   
  };
}
