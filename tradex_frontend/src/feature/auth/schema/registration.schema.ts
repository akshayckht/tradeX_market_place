import * as z from 'zod'

export const registrationSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, { error: 'First name must contain at least 2 characters' })
      .max(100, { error: 'First name cannot exceed 100 characters' }),

    lastName: z
      .string()
      .trim()
      .min(1, { error: 'Last name is required' })
      .max(100, { error: 'Last name cannot exceed 100 characters' }),

    email: z
      .string()
      .trim()
      .min(1, { error: 'Email is required' })
      .max(255, { error: 'Email cannot exceed 255 characters' })
      .toLowerCase()
      .pipe(z.email({ error: 'Enter a valid email address' })),

    password: z
      .string()
      .min(8, { error: 'Password must contain at least 8 characters' }),

    confirmPassword: z
      .string()
      .min(1, { error: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type RegistrationSchema = z.infer<typeof registrationSchema>