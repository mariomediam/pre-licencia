import { createSlice } from '@reduxjs/toolkit';

export const boletasEnviadasSlice = createSlice(
    {
        name: "boletasEnviadasSlice",
        initialState: {
            boletasEnvio: [],
            isLoading: false
        },
        reducers: {
            startLoadingBoletasEnvio: (state) => {
                state.isLoading = true;
            },
            setBoletasEnvio: (state, { payload }) => {
                state.isLoading = false;            
                state.boletasEnvio = payload.boletasEnvio;
            }
    
        }
    }

)

export const { startLoadingBoletasEnvio, setBoletasEnvio } = boletasEnviadasSlice.actions