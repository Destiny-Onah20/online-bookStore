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
exports.uploadAbook = void 0;
const book_model_1 = __importDefault(require("../models/book.model"));
const admin_model_1 = __importDefault(require("../models/admin.model"));
const uploadAbook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminId = req.params.adminId;
        const AdminDetails = yield admin_model_1.default.findAll({ where: { id: adminId } });
        const { title, description, price, stock, bookImage, cloudId } = req.body;
        const bookData = {
            title,
            description,
            adminId: Number(adminId),
            author: AdminDetails[0].fullName,
            price,
            stock,
            bookImage,
            cloudId
        };
        const publishBook = yield book_model_1.default.create(bookData);
        return res.status(201).json({
            message: "Success",
            data: publishBook
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});
exports.uploadAbook = uploadAbook;
