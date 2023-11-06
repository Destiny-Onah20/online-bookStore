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
exports.authenticatedUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_model_1 = __importDefault(require("../models/users.model"));
const authenticatedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        const registeredToken = yield users_model_1.default.findOne({
            where: {
                token: token
            }
        });
        if (!registeredToken) {
            return res.status(401).json({
                message: "Unauthorized token"
            });
        }
        ;
        const authenticToken = registeredToken.token;
        jsonwebtoken_1.default.verify(authenticToken, process.env.SECRET_KEY, (err, payLoad) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(401).json({
                    message: err.message
                });
            }
            else {
                const payLoadResponse = payLoad;
                next();
            }
        }));
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            status: "Failed",
        });
    }
});
exports.authenticatedUser = authenticatedUser;
