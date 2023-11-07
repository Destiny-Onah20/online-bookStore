import { ZodObject, ZodSchema, object, string } from "zod";
import { AdminInput, AdminLoginInput, AdminOptions } from "../interfaces/admin.interface";

export const adminInputSchema: ZodSchema<AdminInput> = object({
  fullName: string({
    required_error: "Full name is required"
  }).nonempty().min(2).regex(/^[a-zA-Z ]*$/, "Please input only your name characters"),
  email: string({
    required_error: "Email is required"
  }).nonempty().email("Invalid Email format!"),
  phoneNumber: string({
    required_error: "Phone Number is required"
  }).nonempty().min(8, "Phone number not correct!"),
  typeOfAdmin: string({
  }),
  address: string({
    required_error: "Vendor or Authors Address is required"
  }).nonempty().min(2, "Please specify your address correctly"),
  socialMediaHandle: string({
    required_error: "At least one social media handle is required"
  }).nonempty().min(2, "Please specify correct social media"),
  aboutAuthor: string({
    required_error: "Please tell us about your self😜!"
  }).nonempty().min(2, "Please explain with better information"),
  password: string({
    required_error: "Password is required"
  }).nonempty().min(7, "Password must be at least 7 characters long")
});


export const adminLoginInput: ZodSchema<AdminLoginInput> = object({
  email: string({
    required_error: "Email is required"
  }).nonempty().email("Invalid Email format!"),
  password: string({
    required_error: "Password is required"
  }).nonempty().min(7, "Password must be at least 7 characters long")
})