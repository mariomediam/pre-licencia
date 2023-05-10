import { createSlice } from '@reduxjs/toolkit';

export const planillaCorreoSlice = createSlice({

    name: "planillaCorreo",
    initialState: {
        destinatarios: [],
        isLoading: false,
        isSendingMails: false
    },
    reducers: {
        startLoadingDestinatarios: (state) => {
            state.isLoading= true
        },
        setDestinatarios: (state, {payload}) => {
            state.isLoading = false
            state.destinatarios = payload.destinatarios
        },
        setSendingMails: (state, {payload}) => {
            state.isSendingMails = payload
        }

    }
})

export const { startLoadingDestinatarios, setDestinatarios, setSendingMails} = planillaCorreoSlice.actions   