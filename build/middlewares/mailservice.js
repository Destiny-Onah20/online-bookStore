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
const nodemailer_1 = __importDefault(require("nodemailer"));
const pug_1 = __importDefault(require("pug"));
const users_model_1 = __importDefault(require("../models/users.model"));
const html_to_text_1 = __importDefault(require("html-to-text"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MailService = (Option) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: process.env.SERVICE,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    const userData = yield users_model_1.default.findOne({ where: { email: Option.email } });
    const html = pug_1.default.renderFile(`${__dirname}/../views/email/template.pug`, {
        verificationNumber: userData === null || userData === void 0 ? void 0 : userData.verifyNumber,
        username: userData === null || userData === void 0 ? void 0 : userData.username
    });
    const mailOptions = {
        from: {
            name: "Page.com",
            address: process.env.EMAIL
        },
        to: Option.email,
        subject: Option.subject,
        text: html_to_text_1.default.convert(html),
        html: html
    };
    yield transporter.sendMail(mailOptions);
});
exports.default = MailService;
