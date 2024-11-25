import { createSlice } from "@reduxjs/toolkit";

export const indicatorsSlice = createSlice({
  name: "indicators",
  initialState: {
    indicators: {},
    currentYear: new Date().getFullYear(),    
  },
  reducers: {
    initialIndicators: (state, { payload }) => {
      state.indicators = payload;
    },
    setIndicators: (state, { payload }) => {
      state.indicators = { ...state.indicators, ...payload };
    },
    setCurrentYear: (state, { payload }) => {
      state.currentYear = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { initialIndicators, setIndicators, setCurrentYear } = indicatorsSlice.actions;
