"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const image_upload_1 = require("../helpers/image.upload");
const book_controller_1 = require("../controllers/book.controller");
const authentications_1 = require("../middlewares/authentications");
const validations_1 = require("../middlewares/validations");
const book_schema_1 = require("../schemas/book.schema");
const bookRouter = (0, express_1.Router)();
bookRouter.route("/book/:adminId").post(authentications_1.authenticatedAdmin, (0, validations_1.validateBookInput)(book_schema_1.bookInputSchema), image_upload_1.uploadBookImage, book_controller_1.uploadAbook);
bookRouter.route("/book").get(book_controller_1.allBooks);
bookRouter.route("/book/:bookId").get(book_controller_1.singleBook);
exports.default = bookRouter;
