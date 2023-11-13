import { Router } from "express";
import { authenticatedUser } from "../middlewares/authentications";

import { processOrder, singleOrder } from "../controllers/order.controller";
import { getOrderByUser } from "../controllers/orderItem.controller";
const orderRouter = Router();

orderRouter.route("/order/:bookId/customer/:userId").post(authenticatedUser, processOrder);
orderRouter.route("/order/:orderId/:userId").get(authenticatedUser, singleOrder);
orderRouter.route("/order/customer/:userId").get(authenticatedUser, getOrderByUser)

export default orderRouter;