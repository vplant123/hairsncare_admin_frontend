// cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    getUtilityData
} from '../app/ContentApi';

export const getUtilityContentData = createAsyncThunk(
    'content/getUtilityContentData',
    async (thunkAPI) => {
        console.log("koekjor")
        const response = await getUtilityData();
        return response?.data;
    }
);

const contentDataSlice = createSlice({
    name: 'content',
    initialState: {
        home: {},
        expertise: {},
        aboutUs: {},
        specialist: {},
        hairWomen: {},
        hairMen: {},
        hairTransplant: {},
        otherProcedures: {},
        onlineTest: {},
        dermatologist: {},
        customerVideos: {},
        plan: [],
        contactus: {},
        status: 'idle',
        config: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUtilityContentData.fulfilled, (state, action) => {
                state.home = action.payload?.home;
                state.expertise = action.payload?.expertise;
                state.aboutUs = action.payload?.aboutUs
                state.specialist = action.payload?.specialist
                state.hairWomen = action.payload?.hairWomen;
                state.hairMen = action.payload?.hairMen;
                state.hairTransplant = action.payload?.hairTransplant;
                state.otherProcedures = action.payload?.otherProcedures;
                state.onlineTest = action.payload?.onlineTest;
                state.dermatologist = action.payload?.dermatologist;
                state.customerVideos = action.payload?.customerVideos;
                state.plan = action.payload?.plan
                state.contactus = action.payload?.contactus;
                state.config = action.payload?.config

            })
    },
});

export default contentDataSlice.reducer;
