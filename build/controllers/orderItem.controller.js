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
exports.getOrderByUser = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const orderItem_model_1 = __importDefault(require("../models/orderItem.model"));
const getOrderByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerId = req.params.userId;
        const order = yield order_model_1.default.findAll({
            where: { customerId },
        });
        if (order.length === 0) {
            return res.status(404).json({
                message: "Order details is currently empty."
            });
        }
        const totalPrice = order.reduce((sum, order) => sum + order.price, 0);
        const orderItems = yield orderItem_model_1.default.create({
            customerId: Number(customerId),
            totalPrice
        });
        return res.status(200).json({
            message: "All summed order items",
            items: order,
            totalPrice: orderItems.totalPrice
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            status: "Failed."
        });
    }
});
exports.getOrderByUser = getOrderByUser;
