import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../api/axiosInstance'
import AsyncStorage from '@react-native-async-storage/async-storage'

// REGISTER
export const register = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }, thunkApi) => {
    try {
      const res = await axiosInstance.post('/user/register', { username, email, password })
      return res.data
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Register failed'
      return thunkApi.rejectWithValue(message)
    }
  }
)

// LOGIN
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkApi) => {
    try {
      const res = await axiosInstance.post('/user/login', { email, password })
      const { user, token } = res.data

      // Save both user & token in AsyncStorage
      await AsyncStorage.setItem('token', token)
      await AsyncStorage.setItem('user', JSON.stringify(user))
      await AsyncStorage.setItem('userId', user?.id)

      return { user, token }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Login failed'
      return thunkApi.rejectWithValue(message)
    }
  }
)

// LOAD AUTH (token + user)
export const loadAuth = createAsyncThunk(
  'auth/loadAuth',
  async (_, thunkApi) => {
    try {
      const token = await AsyncStorage.getItem('token')
      const userData = await AsyncStorage.getItem('user')
      const user = userData ? JSON.parse(userData) : null
      return { token, user }
    } catch (error) {
      return thunkApi.rejectWithValue('Failed to load auth data')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    error: null,
    user: null,
    token: null,
    success: false
  },
  reducers: {
    reset: (state) => {
      state.loading = false
      state.error = null
      state.success = false
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.success = false
      AsyncStorage.removeItem('token')
      AsyncStorage.removeItem('user')
      AsyncStorage.removeItem('userId')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.success = true
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.success = false
      })
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.success = true
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.success = false
      })
      .addCase(loadAuth.fulfilled, (state, action) => {
        state.token = action.payload.token
        state.user = action.payload.user
        state.success = !!action.payload.token
      })
      .addCase(loadAuth.rejected, (state) => {
        state.token = null
        state.user = null
        state.success = false
      })
  }
})

export const { reset, logout } = authSlice.actions
export default authSlice.reducer
