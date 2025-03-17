import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProduct,fetchProductById } from './ProductsApi';

const initialState = {
    products: [],
    selectedProduct: null, // Initialize selectedProduct here if you intend to use it
};

export const fetchAllProductAsync = createAsyncThunk(
    'product/fetchAllProduct',
    async (id) => {
      const response = await fetchAllProduct();
      console.log(response.data.message,"api")
      // The value we return becomes the `fulfilled` action payload
      return response.data.message;
    }
);

export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
      clearSelectedProduct: (state) => {
        state.selectedProduct = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllProductAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.products = action.payload;
        })
        .addCase(fetchProductByIdAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.selectedProduct = action.payload;
        })
    },
});

export const selectAllProducts = (state) => state.product.products.products;
export const selectProductById = (state) => state.product.selectedProduct;