import { createSlice } from '@reduxjs/toolkit';

export const planillaSlice = createSlice({
    name: 'planilla',
    initialState: {
        detalle: [],
        isLoading: false,
    },
    reducers: {
        startLoadingPlanilla: (state, /* action */ ) => {
            state.isLoading = true;
        },
        setPlanilla: (state, { payload }) => {
            state.isLoading = false;            
            state.detalle = payload.detalle;
        }
    }
});


// Action creators are generated for each case reducer function
export const { startLoadingPlanilla, setPlanilla } = planillaSlice.actions;