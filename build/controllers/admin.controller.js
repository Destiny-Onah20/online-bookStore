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
exports.admin = exports.verifyAdmin = exports.loginAdmin = exports.registerAuthors = void 0;
const admin_model_1 = __importDefault(require("../models/admin.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generate_token_1 = require("../helpers/generate.token");
const mailgenerator_1 = __importDefault(require("../utils/mailgenerator"));
const email_queue_1 = __importDefault(require("../queues/email.queue"));
const registerAuthors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, email, phoneNumber, typeOfAdmin, address, socialMediaHandle, aboutAuthor, password, } = req.body;
        const validateEmail = yield admin_model_1.default.findOne({ where: { email } });
        if (validateEmail) {
            return res.status(400).json({
                message: "Email already taken!"
            });
        }
        const bcryptPassword = yield bcrypt_1.default.hash(password, 10);
        const verifyToken = () => {
            const digits = '0123456789';
            let uniqueNumber = '';
            while (uniqueNumber.length < 5) {
                const randomDigit = digits.charAt(Math.floor(Math.random() * digits.length));
                if (!uniqueNumber.includes(randomDigit)) {
                    uniqueNumber += randomDigit;
                }
            }
            return uniqueNumber;
        };
        const verificationCode = verifyToken();
        const adminObject = {
            fullName,
            email,
            phoneNumber,
            typeOfAdmin,
            address,
            socialMediaHandle,
            aboutAuthor,
            verifyNumber: verificationCode,
            password: bcryptPassword
        };
        const adminInstance = new admin_model_1.default(adminObject);
        const generateToken = (0, generate_token_1.generateAdminToken)(adminInstance.typeOfAdmin, adminInstance.socialMediaHandle, adminInstance.isAdmin, adminInstance.verified);
        adminInstance.token = generateToken;
        yield adminInstance.save();
        const emailContent = {
            body: {
                name: `${adminInstance.fullName.split(" ")[0]}`,
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
        (0, email_queue_1.default)({
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
        return res.status(500).json({
            message: error.message,
            status: "Failed!"
        });
    }
});
exports.registerAuthors = registerAuthors;
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const validEmailAddress = yield admin_model_1.default.findOne({ where: { email } });
        if (!validEmailAddress) {
            return res.status(404).json({
                message: "Email address not found!"
            });
        }
        const validPasswordMatch = yield bcrypt_1.default.compare(password, validEmailAddress.password);
        if (!validPasswordMatch) {
            return res.status(404).json({
                message: "Incorrect password!"
            });
        }
        ;
        const verifiedAdmin = validEmailAddress.verified;
        if (!verifiedAdmin) {
            return res.status(400).json({
                message: "Please verify your email address to continue..."
            });
        }
        ;
        const generateNewToken = yield (0, generate_token_1.generateAdminToken)(validEmailAddress.typeOfAdmin, validEmailAddress.socialMediaHandle, validEmailAddress.isAdmin, validEmailAddress.verified);
        validEmailAddress.token = generateNewToken;
        yield validEmailAddress.save();
        return res.status(200).json({
            message: "Login successful!",
            token: generateNewToken
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            status: "Failed!"
        });
    }
});
exports.loginAdmin = loginAdmin;
const verifyAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { verificationCode } = req.body;
        const theVerificationCode = yield admin_model_1.default.findOne({ where: { verifyNumber: verificationCode } });
        if (!theVerificationCode) {
            return res.status(400).json({
                message: "Invalid verification code!"
            });
        }
        theVerificationCode.verified = true;
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
exports.verifyAdmin = verifyAdmin;
const admin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.params.token;
        const admin = yield admin_model_1.default.findOne({ where: { token } });
        if (!admin) {
            return res.status(404).json({
                message: "token not found"
            });
        }
        ;
        return res.status(200).json({
            success: true,
            data: admin
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
        });
    }
});
exports.admin = admin;
