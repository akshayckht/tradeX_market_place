import * as z from 'zod';


export const loginSchema = z.object(
  {
    email: z.string()
      .min(1, {error: 'Email is required'})
      .pipe(
        z.email({error: 'Enter a valid email'})
      ),

    password: z.string()
      .min(1, {error: 'Password is required'})
      .min(8, {error: 'Password must be at least 8 characters'})
  }
)

export type LoginSchema = z.infer<typeof loginSchema>