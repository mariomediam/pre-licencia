import { createSlice } from "@reduxjs/toolkit";

export const siafSlice = createSlice({
  name: "siaf",
  initialState: {
    isLoading: false,
    currentExped: {"anioExped": new Date().getFullYear().toString(), "numeroExped": ""},
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
  },
});

export const { startLoadingSiaf, setCurrentExped, resetCurrenExped } =  siafSlice.actions;
