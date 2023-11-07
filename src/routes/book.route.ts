import { Router } from "express";
import { uploadBookImage } from "../helpers/image.upload";
import { uploadAbook } from "../controllers/book.controller";
import { authenticatedAdmin } from "../middlewares/authentications";

const bookRouter = Router();

bookRouter.route("/book/:adminId").post(authenticatedAdmin, uploadBookImage, uploadAbook);

export default bookRouter;  