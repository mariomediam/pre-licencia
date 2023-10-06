import { obtenerLicProv } from "../../../../services/licFuncService";
import { setLicProv, startLoadingLicProv } from "./licProvSlice";

export const getBuscarLicProv = (tipo, campo, valor) => {
  return async (dispatch, getState) => {    
    dispatch(startLoadingLicProv());
    const data = await obtenerLicProv(tipo, campo, valor)
    console.log(data)
    dispatch(setLicProv({ licProv: data }));
  };
};

