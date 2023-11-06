import { Router } from "express";
import { registerAuthors } from "../controllers/admin.controller";
import { validateAdmin } from "../middlewares/validations";
import { adminInputSchema } from "../schemas/admin.schema";


const adminRouter = Router();

adminRouter.route("/admin").post(validateAdmin(adminInputSchema), registerAuthors);

export default adminRouter;