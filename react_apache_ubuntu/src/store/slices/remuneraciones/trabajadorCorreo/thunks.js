import { obtenerTrabajadorCorreo } from "../../../../services/rrhhService";
import {
  setTrabajadorCorreo,
  startLoadingTrabajadorCorreo,
} from "./trabajadorCorreoSlice";

export const startGetTrabajadorCorreo = (valor) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingTrabajadorCorreo());
    console.log("se ejecuto startGetTrabajadorCorreo");
    const data = await obtenerTrabajadorCorreo(valor);
    dispatch(setTrabajadorCorreo({ trabajadorCorreo: data }));
  };
};
