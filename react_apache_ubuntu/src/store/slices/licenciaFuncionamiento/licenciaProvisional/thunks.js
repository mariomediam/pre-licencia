import { obtenerLicProv } from "../../../../services/licFuncService";
import { setLicProv, startLoadingLicProv, setResetValues } from "./licProvSlice";

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

