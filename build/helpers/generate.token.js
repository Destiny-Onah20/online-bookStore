"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAdminToken = exports.generateUserToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateUserToken = (userId, username) => {
    const userToken = jsonwebtoken_1.default.sign({
        user_id: userId,
        username: username
    }, process.env.SECRET_KEY, {
        expiresIn: process.env.EXPIRE_TIME
    });
    return userToken;
};
exports.generateUserToken = generateUserToken;
const generateAdminToken = (typeOfAdmin, socialMediaHandle, isAdmin, verified) => {
    const adminToken = jsonwebtoken_1.default.sign({
        user_id: typeOfAdmin,
        username: socialMediaHandle,
        isAdmin: isAdmin,
        verification: verified
    }, process.env.SECRET_KEY_AD, {
        expiresIn: process.env.EXPIRE_TIME_AD
    });
    return adminToken;
};
exports.generateAdminToken = generateAdminToken;
