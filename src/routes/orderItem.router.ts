import { Router } from "express";
import { authenticatedUser } from "../middlewares/authentications";

import { getOrderByUser } from "../controllers/orderItem.controller";

const itemRoute = Router();


itemRoute.route("/orderItem/customer/:userId").get(authenticatedUser, getOrderByUser)

export default itemRoute;