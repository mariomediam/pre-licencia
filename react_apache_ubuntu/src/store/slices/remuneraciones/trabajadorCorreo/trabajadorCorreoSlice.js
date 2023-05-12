import { createSlice } from "@reduxjs/toolkit";

export const trabajadorCorreoSlice = createSlice({

    name: "trabajadorCorreo",
    initialState: {
        trabajadorCorreo: [],
        isLoading: false,   
        isSaving: false,
        active: null,     
        messageSaved: '',
    },
    reducers: {
        startLoadingTrabajadorCorreo: (state) => {
            state.isLoading= true
        },
        setTrabajadorCorreo: (state, {payload}) => {
            state.isLoading = false
            state.trabajadorCorreo = payload.trabajadorCorreo
        },       
        setActiveTrabajadorCorreo: (state, {payload}) => {
            console.log({payload})
            state.active = payload
            state.messageSaved = '';
        },
        setSaving: (state ) => {
            state.isSaving = true;
            state.messageSaved = '';
        },

    }
})

export const { startLoadingTrabajadorCorreo, setTrabajadorCorreo, setActiveTrabajadorCorreo} = trabajadorCorreoSlice.actions   