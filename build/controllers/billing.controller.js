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
exports.BillingInfo = void 0;
const billing_model_1 = __importDefault(require("../models/billing.model"));
const BillingInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.params.userId;
        const { firstName, lastName, email, phoneNumber, country, state, town, homeAddress, } = req.body;
        const data = {
            fullName: lastName + " " + firstName,
            email,
            phoneNumber,
            country,
            state,
            town,
            homeAddress,
            user: Number(user_id)
        };
        const response = yield billing_model_1.default.create(data);
        return res.status(201).json({
            status: true,
            data: response
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.BillingInfo = BillingInfo;
