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

export const setCurrentRequerimientoAddItem = (newValues) => {
  return async (dispatch, getState) => {
    const currentReque = getState().requerimiento.currentReque;
    const { requeClasificadores } = currentReque;

    const {
      C_clapre,
      C_secfun,
      C_depen,
      C_activpoi,
      C_objpoi,
      C_metapoi,
      C_item = "",
      Q_requedet_cant,
      C_bieser_unimed,
      C_biesertipo,
      C_bieser,
      Q_requedet_precio,
      c_depen_aux = "",
      N_cnespec_desc = "",
      N_bieser_desc = "", 
      N_unimed_desc = ""
    } = newValues;

    let requeClasificadoresUpdate = [...requeClasificadores];

    const index = requeClasificadoresUpdate.findIndex(
      (elemento) =>
        elemento.C_clapre === C_clapre &&
        elemento.C_secfun === C_secfun &&
        elemento.C_depen === C_depen &&
        elemento.C_activpoi === C_activpoi &&
        elemento.C_objpoi === C_objpoi &&
        elemento.C_metapoi === C_metapoi
    );

    if (index !== -1) {
      const clapreSearched = requeClasificadoresUpdate[index];

      const clapreUpdate = {
        ...clapreSearched,
        items: [
          ...clapreSearched.items,
          {
            C_item,
            Q_requedet_cant,
            C_bieser_unimed,
            C_biesertipo,
            C_bieser,
            Q_requedet_precio,
            c_depen_aux,
            N_cnespec_desc,
            N_bieser_desc,
            N_unimed_desc
          },
        ],
      };

      requeClasificadoresUpdate[index] = clapreUpdate;
    }

    dispatch(
      setCurrent({
        currentReque: {
          ...currentReque,
          requeClasificadores: requeClasificadoresUpdate,
        },
      })
    );
  };
};



export const setCurrentRequerimientoRemoveItem = (removeValues) => {

  return async (dispatch, getState) => {
    const currentReque = getState().requerimiento.currentReque;
    const { requeClasificadores } = currentReque;

    const {
      C_depen, C_item, C_secfun, C_biesertipo, C_bieser, C_activpoi, C_metapoi, C_objpoi, C_clapre
    } = removeValues;

    let requeClasificadoresUpdate = [...requeClasificadores];

    const index = requeClasificadoresUpdate.findIndex(
      (elemento) =>
        elemento.C_clapre === C_clapre &&
        elemento.C_secfun === C_secfun &&
        elemento.C_depen === C_depen &&
        elemento.C_activpoi === C_activpoi &&
        elemento.C_objpoi === C_objpoi &&
        elemento.C_metapoi === C_metapoi
    );

    if (index !== -1) {
      const clapreSearched = requeClasificadoresUpdate[index];

      console.log(clapreSearched.items)
      const items = clapreSearched.items.filter(
        (item) =>
          item.C_item !== C_item ||
          item.C_biesertipo !== C_biesertipo ||
          item.C_bieser !== C_bieser
      );

      console.log(items)

      const clapreUpdate = {
        ...clapreSearched,
        items: items,
      };

      requeClasificadoresUpdate[index] = clapreUpdate;
    }

    dispatch(
      setCurrent({
        currentReque: {
          ...currentReque,
          requeClasificadores: requeClasificadoresUpdate,
        },
      })
    );
  };


}

export const setResetCurrentRequerimiento = () => {
  return (dispatch, getState) => {
    dispatch(setResetCurrent());
  };
};


export const getTotalRequerimiento = () => {
  return (dispatch, getState) => {
    const currentReque = getState().requerimiento.currentReque;
    const { requeClasificadores } = currentReque;

    let total = 0;
    requeClasificadores.forEach((clasificador) => {
      clasificador.items.forEach((item) => {
        total += item.Q_requedet_cant * item.Q_requedet_precio;
      });
    });
    
    return total
    
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
