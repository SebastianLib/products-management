import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Category } from "../models/Category";
import { api } from "../config/api";


interface CategoryProps {
    isLoading: true,
    categories: Category[],
    error: boolean,
}

export const getAllCategories = createAsyncThunk<Category[], void>(
    "categories/getAllCategories", 
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await api.get<Category[]>("/category"); 
        return data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  );
  

const initialState: CategoryProps = {
  isLoading: true,
  categories: [],
  error: false,
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
      data: [] as Category[],
      isLoading: false,
      error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAllCategories.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(getAllCategories.fulfilled, (state, action) => {
          state.isLoading = false;
          state.data = action.payload;
        })
        .addCase(getAllCategories.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
        });
    },
  });
