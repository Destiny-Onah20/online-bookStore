import { Router } from "express";
import { authenticatedUser } from "../middlewares/authentications";

import { getOrderByUser } from "../controllers/orderItem.controller";
import { payForOrder } from "../controllers/payment.controller";

const itemRoute = Router();


itemRoute.route("/orderItem/customer/:userId").get(authenticatedUser, getOrderByUser);
itemRoute.route("/order/:orderId/payment/:userId").post(authenticatedUser, payForOrder)

export default itemRoute;