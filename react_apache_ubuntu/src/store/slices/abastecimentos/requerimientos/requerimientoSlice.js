import { createSlice } from "@reduxjs/toolkit";

const currentRequeDefault = {
  C_reque: "",
  D_reque_fecha: new Date().toISOString().slice(0, 10),
  T_reque_obs: "",
  F_reque_estado: "",
  C_anipre: "",
  C_tipogasto: "",
  C_sf_dep: "",
  C_biesertipo: "",
  C_paayc_version: "",
  C_prosel: "",
  C_convoca: "",
  F_libera_saldo: false,
  C_procseltipo: "",
  C_NroCdroComp: undefined,
  T_referencia_obs: "",
  D_entrega_fecha: undefined,
  D_recepcion_fecha: undefined,
  D_apertuar_fecha: undefined,
  F_proyec: "",
  f_libre: "",
  n_dependencia: "",
  n_jefe_nombre: "",
};

export const requerimientoSlice = createSlice({
  name: "requerimiento",
  initialState: {
    requerimientos: [],
    isLoading: false,
    currentReque: currentRequeDefault,
  },
  reducers: {
    startLoadingReque: (state /* action */) => {
      state.isLoading = true;
    },
    setRequerimientos: (state, { payload }) => {
      state.isLoading = false;
      state.requerimientos = payload.requerimientos;
    },
    setResetValues: (state) => {
      state.isLoading = false;
      state.requerimientos = [];
      state.currentReque = currentRequeDefault;
    },
    setCurrent: (state, { payload }) => {
      state.currentReque = payload.currentReque;
    },
    setResetCurrent: (state) => {
      state.currentReque = currentRequeDefault;
    },
  },
});

// Action creators are generated for each case reducer function
export const { startLoadingReque, setRequerimientos, setResetValues, setCurrent, setResetCurrent} = requerimientoSlice.actions;
