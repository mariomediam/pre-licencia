import { obtenerLicProv } from "../../../../services/licFuncService";
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

export const setCurrentLicProv = (currentLicProv) => {
  return (dispatch, getState) => {    
    dispatch(setCurrent({ currentLicProv }));
  };  
}

export const setExpedSolici = () => {
  return async (dispatch, getState) => {
    const currentLicProv = getState().licProv.currentLicProv   
    const { C_Exped, C_Exped_Anio } = currentLicProv
    const { ExpedSolici } = await obtenerExpedientePorNroAnio(C_Exped, C_Exped_Anio)
    
    dispatch(setCurrentLicProv({ ...currentLicProv, C_LicProv_TitCod: ExpedSolici?.trim() || "" }))

  }
}

export const setResetCurrentLicProv = () => {
  return (dispatch, getState) => {    
    dispatch(setResetCurrent());
  };  
}





  