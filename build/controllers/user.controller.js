"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.loginUser = exports.verifyUser = exports.singUpUser = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const mailservice_1 = __importDefault(require("../middlewares/mailservice"));
const mailgenerator_1 = __importDefault(require("../utils/mailgenerator"));
const generate_token_1 = require("../helpers/generate.token");
const singUpUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        //check for email existence
        const verifyEmail = yield users_model_1.default.findOne({ where: { email } });
        if (verifyEmail) {
            return res.status(400).json({
                message: "Email already taken!"
            });
        }
        ;
        // hash the password
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const userData = {
            user_id: (0, uuid_1.v4)(),
            username,
            email,
            password: hashPassword
        };
        //create an instance of the data 
        const userInstanceData = new users_model_1.default(userData);
        // generate a token for the user
        //save the token to the database 
        userInstanceData.token = (0, generate_token_1.generateUserToken)(userInstanceData.user_id, userInstanceData.username);
        yield userInstanceData.save();
        const verifyToken = () => {
            const digits = '0123456789';
            let uniqueNumber = '';
            while (uniqueNumber.length < 6) {
                const randomDigit = digits.charAt(Math.floor(Math.random() * digits.length));
                if (!uniqueNumber.includes(randomDigit)) {
                    uniqueNumber += randomDigit;
                }
            }
            return uniqueNumber;
        };
        const verificationCode = verifyToken();
        userInstanceData.verifyNumber = verificationCode;
        yield userInstanceData.save();
        //send an email to the user who signed up!
        const emailContent = {
            body: {
                name: `${userData.username}`,
                intro: ` Welcome to Page.com! Please verify your account using this code:`,
                action: {
                    instructions: `Here's the code to verify your account below:`,
                    button: {
                        color: '#673ee6',
                        text: verificationCode,
                        link: "#",
                    },
                },
                outro: 'If you did not sign up for our site, you can ignore this email.',
            },
        };
        const emailBody = mailgenerator_1.default.generate(emailContent);
        const emailText = mailgenerator_1.default.generatePlaintext(emailContent);
        (0, mailservice_1.default)({
            from: {
                address: process.env.EMAIL
            },
            email: email,
            subject: "Verification Code!",
            message: emailText,
            to: email,
            html: emailBody
        });
        //return a success response
        return res.status(201).json({
            message: "Success!",
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Failed",
        });
    }
});
exports.singUpUser = singUpUser;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { verificationCode } = req.body;
        const theVerificationCode = yield users_model_1.default.findOne({ where: { verifyNumber: verificationCode } });
        if (!theVerificationCode) {
            return res.status(400).json({
                message: "Invalid verification code!"
            });
        }
        theVerificationCode.verify = true;
        yield theVerificationCode.save();
        return res.status(201).json({
            message: "Success!",
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Failed",
        });
    }
});
exports.verifyUser = verifyUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield users_model_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password!"
            });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({
                message: "Invalid email or password!"
            });
        }
        const verifiedUser = user.verify;
        if (!verifiedUser) {
            return res.status(400).json({
                message: "Please verify your email first!"
            });
        }
        ;
        user.token = (0, generate_token_1.generateUserToken)(user.user_id, user.username);
        yield user.save();
        return res.status(200).json({
            message: "Success!",
            token: user.token
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Failed",
        });
    }
});
exports.loginUser = loginUser;
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profileImage, username, email } = req.body;
        const token = req.params.token;
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Failed",
        });
    }
});
exports.updateUserProfile = updateUserProfile;
