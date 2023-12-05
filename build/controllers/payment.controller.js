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
        const order = yield orderItem_model_1.default.findAll({ where: { orderItemId } });
        if (!order) {
            return res.status(404).json({
                message: "Cannot find the order you want to pay for"
            });
        }
        ;
        if (order[0].processed) {
            return res.status(400).json({
                message: "Already paid for this order."
            });
        }
        const customer = yield users_model_1.default.findOne({ where: { id: customerId } });
        const orderBook = yield order_model_1.default.findAll({ where: { customerId } });
        axios_1.default.post("https://api.paystack.co/charge", {
            card: {
                number: cardNumber,
                cvv,
                expiry_year: expiryYear,
                expiry_month: expiryMonth
            },
            email: customer === null || customer === void 0 ? void 0 : customer.email,
            currency: "NGN",
            amount: order[0].totalPrice
        }, {
            headers: {
                Authorization: `Bearer ${process.env.PAY_SECRET}`
            }
        }).then((response) => __awaiter(void 0, void 0, void 0, function* () {
            logger_1.default.info(response);
            if (response.data.status) {
                //reduce the quantity of the book after payment.
                orderBook.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                    const book = yield book_model_1.default.findOne({ where: { id: item.bookId } });
                    yield (book === null || book === void 0 ? void 0 : book.update({ stock: (book === null || book === void 0 ? void 0 : book.stock) - item.quantity }, { where: { id: item.bookId } }));
                    yield order_model_1.default.update({ processed: true }, {
                        where: { id: item.id }
                    });
                }));
                const paid = yield payment_model_1.default.create({
                    status: true,
                    totalAmount: order[0].totalPrice,
                    orderId: Number(orderItemId),
                    reference: response.data.reference
                });
                order.filter((items) => items.orderItemId);
                return res.status(201).json({
                    message: "Payment successful.",
                    data: paid
                });
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
