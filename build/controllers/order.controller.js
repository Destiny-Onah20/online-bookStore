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
exports.singleOrder = exports.processOrder = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const book_model_1 = __importDefault(require("../models/book.model"));
const users_model_1 = __importDefault(require("../models/users.model"));
const processOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { quantity } = req.body;
        const bookId = req.params.bookId;
        const customerId = req.params.userId;
        const book = yield book_model_1.default.findOne({ where: { id: bookId } });
        if (!book) {
            return res.status(404).json({
                message: "Book not found!"
            });
        }
        const available = book.stock;
        if (quantity > available) {
            return res.status(400).json({
                message: "The quantity requested exceeds the available quantity."
            });
        }
        ;
        const orderData = {
            customerId: Number(customerId),
            adminId: Number(book.adminId),
            bookId: Number(bookId),
            quantity,
            price: quantity * Number(book.price)
        };
        const order = yield order_model_1.default.create(orderData);
        if (!order) {
            return res.status(400).json({
                message: "An Error occurred."
            });
        }
        return res.status(201).json({
            message: "order made success.",
            data: order
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            status: "Failed"
        });
    }
});
exports.processOrder = processOrder;
const singleOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.orderId;
        const order = yield order_model_1.default.findByPk(orderId, {
            include: [users_model_1.default],
        });
        if (!order) {
            return res.status(404).json({
                message: "Order not found."
            });
        }
        return res.status(200).json({
            data: order
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            status: "Failed"
        });
    }
});
exports.singleOrder = singleOrder;
