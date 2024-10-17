import { createSlice } from "@reduxjs/toolkit";

export const filterSearchSlice = createSlice({
  name: "filterSearch",
  initialState: {
      filterSearch: {},
  },
  reducers: {

    
    initialFilterSearch: (state, { payload }) => {        
        state.filterSearch = payload;
    },
    setFilterSearch: (state, { payload }) => {
      state.filterSearch = { ...state.filterSearch, ...payload };;
    },
  },
});

// Action creators are generated for each case reducer function
export const { initialFilterSearch, setFilterSearch } =
  filterSearchSlice.actions;
