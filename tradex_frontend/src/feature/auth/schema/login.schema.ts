import * as z from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { error: 'Email is required' })
    .max(255, { error: 'Email cannot exceed 255 characters' })
    .toLowerCase()
    .pipe(z.email({ error: 'Enter a valid email address' })),

  password: z
    .string()
    .min(1, { error: 'Password is required' }),
})

export type LoginSchema = z.infer<typeof loginSchema>