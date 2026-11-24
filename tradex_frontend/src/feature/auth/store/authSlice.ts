import { createSlice } from '@reduxjs/toolkit'
import type { UserResponse } from '../../../types/auth.type'
import { loginUser, logoutUser, restoreSession } from './authThunks'


export type AuthStatus = 'initializing' | 'authenticated' | 'unauthenticated'

export type LoginStatus = 'idle' | 'pending' | 'failed'




interface AuthState {
  user: UserResponse | null
  status: AuthStatus
  loginStatus: LoginStatus
  loginError: string | null
}

const initialState: AuthState = {
  user: null,
  status: 'initializing',
  loginStatus: 'idle',
  loginError: null,
}

const authSlice = createSlice({
  name: 'auth',

  initialState: initialState,

  reducers: {
    clearAuth(state) {
      state.user = null
      state.status = 'unauthenticated'
      state.loginStatus = 'idle'
      state.loginError = null
    },

    clearLoginError(state) {
      state.loginError = null
      state.loginStatus = 'idle'
    },
  },

  extraReducers: (builder) => {
    builder

    
      // LOGIN

      .addCase(loginUser.pending, (state) => {
        state.loginStatus = 'pending'
        state.loginError = null
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.status = 'authenticated'
        state.loginStatus = 'idle'
        state.loginError = null
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = 'failed'

        state.loginError = action.payload ?? 'Login failed.'

        if (!state.user) {
          state.status = 'unauthenticated'
        }
      })

    
      // SESSION RESTORATION

      .addCase(restoreSession.pending, (state) => {
        state.status = 'initializing'
      })

      .addCase(restoreSession.fulfilled, (state, action) => {
        state.user = action.payload
        state.status = action.payload ? 'authenticated' : 'unauthenticated'
      })

      .addCase(restoreSession.rejected, (state) => {
        state.user = null
        state.status = 'unauthenticated'
      })

      //logout

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.status = 'unauthenticated'
        state.loginStatus = 'idle'
        state.loginError = null
      })
  },
})

export const { clearAuth, clearLoginError } = authSlice.actions

export default authSlice.reducer
