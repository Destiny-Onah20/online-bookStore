import { Router } from "express";
import { admin, loginAdmin, registerAuthors, verifyAdmin } from "../controllers/admin.controller";
import { validateAdmin, validateAdminLogin } from "../middlewares/validations";
import { adminInputSchema, adminLoginInput } from "../schemas/admin.schema";


const adminRouter = Router();

adminRouter.route("/admin").post(validateAdmin(adminInputSchema), registerAuthors);
adminRouter.route("/admin/login").post(validateAdminLogin(adminLoginInput), loginAdmin);
adminRouter.route("/admin").put(verifyAdmin);

adminRouter.route("/admin/:token").post(validateAdmin, admin);

export default adminRouter;  