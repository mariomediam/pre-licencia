import {
  obtenerRequeById,
  obtenerAniosDepenById,
} from "../../../../services/abastecService";
import { obtenerJefeDepen } from "../../../../services/generalService";

// import { obtenerExpedientePorNroAnio } from "../../../../services/tradocService";
import {
  startLoadingReque,
  setRequerimientos,
  setResetValues,
  setCurrent,
  setResetCurrent,
} from "./requerimientoSlice";

// export const getBuscarLicProv = (tipo, campo, valor) => {
//   return async (dispatch, getState) => {
//     dispatch(startLoadingLicProv());
//     const data = await obtenerLicProv(tipo, campo, valor)
//     dispatch(setLicProv({ licProv: data }));
//   };
// };

export const setResetRequerimiento = () => {
  return (dispatch, getState) => {
    dispatch(setResetValues());
  };
};

export const setCurrentRequerimiento = (newValues) => {
  return async (dispatch, getState) => {

    const currentReque = getState().requerimiento.currentReque;

    if (newValues.C_anipre && newValues.C_sf_dep) {
      const aniosDependencias = await obtenerAniosDepenById(
        newValues.C_anipre,
        newValues.C_sf_dep
      );

      const jefeDepen = await obtenerJefeDepen(
        newValues.C_anipre,
        newValues.C_sf_dep
      );

      newValues = {
        ...newValues,
        n_dependencia: aniosDependencias.n_dependencia_desc?.trim() || "",
        n_jefe_nombre: jefeDepen.N_TRABA_NOMBRE?.trim() || "",
      };
    }

  
    

    dispatch(
      setCurrent({
        currentReque: {
          ...currentReque,
          ...newValues,
          
        },
      })
    );
  };
};

// export const setExpedSolici = () => {
//   return async (dispatch, getState) => {
//     const currentLicProv = getState().licProv.currentLicProv
//     const { licProvExpNro, licProvExpAnio } = currentLicProv
//     const { ExpedSolici } = await obtenerExpedientePorNroAnio(licProvExpNro, licProvExpAnio)

//     dispatch(setCurrentLicProv({ ...currentLicProv, licProvTitCod: ExpedSolici?.trim() || "" }))

//   }
// }

export const setResetCurrentRequerimiento = () => {
  return (dispatch, getState) => {
    dispatch(setResetCurrent());
  };
};

// export const saveCurrentLicProv = (accion) => {
//   return async (dispatch, getState) => {
//     try {
//       let currentLicProv = getState().licProv.currentLicProv;
//       currentLicProv = {...currentLicProv, accion: accion}
//       const data = await gestionarLicProv(currentLicProv);
//       const {licProvId, licProvNro, licProvRenov} = data
//       dispatch(setCurrent({"currentLicProv": { ...currentLicProv, ...data }}));
//       return {licProvId, licProvNro, licProvRenov}
//     } catch (error) {

//       throw error;
//     }

//   }
// }
