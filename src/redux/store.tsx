import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlicer";
import categoryReducer from "./categorySlice";
import productReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    product: productReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;