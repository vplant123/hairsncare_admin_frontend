// cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addProductToCartApi,
  removeProductFromCartApi,
  getCartItemsApi,
} from './CartApi';

export const addProductToCart = createAsyncThunk(
  'cart/addProductToCart',
  async ({ userId, product }, thunkAPI) => {
    const response = await addProductToCartApi(userId, product);
    return response;
  }
);

export const removeProductFromCart = createAsyncThunk(
  'cart/removeProductFromCart',
  async ({ userId, productId }, thunkAPI) => {
    const response = await removeProductFromCartApi(userId, productId);
    return response;
  }
);

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (userId, thunkAPI) => {
    const response = await getCartItemsApi(userId);
    console.log(response)
    return response.data.items;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default cartSlice.reducer;
