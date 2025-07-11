import { z } from "zod"

const signInSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email(),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
})

type TSignInType = z.infer<typeof signInSchema>
// type TFormInput = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

export { signInSchema, type TSignInType }