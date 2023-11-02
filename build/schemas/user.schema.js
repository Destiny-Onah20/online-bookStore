"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInputSchema = void 0;
const zod_1 = require("zod");
exports.userInputSchema = (0, zod_1.object)({
    username: (0, zod_1.string)({
        required_error: "Username is required!",
    }).min(2),
    email: (0, zod_1.string)({
        required_error: "Email is required!"
    }).nonempty().email("Invalid Email Format!"),
    password: (0, zod_1.string)({
        required_error: "Password is required!"
    }).min(6, "Password must be at least 6 characters long")
});
