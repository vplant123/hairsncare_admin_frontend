// src/slices/patientTestResultSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BASE_URL from '../Config';

export const fetchPatientTestResult = createAsyncThunk(
    'patientTestResult/fetchPatientTestResult',
    async (hairTestId) => {
        const response = await fetch(`${BASE_URL}/doctor/get-hair-test?hairTestId=${hairTestId}`);
        const data = await response.json();
        return data.data[0];
    }
);

const patientTestResultSlice = createSlice({
    name: 'patientTestResult',
    initialState: {
        data1: {},
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPatientTestResult.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPatientTestResult.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data1 = action.payload;
            })
            .addCase(fetchPatientTestResult.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default patientTestResultSlice.reducer;
