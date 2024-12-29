import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SignupValues } from "../schemas/SignupSchema";
import { api } from "../config/api";
import { User } from "../models/User";
import { SigninValues } from "../schemas/SigninSchema";

type UserRole = 'ADMIN' | 'USER' | 'GUEST';

interface AuthResponse {
  jwt: string;
  message: string;
  role: UserRole;
}

interface UserState {
  isLoading: boolean;
  user: User | null;
  jwt: string | null;
  error: boolean;
}

const initialState: UserState = {
  isLoading: true,
  user: null,
  jwt: null,
  error: false,
};


export const createUser = createAsyncThunk<AuthResponse, SignupValues>(
  "user/createUser",
  async (reqData, { rejectWithValue }) => {
    try {
      const { data } = await api.post<AuthResponse>("/auth/signup", reqData);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const loginUser = createAsyncThunk<AuthResponse, SigninValues>(
  "user/loginUser",
  async (reqData, { rejectWithValue }) => {
    try {
      const { data } = await api.post<AuthResponse>("/auth/signin", reqData);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const getUser = createAsyncThunk<User, { jwt: string }>(
  "user/getUser",
  async ({ jwt }, { rejectWithValue }) => {
    try {
      const { data } = await api.get<User>("/user/profile", {
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


const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("jwt");
      state.jwt = null;
      state.user = null;
      window.location.href = "/signin"; 
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
     localStorage.setItem("jwt", action.payload.jwt)
      state.isLoading = false;
      state.jwt = action.payload.jwt;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.error = true;
      state.isLoading = false;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
     localStorage.setItem("jwt", action.payload.jwt)
      state.isLoading = false;
      state.jwt = action.payload.jwt;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = true;
      state.isLoading = false;
    });
    builder.addCase(getUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      if(!state.jwt){
        state.jwt = localStorage.getItem("jwt");
      }
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.error = true;
      state.isLoading = false;
    });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
