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
exports.payForOrder = void 0;
const payment_model_1 = __importDefault(require("../models/payment.model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const axios_1 = __importDefault(require("axios"));
const book_model_1 = __importDefault(require("../models/book.model"));
const order_model_1 = __importDefault(require("../models/order.model"));
const orderItem_model_1 = __importDefault(require("../models/orderItem.model"));
const logger_1 = __importDefault(require("../utils/logger"));
const users_model_1 = __importDefault(require("../models/users.model"));
const payForOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderItemId = req.params.orderId;
        const customerId = req.params.userId;
        const { cardNumber, cvv, pin, expiryYear, expiryMonth } = req.body;
        const order = yield orderItem_model_1.default.findOne({ where: { orderItemId } });
        if (!order) {
            return res.status(404).json({
                message: "Cannot find the order you want to pay for"
            });
        }
        ;
        const customer = yield users_model_1.default.findOne({ where: { id: customerId } });
        const orderBook = yield order_model_1.default.findAll({ where: { customerId } });
        const book = yield book_model_1.default.findOne({ where: { id: orderBook[0].bookId } });
        axios_1.default.post("https://api.paystack.co/charge", {
            card: {
                number: cardNumber,
                cvv,
                expiry_year: expiryYear,
                expiry_month: expiryMonth
            },
            email: customer === null || customer === void 0 ? void 0 : customer.email,
            first_name: customer === null || customer === void 0 ? void 0 : customer.username,
            currency: "NGN",
            amount: order.totalPrice
        }, {
            headers: {
                Authorization: `Bearer ${process.env.PAY_SECRET}`
            }
        }).then((response) => __awaiter(void 0, void 0, void 0, function* () {
            if (response.data.status === true) {
                //reduce the quantity of the book after payment.
                orderBook.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                    yield (book === null || book === void 0 ? void 0 : book.update({ stock: book.stock - item.quantity }));
                }));
                yield payment_model_1.default.create({
                    status: true,
                    totalAmount: order.totalPrice,
                    orderId: Number(orderItemId)
                });
                yield orderItem_model_1.default.destroy({ where: { orderItemId } });
            }
        })).catch((error) => {
            res.status(500).json({
                message: error.message
            });
            logger_1.default.error(error);
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            status: "failed."
        });
    }
});
exports.payForOrder = payForOrder;
