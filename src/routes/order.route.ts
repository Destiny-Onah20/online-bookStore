import { Router } from "express";
import { authenticatedUser } from "../middlewares/authentications";

import { processOrder, singleOrder } from "../controllers/order.controller";
const orderRouter = Router();

orderRouter.route("/order/:bookId/:userId").post(authenticatedUser, processOrder);
orderRouter.route("/order/:orderId/:userId").get(authenticatedUser, singleOrder);

export default orderRouter;