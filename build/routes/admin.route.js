"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const validations_1 = require("../middlewares/validations");
const admin_schema_1 = require("../schemas/admin.schema");
const adminRouter = (0, express_1.Router)();
adminRouter.route("/admin").post((0, validations_1.validateAdmin)(admin_schema_1.adminInputSchema), admin_controller_1.registerAuthors);
adminRouter.route("/admin/login").post((0, validations_1.validateAdminLogin)(admin_schema_1.adminLoginInput), admin_controller_1.loginAdmin);
adminRouter.route("/admin").put(admin_controller_1.verifyAdmin);
adminRouter.route("/admin/:token").post(validations_1.validateAdmin, admin_controller_1.admin);
exports.default = adminRouter;
