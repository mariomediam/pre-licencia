import { createSlice } from '@reduxjs/toolkit';

const currentLicProvDefault = {
    licProvId: 0,
    licProvTipo: 0,
    licProvNro: 0,
    licProvRenov: 0,
    licProvExpNro: "",
    licProvExpAnio: "",
    licProvTitCod: "",
    licProvTitTipCod: "",
    licProvTitNroDoc: "",
    licProvTitImg: "",
    licProvRubro: 0,
    licProvUbica: 0,
    licProvHorAte: "",
    licProvCerGas: "",
    licProvObs: "",
    licProvFecEmi: (new Date()).toISOString().slice(0, 10),
    licProvIniVig: (new Date()).toISOString().slice(0, 10),
    licProvFinVig: (new Date(new Date().setFullYear(new Date().getFullYear() + 1))).toISOString().slice(0, 10),
    licProvFormato: "",
    licProvLogin: "",
    licProvDigitFecha: "",
    licProvDigitPC: "",
    N_LicProv_TitNombre: "",
}

export const licProvSlice = createSlice({
    name: 'licProv',
    initialState: {
        licProv: [],
        isLoading: false,
        currentLicProv: currentLicProvDefault,
    },
    reducers: {
        startLoadingLicProv: (state, /* action */ ) => {
            state.isLoading = true;
        },
        setLicProv: (state, { payload }) => {
            state.isLoading = false;            
            state.licProv = payload.licProv;
        },
        setResetValues: (state) => {
            state.isLoading = false;
            state.licProv = [];
            state.currentLicProv = currentLicProvDefault;
        },
        setCurrent: (state, { payload }) => {                   
            state.currentLicProv = payload.currentLicProv;
        },
        setResetCurrent: (state) => {
            state.currentLicProv = currentLicProvDefault;
        }
    }
});

export const { startLoadingLicProv, setLicProv, setResetValues, setCurrent, setResetCurrent } = licProvSlice.actions;