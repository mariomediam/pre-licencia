import { createSlice } from "@reduxjs/toolkit";

export const sigaNetSlice = createSlice({
    name: "sigaNet",
    initialState: {
        isLoading: false,
        detailedExecution: [],        
    },
    reducers: {
        startLoadingSiga: (state) => {
            
            state.isLoading = true;
            
        },
        finishLoadingSiga: (state) => {
            state.isLoading = false;
        },
        setDetailedExecution: (state, { payload }) => {    
                   
            state.detailedExecution = payload.detailedExecution;
            state.isLoading = false;
            
        },
        resetDetailedExecution: (state) => {
            state.detailedExecution = [];
        }
    },
});

export const { startLoadingSiga, finishLoadingSiga, setDetailedExecution, resetDetailedExecution } = sigaNetSlice.actions;