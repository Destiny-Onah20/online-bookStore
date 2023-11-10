import { Router } from "express";
import { uploadBookImage, uploadBookPdf } from "../helpers/image.upload";
import { allBooks, deleteAbook, searchForBooks, singleBook, uploadAbook } from "../controllers/book.controller";
import { authenticatedAdmin } from "../middlewares/authentications";
import { validateBookInput } from "../middlewares/validations";
import { bookInputSchema } from "../schemas/book.schema";

const bookRouter = Router();

bookRouter.route("/book/:adminId").post(authenticatedAdmin, validateBookInput(bookInputSchema), uploadBookImage, uploadBookPdf, uploadAbook);
bookRouter.route("/book").get(allBooks);
bookRouter.route("/book").post(searchForBooks);
bookRouter.route("/book/:bookId").get(singleBook);
bookRouter.route("/book/:bookId/admin/:adminId").delete(authenticatedAdmin, deleteAbook);

export default bookRouter;  