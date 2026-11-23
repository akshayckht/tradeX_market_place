export type UserRole = 'USER' | 'ADMIN'

export interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface UserResponse {
  id: number
  firstName: string
  lastName: string
  email: string
  role: UserRole
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  accessToken: string
  tokenType: string
  expiresIn: number
  user: UserResponse
}

export interface FieldErrorResponse {
  field: string
  message: string
}

export interface ApiErrorResponse {
  timestamp: string
  status: number
  code: string
  message: string
  path: string
  fieldErrors?: FieldErrorResponse[]
}
