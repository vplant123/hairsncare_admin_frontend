// features/login/LoginSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showLogin: false,
  // Add other login-related state here
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    toggleLogin: (state) => {
      state.showLogin = !state.showLogin;
    },
    // Add other reducer functions as needed
  },
});

export const { toggleLogin } = loginSlice.actions;

export default loginSlice.reducer;
