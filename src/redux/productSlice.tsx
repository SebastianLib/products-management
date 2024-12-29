import { createSlice } from "@reduxjs/toolkit";


interface Product {
    isLoading: true,
    products: any,
    error: boolean,
}

const initialState = {
  isLoading: true,
  products: [],
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
});
