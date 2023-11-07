"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLoginInput = exports.adminInputSchema = void 0;
const zod_1 = require("zod");
exports.adminInputSchema = (0, zod_1.object)({
    fullName: (0, zod_1.string)({
        required_error: "Full name is required"
    }).nonempty().min(2).regex(/^[a-zA-Z ]*$/, "Please input only your name characters"),
    email: (0, zod_1.string)({
        required_error: "Email is required"
    }).nonempty().email("Invalid Email format!"),
    phoneNumber: (0, zod_1.string)({
        required_error: "Phone Number is required"
    }).nonempty().min(8, "Phone number not correct!"),
    typeOfAdmin: (0, zod_1.string)({}),
    address: (0, zod_1.string)({
        required_error: "Vendor or Authors Address is required"
    }).nonempty().min(2, "Please specify your address correctly"),
    socialMediaHandle: (0, zod_1.string)({
        required_error: "At least one social media handle is required"
    }).nonempty().min(2, "Please specify correct social media"),
    aboutAuthor: (0, zod_1.string)({
        required_error: "Please tell us about your self😜!"
    }).nonempty().min(2, "Please explain with better information"),
    password: (0, zod_1.string)({
        required_error: "Password is required"
    }).nonempty().min(7, "Password must be at least 7 characters long")
});
exports.adminLoginInput = (0, zod_1.object)({
    email: (0, zod_1.string)({
        required_error: "Email is required"
    }).nonempty().email("Invalid Email format!"),
    password: (0, zod_1.string)({
        required_error: "Password is required"
    }).nonempty().min(7, "Password must be at least 7 characters long")
});
