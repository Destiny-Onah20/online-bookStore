"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const image_upload_1 = require("../helpers/image.upload");
const book_controller_1 = require("../controllers/book.controller");
const authentications_1 = require("../middlewares/authentications");
const bookRouter = (0, express_1.Router)();
bookRouter.route("/book/:adminId").post(authentications_1.authenticatedAdmin, image_upload_1.uploadBookImage, book_controller_1.uploadAbook);
exports.default = bookRouter;
