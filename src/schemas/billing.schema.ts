import { ZodObject, ZodSchema, object, string, z } from "zod";
import { billingInputInterface } from "../interfaces/billing.interface";



export const billingInputSchema: ZodSchema<billingInputInterface> = object({
  fullName: string({
    required_error: "Full name is required"
  }).nonempty().min(2).regex(/^[a-zA-Z ]*$/, "Please input only your name characters"),
  email: string({
    required_error: "Email is required"
  }).nonempty().email("Invalid Email format!"),
  phoneNumber: string({
    required_error: "Phone Number is required"
  }).nonempty().min(8, "Phone number not correct!"),
  homeAddress: string({
    required_error: "Please indicate your billing address"
  }).nonempty().min(2, "Please specify your address correctly"),
  state: string({
    required_error: "Please indicate your state of residence"
  }).nonempty().min(2, "Please specify correct social media"),
  town: string({
    required_error: "Please indicate your town or city!"
  }).nonempty().min(2, "inValid input "),
  country: string({
    required_error: "Specify your country"
  }).nonempty()
});