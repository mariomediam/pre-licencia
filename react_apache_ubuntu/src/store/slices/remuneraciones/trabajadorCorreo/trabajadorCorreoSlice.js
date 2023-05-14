import { createSlice } from "@reduxjs/toolkit";

export const trabajadorCorreoSlice = createSlice({

    name: "trabajadorCorreo",
    initialState: {
        trabajadorCorreo: [],
        isLoading: false,   
        isSaving: false,
        active: null,             
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
            state.active = payload            
        },
        setIsSaving: (state,{ payload} ) => {
            state.isSaving = payload;
            
        },

    }
})

export const { startLoadingTrabajadorCorreo, setTrabajadorCorreo, setActiveTrabajadorCorreo, setIsSaving} = trabajadorCorreoSlice.actions   