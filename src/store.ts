import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import LoginSlice from "./features/LoginSlice";
import { productSlice } from "./features/productSlice";
import CartSlice from "./features/CartSlice";
import PatientTestResultSlice from "./features/PatientTestResultSlice";
import contentDataSlice from "./features/contentDataSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: LoginSlice,
    product: productSlice.reducer,
    patientTestResult: PatientTestResultSlice,
    cart: CartSlice,
    content: contentDataSlice,
  },
});
