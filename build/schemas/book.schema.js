"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookInputSchema = void 0;
const zod_1 = require("zod");
exports.bookInputSchema = (0, zod_1.object)({
    title: (0, zod_1.string)({
        required_error: "Username is required!",
    }).nonempty().min(2, "Please enter a valid title!"),
    description: (0, zod_1.string)({
        required_error: "Please describe the kind of book you uploading!"
    }).nonempty().min(8, "Please be for specific on your description"),
    price: zod_1.z.string({
        required_error: "Please enter the price for the book"
    }).min(1, "Enter a valid number").regex(/^[0-9]*$/, "PLease specify a valid price for the book."),
    stock: zod_1.z.string({
        required_error: "Please enter the price for the book"
    }).min(1, "Enter a valid number").regex(/^[0-9]*$/, "Please specify a valid stock number."),
});
