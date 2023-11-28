import { agregarLicProvUbica, obtenerLicProvUbica, actualizarLicProvUbica, eliminarLicProvUbica } from "../../../../services/licFuncService";
import { setLicProvUbica, startLoadingLicProvUbica, finishLoadingLicProvUbica } from "./licProvUbicaSlice";

export const getListarLicProvUbica = (tipo) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingLicProvUbica());
    const data = await obtenerLicProvUbica({
      tipo,
    });
    dispatch(setLicProvUbica({ licProvUbica: data }));
  };
};


export const startAddLicProvUbica = (ubicacion) => {
  return async (dispatch, getState) => {

    try {
      dispatch(startLoadingLicProvUbica());          
      const ubicacionAdd = await agregarLicProvUbica(ubicacion);
      return ubicacionAdd;
    } catch (error) {      
      throw new Error(error.response.data.message);
    } finally {
      dispatch(finishLoadingLicProvUbica());
    }   
    
  };
}

export const startUpdateLicProvUbica = (ubicacion) => {
  return async (dispatch, getState) => {

    try {
      dispatch(startLoadingLicProvUbica());          
      const ubicacionUpdate = await actualizarLicProvUbica(ubicacion);
      return ubicacionUpdate;
    } catch (error) {      
      throw new Error(error.response.data.message);
    } finally {
      dispatch(finishLoadingLicProvUbica());
    }   
    
  };
}

export const startDeleteLicProvUbica = (ubicaId) => {
  return async (dispatch, getState) => {

    try {
      dispatch(startLoadingLicProvUbica());          
      await eliminarLicProvUbica(ubicaId);      
    } catch (error) {      
      throw new Error(error.response.data.message);
    } finally {
      dispatch(finishLoadingLicProvUbica());
    }   
    
  };
}