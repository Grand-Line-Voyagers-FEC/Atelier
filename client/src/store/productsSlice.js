import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  currentProduct: null,
  productList: [],
  productDetails: {},
  productStyles: {},
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
}

export const getProducts = createAsyncThunk('products/getProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/products')
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const getProductDetails = createAsyncThunk('products/getProductDetails', async (productId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/products/${productId}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});


export const getProductStyles = createAsyncThunk('products/getProductStyles', async (productId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/products/${productId}/styles`)
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});


export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    loadProducts(state, action) {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productList = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getProductDetails.pending, state => {
        state.status = 'loading';
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id, ...productDetails } = action.payload;
        state.currentProduct = id;
        state.productDetails[id] = productDetails;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getProductStyles.pending, state => {
        state.status = 'loading';
      })
      .addCase(getProductStyles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { productId, ...productStyles } = action.payload;
        state.currentProduct = productId;
        state.productStyles = productStyles;
      })
      .addCase(getProductStyles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  }
});

export const { loadProducts } = productsSlice.actions;

export default productsSlice.reducer;