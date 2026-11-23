import apiClient from "../lib/axios"

import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UserResponse,
} from "../types/auth.type"

export const authApi = {
  async register(payload: RegisterRequest): Promise<UserResponse> {
    const response = await apiClient.post<UserResponse>(
      '/api/auth/register',
      payload,
    )

    return response.data
  },

  async login(payload: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      '/api/auth/login',
      payload,
    )

    return response.data
  },

  async getCurrentUser(): Promise<UserResponse> {
    const response = await apiClient.get<UserResponse>(
      '/api/auth/me',
    )

    return response.data
  },
}