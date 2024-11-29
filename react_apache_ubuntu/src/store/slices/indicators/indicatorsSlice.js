import { createSlice } from "@reduxjs/toolkit";

export const indicatorsSlice = createSlice({
  name: "indicators",
  initialState: {
    indicators: {},
    selectedYear: new Date().getFullYear(),    
    selectedType: "01",
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
    setSelectedType: (state, { payload }) => {
      state.selectedType = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { initialIndicators, setIndicators, setSelectedYear, setSelectedType } = indicatorsSlice.actions;
