import { createSlice } from '@reduxjs/toolkit';

export const licProvSlice = createSlice({
    name: 'licProv',
    initialState: {
        licProv: [],
        isLoading: false,
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
        }
    }
});

export const { startLoadingLicProv, setLicProv, setResetValues } = licProvSlice.actions;