import { Router } from "express";
import { BillingInfo } from "../controllers/billing.controller";
import { authenticatedUser } from "../middlewares/authentications";
import { validateBilling } from "../middlewares/validations";
import { billingInputSchema } from "../schemas/billing.schema";

const billingRoute = Router();

billingRoute.route("/billing/:userId").post(authenticatedUser, validateBilling(billingInputSchema), BillingInfo);

export default billingRoute;