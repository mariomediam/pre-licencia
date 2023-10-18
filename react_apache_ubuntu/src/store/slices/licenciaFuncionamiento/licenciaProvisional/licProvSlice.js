import { createSlice } from '@reduxjs/toolkit';


// C_LicProv	int
// C_LicProv_Tipo	tinyint
// M_LicProv_Nro	int
// M_LicProv_Renov	int
// C_Exped	char
// C_Exped_Anio	char
// C_LicProv_TitCod	char
// C_LicProv_TitTipDoc	char
// M_LicProv_TitNroDoc	char
// N_LicProv_TitImg	varchar
// C_Rubro	int
// C_Ubica	int
// N_LicProv_HorAte	varchar
// N_LicProv_CerGas	varchar
// T_LicProv_Obs	varchar
// D_LicProv_FecEmi	date
// D_LicProv_IniVig	date
// D_LicProv_FinVig	date
// N_LicProv_Formato	varchar
// C_Usuari_Login	char
// D_LicProv_FecDig	smalldatetime
// N_LicProv_PC	varchar

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
}

export const licProvSlice = createSlice({
    name: 'licProv',
    initialState: {
        licProv: [],
        isLoading: false,
    },
    currentLicProv: currentLicProvDefault,
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
        setCurrentLicProv: (state, { payload }) => {          
            state.currentLicProv = payload.currentLicProv;
        },
    }
});

export const { startLoadingLicProv, setLicProv, setResetValues, setCurrentLicProv } = licProvSlice.actions;