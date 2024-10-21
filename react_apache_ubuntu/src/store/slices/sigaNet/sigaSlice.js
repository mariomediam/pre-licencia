import { createSlice } from "@reduxjs/toolkit";

export const sigaNetSlice = createSlice({
    name: "sigaNet",
    initialState: {
        isLoading: false,
        detailedExecution: [],        
    },
    reducers: {
        startLoadingSiga: (state) => {
            console.log("03")
            state.isLoading = true;
            console.log("04")
        },
        finishLoadingSiga: (state) => {
            state.isLoading = false;
        },
        setDetailedExecution: (state, { payload }) => {    
            console.log("09")        
            state.detailedExecution = payload.detailedExecution;
            state.isLoading = false;
            console.log("10")
        },
    },
});

export const { startLoadingSiga, finishLoadingSiga, setDetailedExecution } = sigaNetSlice.actions;