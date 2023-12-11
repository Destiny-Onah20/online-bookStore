"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.billingInputSchema = void 0;
const zod_1 = require("zod");
exports.billingInputSchema = (0, zod_1.object)({
    fullName: (0, zod_1.string)({
        required_error: "Full name is required"
    }).nonempty().min(2).regex(/^[a-zA-Z ]*$/, "Please input only your name characters"),
    email: (0, zod_1.string)({
        required_error: "Email is required"
    }).nonempty().email("Invalid Email format!"),
    phoneNumber: (0, zod_1.string)({
        required_error: "Phone Number is required"
    }).nonempty().min(8, "Phone number not correct!"),
    homeAddress: (0, zod_1.string)({
        required_error: "Please indicate your billing address"
    }).nonempty().min(2, "Please specify your address correctly"),
    state: (0, zod_1.string)({
        required_error: "Please indicate your state of residence"
    }).nonempty().min(2, "Please specify correct social media"),
    town: (0, zod_1.string)({
        required_error: "Please indicate your town or city!"
    }).nonempty().min(2, "inValid input "),
    country: (0, zod_1.string)({
        required_error: "Specify your country"
    }).nonempty()
});
