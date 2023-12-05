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
exports.searchForBooks = exports.deleteAbook = exports.singleBook = exports.allBooks = exports.uploadAbook = void 0;
const book_model_1 = __importDefault(require("../models/book.model"));
const admin_model_1 = __importDefault(require("../models/admin.model"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const caching_1 = __importDefault(require("../utils/caching"));
const review_model_1 = __importDefault(require("../models/review.model"));
const uploadAbook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminId = req.params.adminId;
        const AdminDetails = yield admin_model_1.default.findAll({ where: { id: adminId } });
        const { title, description, price, stock, bookImage, cloudId, pdfFile, pdfCloudId } = req.body;
        const bookData = {
            title,
            description,
            adminId: Number(adminId),
            author: AdminDetails[0].fullName,
            price: Number(price),
            stock: Number(stock),
            bookImage,
            pdfFile,
            pdfCloudId,
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
const allBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cachedValue = yield caching_1.default.get("all");
        if (cachedValue) {
            return res.status(200).json({
                message: "Success",
                length: cachedValue.length,
                data: JSON.parse(cachedValue).reverse()
            });
        }
        const books = yield book_model_1.default.findAll();
        if (books.length < 0) {
            return res.status(200).json({
                message: "Books not available"
            });
        }
        else {
            yield caching_1.default.set("all", JSON.stringify(books));
            return res.status(200).json({
                message: "Success",
                length: books.length,
                data: books.reverse()
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});
exports.allBooks = allBooks;
const singleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const cachedValue = yield caching_1.default.get(bookId);
        if (cachedValue) {
            return res.status(200).json({
                message: "Success",
                data: cachedValue
            });
        }
        const books = yield book_model_1.default.findAll({
            where: { id: bookId },
            include: [review_model_1.default]
        });
        if (books.length < 0) {
            return res.status(200).json({
                message: "Books not available"
            });
        }
        else {
            yield caching_1.default.set(bookId, JSON.stringify(books));
            return res.status(200).json({
                message: "Success",
                length: books.length,
                data: books
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.messageufn
        });
    }
});
exports.singleBook = singleBook;
const deleteAbook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield book_model_1.default.findByPk(bookId);
        const adminId = req.params.adminId;
        if (!book) {
            return res.status(404).json({
                message: "Book not found."
            });
        }
        const vendor = book.adminId;
        if (vendor !== parseInt(adminId)) {
            return res.status(400).json({
                message: "Not permitted to delete this book."
            });
        }
        yield cloudinary_1.default.uploader.destroy(book.cloudId);
        yield book_model_1.default.destroy({ where: { id: bookId } });
        return res.status(202).json({
            message: "Book deleted successfully."
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});
exports.deleteAbook = deleteAbook;
const searchForBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchValue } = req.body;
        const searchResult = yield book_model_1.default.search(searchValue);
        if (searchResult.length < 1) {
            return res.status(200).json({
                message: `No result for your search currently.`
            });
        }
        return res.status(200).json({
            message: `Search result for ${searchValue}`,
            data: searchResult
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});
exports.searchForBooks = searchForBooks;
