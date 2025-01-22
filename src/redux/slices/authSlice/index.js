import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../api/axiosInstance';
import { clearAuthToken, } from '../../../utils/authStorage';


// Login User Thunk
export const loginUser = createAsyncThunk(
  'users/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('users/login', credentials);
      const token = response?.data?.data?.token;

      return {
        status: response?.data?.status,
        message: response?.data?.message,
        token,
      };
    } catch (error) {
      if (error.response && error.response.data.message === 'jwt expired') {
        return rejectWithValue({ message: 'Token has expired, please login again' });
      }
      return rejectWithValue(error.response?.data);
    }
  }
);

// Change Password Thunk
export const changePassword = createAsyncThunk(
  'users/changePassword',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('users/change-password', credentials);
      return {
        success: response?.data?.status,
        message: response?.data?.message,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    authenticated: false,
    passwordChange: {
      success: false,
      error: null,
    },
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.authenticated = false;
      clearAuthToken();  
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.authenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.authenticated = false;
      })
      // Handle Change Password cases
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.passwordChange.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.passwordChange.success = true;
        state.passwordChange.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.passwordChange.error = action.payload;
        state.passwordChange.success = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
