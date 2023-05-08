import { createSlice } from '@reduxjs/toolkit';

export const planillaCorreoSlice = createSlice({

    name: "planillaCorreo",
    initialState: {
        destinatarios: [],
        isLoading: false
    },
    reducers: {
        startLoadingDestinatarios: (state) => {
            state.isLoading= true
        },
        setDestinatarios: (state, {payload}) => {
            state.isLoading = false
            state.destinatarios = payload.destinatarios
        }
    }
})

export const { startLoadingDestinatarios, setDestinatarios} = planillaCorreoSlice.actions   