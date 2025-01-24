import { createSlice } from "@reduxjs/toolkit";

const initialSecuencia = {"anioExped": "", "numeroExped": "", "secuencia": "", "correlativo": ""}


export const siafSlice = createSlice({
  name: "siaf",
  initialState: {
    isLoading: false,
    currentExped: {"anioExped": new Date().getFullYear().toString(), "numeroExped": ""},
    currentSecuencia: initialSecuencia,
  },
  reducers: {
    startLoadingSiaf: (state) => {
      state.isLoading = true;
    },
    setCurrentExped: (state, { payload }) => {
      state.currentExped = payload.currentExped;
      state.isLoading = false;
    },
    resetCurrenExped: (state) => {
      state.currentExped = {};
    },
    setCurrentSecuencia: (state, { payload }) => {
      state.currentSecuencia = payload.currentSecuencia;     
    },
    resetCurrentSecuencia: (state) => {
      state.currentSecuencia = initialSecuencia;
    }
  },
});

export const { startLoadingSiaf, setCurrentExped, resetCurrenExped, setCurrentSecuencia, resetCurrentSecuencia } =  siafSlice.actions;
