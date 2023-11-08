import { ZodObject, ZodSchema, object, string, z } from "zod";
import { BookInputInterfaceSchema } from "../interfaces/books.interface";



export const bookInputSchema: ZodSchema<BookInputInterfaceSchema> = object({
  title: string({
    required_error: "Username is required!",
  }).nonempty().min(2, "Please enter a valid title!"),
  description: string({
    required_error: "Please describe the kind of book you uploading!"
  }).nonempty().min(8, "Please be for specific on your description"),
  price: z.string({
    required_error: "Please enter the price for the book"
  }).min(1, "Enter a valid number").regex(/^[0-9]*$/, "PLease specify a valid price for the book."),
  stock: z.string({
    required_error: "Please enter the price for the book"
  }).min(1, "Enter a valid number").regex(/^[0-9]*$/, "Please specify a valid stock number."),
});