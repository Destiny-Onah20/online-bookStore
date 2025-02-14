"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailgen_1 = __importDefault(require("mailgen"));
const mailGenerator = new mailgen_1.default({
    theme: "salted",
    product: {
        name: "Page.com",
        logo: "Page",
        link: "#"
    }
});
exports.default = mailGenerator;
