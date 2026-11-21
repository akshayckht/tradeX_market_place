
import * as z from "zod";

export const registrationSchema = z.object({
  firstName: z.string().min(1, { error: "First name is required" }),
  lastName: z.string().min(1, { error: "Last name is required" }),
  email: z.string().min(1, { error: "Email is required" })
    .pipe(z.email({error: "Invalid email"})),
  password: z.string().min(8, { error: "Password must be at least 8 characters long" }),
  confirmPassword: z.string()
  }
).refine( (data) => data.password === data.confirmPassword, {
  error: "Passwords do not match",
  path: ["confirmPassword"],
})

export type RegistrationSchema = z.infer<typeof registrationSchema>