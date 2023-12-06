"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_controllers_1 = __importDefault(require("../controllers/categories.controllers"));
const categoryRouter = (0, express_1.Router)();
const category = new categories_controllers_1.default;
categoryRouter.route("/books/category").post(category.createCategory);
categoryRouter.route("/books/category").get(category.getCategory);
categoryRouter.route("/books/category/:categoryId").delete(category.deleteCategory);
categoryRouter.route("/books/category/:category").get(category.singleCategory);
exports.default = categoryRouter;
