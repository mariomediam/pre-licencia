import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './slices/counter'
import { boletasEnviadasSlice, boletasSlice, planillaCorreoSlice, planillaSlice, trabajadorCorreoSlice, licProvSlice, licProvUbicaSlice } from './slices'

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,    
    boletasGeneradas: boletasSlice.reducer,
    planilla: planillaSlice.reducer,
    planillaCorreo: planillaCorreoSlice.reducer,
    boletasEnviadas: boletasEnviadasSlice.reducer,
    trabajadorCorreo: trabajadorCorreoSlice.reducer,
    licProv: licProvSlice.reducer,
    licProvUbica: licProvUbicaSlice.reducer,
  },
})