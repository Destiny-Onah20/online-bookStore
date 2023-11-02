import { ZodObject, ZodSchema, object, string, z } from "zod";
import { userInputInterface } from "../interfaces/users.interface";



export const userInputSchema: ZodSchema<userInputInterface> = object({
  username: string({
    required_error: "Username is required!",
  }).min(2),
  email: string({
    required_error: "Email is required!"
  }).nonempty().email("Invalid Email Format!"),
  password: string({
    required_error: "Password is required!"
  }).min(6, "Password must be at least 6 characters long")
});
