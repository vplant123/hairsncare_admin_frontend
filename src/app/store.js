import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import LoginSlice from '../features/login/LoginSlice';
import { productSlice } from '../features/products/productSlice';
import CartSlice from '../features/products/CartSlice';
import PatientTestResultSlice from '../features/doctor-dashboard/PatientTestResultSlice';
import contentDataSlice from './conteneDataSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login:LoginSlice,
    product: productSlice.reducer,
    patientTestResult:PatientTestResultSlice,
    cart: CartSlice,
    content: contentDataSlice,
  },
});
