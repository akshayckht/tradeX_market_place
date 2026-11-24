import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts'
import { loginUser } from '../store/authThunks.ts'

import { loginSchema, type LoginSchema } from '../schema/login.schema.ts'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { clearLoginError } from '../store/authSlice.ts'


export default function LoginForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  const loginError = useAppSelector((state) => state.auth.loginError)
  const [loginSuccess, setLoginSuccess] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: '',
      password: '',
    },

    mode: 'onTouched',
  })

  const { ref: emailRef, ...emailProps } = register('email', { required: true })
  const { ref: passwordRef, ...passwordProps } = register('password', {
    required: true,
  })

  const onSubmit = async (data: LoginSchema) => {
    setLoginSuccess(false)

    dispatch(clearLoginError())

    const result = await dispatch(loginUser(data))

    navigate("/",{replace: true})

    if (loginUser.fulfilled.match(result)) {
      setLoginSuccess(true)
    }
  }

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={2.5}
      noValidate
    >
      {loginError && <Alert severity="error">{loginError}</Alert>}

      {loginSuccess && (
        <Alert severity="success">
          Login successful! Your session is active.
        </Alert>
      )}
      {/* Email */}
      <TextField
        {...emailProps}
        inputRef={emailRef}
        fullWidth
        label="Email address"
        name="email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        error={Boolean(errors.email)}
        helperText={errors.email ? errors.email.message : ' '}
      />

      {/* Password */}
      <TextField
        {...passwordProps}
        inputRef={passwordRef}
        fullWidth
        label="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter your password"
        autoComplete="current-password"
        error={Boolean(errors.password)}
        helperText={errors.password ? errors.password.message : ' '}

        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((prev) => !prev)}
                  onMouseDown={(event) => event.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      {/* Submit */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        sx={{ mt: 1, py: 1.4 }}
      >
        Login
      </Button>
    </Stack>
  )
}
