import { z } from "zod"

const signUpSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }).max(50),
    lastName: z.string().min(1, { message: "Last name is required" }).max(50),
    email: z.string().min(1, { message: "Email is required" }).email(),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, {
            message: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
        }),
    confirmPassword: z
        .string()
        .min(1, { message: "Confirm password is required" }),

}).refine((input) => input.password === input.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})


type TSignUpType = z.infer<typeof signUpSchema>
// type TFormInput = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

export { signUpSchema, type TSignUpType }