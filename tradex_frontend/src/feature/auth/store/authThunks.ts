import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from '../../../api/authApi'
import type { LoginRequest, UserResponse } from '../../../types/auth.type'
import axios from 'axios'

const TOKEN_KEY = 'tradex_access_token'

export const loginUser = createAsyncThunk<
  UserResponse,
  LoginRequest,
  { rejectValue: string }
>(
  'auth/login',

  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials)

      sessionStorage.setItem(TOKEN_KEY, response.accessToken)

      return response.user
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          return rejectWithValue('Invalid email or password.')
        }

        return rejectWithValue(
          error.response?.data?.message ?? 'Login failed. Please try again.',
        )
      }

      return rejectWithValue('Unable to connect to the server.')
    }
  },
)

export const restoreSession = createAsyncThunk<
  UserResponse | null,
  void,
  { rejectValue: string }
>(
  'auth/restoreSession',

  async (_,{ rejectWithValue }) => {
    const token = sessionStorage.getItem(TOKEN_KEY)

    if (!token) {
      return null
    }

    try {
      const user = await authApi.getCurrentUser()

      return user
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // Invalid or expired token
        sessionStorage.removeItem(TOKEN_KEY)

        return null
      }
      
    }

    return rejectWithValue(
        'Unable to restore your session.',
      )
    
  },
)

export const logoutUser = createAsyncThunk(
  'auth/logout',

  async () => {
    sessionStorage.removeItem(TOKEN_KEY)
  },
)