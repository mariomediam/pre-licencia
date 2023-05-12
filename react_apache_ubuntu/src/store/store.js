import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './slices/counter'
import { boletasEnviadasSlice, boletasSlice, planillaCorreoSlice, planillaSlice, trabajadorCorreoSlice } from './slices'

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,    
    boletasGeneradas: boletasSlice.reducer,
    planilla: planillaSlice.reducer,
    planillaCorreo: planillaCorreoSlice.reducer,
    boletasEnviadas: boletasEnviadasSlice.reducer,
    trabajadorCorreo: trabajadorCorreoSlice.reducer,
  },
})