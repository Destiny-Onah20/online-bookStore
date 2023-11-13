"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentications_1 = require("../middlewares/authentications");
const orderItem_controller_1 = require("../controllers/orderItem.controller");
const itemRoute = (0, express_1.Router)();
itemRoute.route("/orderItem/customer/:userId").get(authentications_1.authenticatedUser, orderItem_controller_1.getOrderByUser);
exports.default = itemRoute;
