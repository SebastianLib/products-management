import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../config/api";
import { CreateProductSchema } from "../schemas/CreateProductSchema";
import { Product } from "../models/Product";
import { RootState } from "./store";


interface ProductProps {
    isLoading: boolean,
    products: Product[], 
    error: boolean,
}

const initialState: ProductProps = {
  isLoading: true,
  products: [],
  error: false,
};

export const createProduct = createAsyncThunk<Product, CreateProductSchema>(
  "product/createProduct",
  async (reqData, { rejectWithValue, getState }) => {
    try {

      const state = getState() as RootState;
      const jwt = state.user.jwt;  

      const { data } = await api.post<Product>("/product", reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`, 
        },
      });

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);


const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
   extraReducers: (builder) => {
        builder
          .addCase(createProduct.pending, (state) => {
            state.isLoading = true;
            state.error = false;
          })
          .addCase(createProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = [...state.products, action.payload];
          })
          .addCase(createProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = true;
          });
      },
});


export default productSlice.reducer;
