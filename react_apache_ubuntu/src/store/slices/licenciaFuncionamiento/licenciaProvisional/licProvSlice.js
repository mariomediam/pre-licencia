import { createSlice } from '@reduxjs/toolkit';

const currentLicProvDefault = {
    C_LicProv: undefined,
    C_LicProv_Tipo: 0,
    M_LicProv_Nro: 0,
    M_LicProv_Renov: 0,
    C_Exped: "",
    C_Exped_Anio: "",
    C_LicProv_TitCod: "",
    C_LicProv_TitTipDoc: "",
    M_LicProv_TitNroDoc: "",
    N_LicProv_TitImg: "",
    C_Rubro: 0,
    C_Ubica: 0,
    N_LicProv_HorAte: "",
    N_LicProv_CerGas: "",
    T_LicProv_Obs: "",
    D_LicProv_FecEmi: "",
    D_LicProv_IniVig: "",
    D_LicProv_FinVig: "",
    N_LicProv_Formato: "",
    C_Usuari_Login: "",
    D_LicProv_FecDig: "",
    N_LicProv_PC: "",
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