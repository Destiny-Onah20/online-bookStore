"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentications_1 = require("../middlewares/authentications");
const order_controller_1 = require("../controllers/order.controller");
const orderRouter = (0, express_1.Router)();
orderRouter.route("/order/:bookId/:userId").post(authentications_1.authenticatedUser, order_controller_1.processOrder);
orderRouter.route("/order/:orderId/:userId").get(authentications_1.authenticatedUser, order_controller_1.singleOrder);
exports.default = orderRouter;
