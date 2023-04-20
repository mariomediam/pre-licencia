import { createSlice } from '@reduxjs/toolkit';

export const boletasSlice = createSlice({
    name: 'boletas',
    initialState: {
        boletasGeneradas: [],
        isLoading: false,
    },
    reducers: {
        startLoadingBoletas: (state, /* action */ ) => {
            state.isLoading = true;
        },
        setBoletas: (state, { payload }) => {
            state.isLoading = false;            
            state.boletasGeneradas = payload.boletasGeneradas;
        }
    }
});


// Action creators are generated for each case reducer function
export const { startLoadingBoletas, setBoletas } = boletasSlice.actions;