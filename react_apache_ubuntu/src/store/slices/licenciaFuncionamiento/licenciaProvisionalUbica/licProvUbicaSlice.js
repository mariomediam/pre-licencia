import { createSlice } from '@reduxjs/toolkit';

const defaultCurrentLicProvUbica = {    
    "ubicaOrden": 0,
    "ubicaCodigo": "",
    "ubicaDescrip": "",
    "ubicaUTMNorte": 0,
    "ubicaUTMEste": 0,
    "ubicaLogin": "",
    "ubicaDigitFecha": Date.now(),
    "ubicaDigitPC": "",
    "licProvTipo": 0,
}

export const licProvUbicaSlice = createSlice({
    name: 'licProvUbica',
    initialState: {
        licProvUbica: [],
        isLoading: false,
        currentLicProvUbica: defaultCurrentLicProvUbica,
    },
    reducers: {
        startLoadingLicProvUbica: (state, /* action */ ) => {
            state.isLoading = true;
        },
        setLicProvUbica: (state, { payload }) => {
            state.isLoading = false;            
            state.licProvUbica = payload.licProvUbica;
        },
        setResetValues: (state) => {
            state.isLoading = false;
            state.licProvUbica = [];
            state.currentLicProvUbica = defaultCurrentLicProvUbica;
        },
        setCurrentLicProvUbica: (state, { payload }) => {                   
            state.currentLicProvUbica = payload;
        },
        setResetCurrentLicProvUbica: (state) => {
            state.currentLicProvUbica = defaultCurrentLicProvUbica;
        },
        finishLoadingLicProvUbica: (state, /* action */ ) => {
            state.isLoading = false;
        },
    }
});

export const { startLoadingLicProvUbica, setLicProvUbica, setResetValues, setCurrentLicProvUbica, setResetCurrentLicProvUbica, finishLoadingLicProvUbica } = licProvUbicaSlice.actions;

