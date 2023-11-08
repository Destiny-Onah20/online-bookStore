import { Router } from "express";
import { uploadBookImage } from "../helpers/image.upload";
import { allBooks, singleBook, uploadAbook } from "../controllers/book.controller";
import { authenticatedAdmin } from "../middlewares/authentications";
import { validateBookInput } from "../middlewares/validations";
import { bookInputSchema } from "../schemas/book.schema";

const bookRouter = Router();

bookRouter.route("/book/:adminId").post(authenticatedAdmin, validateBookInput(bookInputSchema), uploadBookImage, uploadAbook);
bookRouter.route("/book").get(allBooks);
bookRouter.route("/book/:bookId").get(singleBook);

export default bookRouter;  