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
exports.uploadBookPdf = exports.uploadBookImage = void 0;
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const uploadBookImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.bookImage;
        if (!file) {
            return res.status(404).json({
                message: "No file Uploaded!"
            });
        }
        const uploads = Array.isArray(file) ? file : [file];
        for (const file of uploads) {
            const result = yield cloudinary_1.default.uploader.upload(file.tempFilePath);
            req.body.bookImage = result.secure_url;
            req.body.cloudId = result.public_id;
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});
exports.uploadBookImage = uploadBookImage;
const uploadBookPdf = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const file = (_b = req.files) === null || _b === void 0 ? void 0 : _b.pdfFile;
        if (!file) {
            next();
        }
        const uploads = Array.isArray(file) ? file : [file];
        for (const file of uploads) {
            const result = yield cloudinary_1.default.uploader.upload(file.tempFilePath, (err, payload) => {
                if (err) {
                    return res.status(400).json({
                        message: err.message
                    });
                }
                else {
                    return payload;
                }
            });
            req.body.pdfFile = result.secure_url;
            req.body.pdfCloudId = result.public_id;
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});
exports.uploadBookPdf = uploadBookPdf;
