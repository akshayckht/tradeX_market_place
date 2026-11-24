import { Alert, Box, Button, Stack, TextField } from '@mui/material'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registrationSchema } from '../schema/registration.schema.ts'
import type { RegistrationSchema } from '../schema/registration.schema.ts'

import { useState } from 'react'
import { authApi } from '../../../api/authApi.ts'
import { useNavigate } from 'react-router'
import axios from 'axios'

export default function RegisterForm() {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationSchema>({
    resolver: zodResolver(registrationSchema),

    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    mode: 'onTouched',
  })

  const { ref: firstNameRef, ...firstNameProps } = register('firstName')
  const { ref: lastNameRef, ...lastNameProps } = register('lastName')
  const { ref: emailRef, ...emailProps } = register('email')
  const { ref: passwordRef, ...passwordProps } = register('password')
  const { ref: confirmPasswordRef, ...confirmPasswordProps } =
    register('confirmPassword')

  const onSubmit = async (data: RegistrationSchema) => {
    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      }

      await authApi.register(payload)

      navigate('/login', {
        replace: true,
      })
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setSubmitError(e.response?.data?.message)
      } else {
        setSubmitError('Something went wrong please try again')
      }
    }
  }

  return (
    <Stack
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      spacing={2.5}
    >
      {submitError && <Alert severity="error">{submitError}</Alert>}

      {/* Name fields */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
          },
          gap: 2,
        }}
      >
        <TextField
          {...firstNameProps}
          inputRef={firstNameRef}
          fullWidth
          label="First name"
          name="firstName"
          placeholder="Enter first name"
          autoComplete="given-name"
          error={!!errors.firstName}
          helperText={errors.firstName ? errors.firstName?.message : ' '}
        />

        <TextField
          {...lastNameProps}
          inputRef={lastNameRef}
          fullWidth
          label="Last name"
          name="lastName"
          placeholder="Enter last name"
          autoComplete="family-name"
          error={!!errors.lastName}
          helperText={errors.lastName ? errors.lastName.message : ' '}
        />
      </Box>

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
        error={!!errors.email}
        helperText={errors.email ? errors.email?.message : ' '}
      />

      {/* Password */}
      <TextField
        {...passwordProps}
        inputRef={passwordRef}
        fullWidth
        label="Password"
        name="password"
        type="password"
        placeholder="Create a password"
        autoComplete="new-password"
        error={!!errors.password}
        helperText={errors.password ? errors.password?.message : ' '}
      />

      {/* Confirm password */}
      <TextField
        {...confirmPasswordProps}
        inputRef={confirmPasswordRef}
        fullWidth
        label="Confirm password"
        name="confirmPassword"
        type="password"
        placeholder="Confirm your password"
        autoComplete="new-password"
        error={!!errors.confirmPassword}
        helperText={
          errors.confirmPassword ? errors.confirmPassword?.message : ' '
        }
      />

      {/* Submit */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        sx={{ mt: 1, py: 1.4 }}
      >
        Create account
      </Button>
    </Stack>
  )
}
