import { Router } from "express";
import categoryController from "../controllers/categories.controllers";

const categoryRouter = Router();

const category = new categoryController

categoryRouter.route("/books/category").post(category.createCategory);
categoryRouter.route("/books/category").get(category.getCategory);
categoryRouter.route("/books/category/:categoryId").delete(category.deleteCategory);
categoryRouter.route("/books/category/:category").get(category.singleCategory);

export default categoryRouter;