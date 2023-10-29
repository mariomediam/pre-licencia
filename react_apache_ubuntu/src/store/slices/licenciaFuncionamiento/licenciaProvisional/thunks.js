import { obtenerLicProv, gestionarLicProv } from "../../../../services/licFuncService";
import { obtenerExpedientePorNroAnio } from "../../../../services/tradocService";
import { setLicProv, startLoadingLicProv, setResetValues, setCurrent, setResetCurrent } from "./licProvSlice";

export const getBuscarLicProv = (tipo, campo, valor) => {
  return async (dispatch, getState) => {    
    dispatch(startLoadingLicProv());
    const data = await obtenerLicProv(tipo, campo, valor)    
    dispatch(setLicProv({ licProv: data }));
  };
};


export const setResetLicProv = () => {
  return (dispatch, getState) => {    
    dispatch(setResetValues());
  };  
}

export const setCurrentLicProv = (newValues) => {  
  return (dispatch, getState) => {    
    const currentLicProv = getState().licProv.currentLicProv 
    dispatch(setCurrent({currentLicProv: { ...currentLicProv, ...newValues }}));
  };  
}

export const setExpedSolici = () => {
  return async (dispatch, getState) => {
    const currentLicProv = getState().licProv.currentLicProv   
    const { licProvExpNro, licProvExpAnio } = currentLicProv
    const { ExpedSolici } = await obtenerExpedientePorNroAnio(licProvExpNro, licProvExpAnio)
    
    dispatch(setCurrentLicProv({ ...currentLicProv, licProvTitCod: ExpedSolici?.trim() || "" }))

  }
}

export const setResetCurrentLicProv = () => {
  return (dispatch, getState) => {    
    dispatch(setResetCurrent());
  };  
}

export const saveCurrentLicProv = (accion) => {
  return async (dispatch, getState) => {
    try {
      let currentLicProv = getState().licProv.currentLicProv;
      currentLicProv = {...currentLicProv, accion: accion}      
      const data = await gestionarLicProv(currentLicProv);      
      const {licProvId, licProvNro, licProvRenov} = data
      dispatch(setCurrent({"currentLicProv": { ...currentLicProv, ...data }}));  
      return {licProvId, licProvNro, licProvRenov}      
    } catch (error) {

      throw error;
    }
    
  }
}