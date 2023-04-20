import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './slices/counter'
import { boletasSlice } from './slices'

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,    
    boletasGeneradas: boletasSlice.reducer,
  },
})