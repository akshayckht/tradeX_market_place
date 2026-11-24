import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('tradex_access_token')

  const publicAuthRoutes = [
    '/api/auth/register',
    '/api/auth/login',
  ]

  const isPublicAuthRoute = publicAuthRoutes.includes(
    config.url ?? '',
  )

  if (token && !isPublicAuthRoute) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default apiClient