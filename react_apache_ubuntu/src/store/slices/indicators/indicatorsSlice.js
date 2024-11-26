import { createSlice } from "@reduxjs/toolkit";

export const indicatorsSlice = createSlice({
  name: "indicators",
  initialState: {
    indicators: {},
    selectedYear: new Date().getFullYear(),    
  },
  reducers: {
    initialIndicators: (state, { payload }) => {
      state.indicators = payload;
    },
    setIndicators: (state, { payload }) => {
      state.indicators = { ...state.indicators, ...payload };
    },
    setSelectedYear: (state, { payload }) => {      
      state.selectedYear = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { initialIndicators, setIndicators, setSelectedYear } = indicatorsSlice.actions;
