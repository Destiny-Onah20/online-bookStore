"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_model_1 = __importDefault(require("../models/book.model"));
const category_model_1 = __importDefault(require("../models/category.model"));
class categoryController {
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { category } = req.body;
                const categoryInput = yield category_model_1.default.findOne({ where: { category } });
                if (categoryInput) {
                    return res.status(400).json({
                        message: `This category already exists!`
                    });
                }
                const categories = yield category_model_1.default.create(req.body);
                return res.status(201).json({
                    message: "category created!",
                    data: categories
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: error.message,
                    status: false
                });
            }
        });
    }
    ;
    getCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield category_model_1.default.findAll();
                if (!categories) {
                    return res.status(404).json({
                        message: 'Category currently empty at the moment!'
                    });
                }
                return res.status(200).json({
                    message: "All categories : " + categories.length,
                    data: categories
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: error.message,
                    status: false
                });
            }
        });
    }
    ;
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryId = req.params.categoryId;
                const category = yield category_model_1.default.destroy({ where: { id: categoryId } });
                if (!category) {
                    return res.status(400).json({
                        message: "An error occurred while deleting category!"
                    });
                }
                return res.status(202).json({
                    message: "Success!"
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: error.message,
                    status: false
                });
            }
        });
    }
    ;
    singleCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requiredCategory = req.params.category;
                console.log(requiredCategory);
                const categoryAvailability = yield category_model_1.default.findOne({ where: { category: requiredCategory } });
                if (!categoryAvailability) {
                    return res.status(200).json({
                        message: "Category asked for does not exists at the moment!"
                    });
                }
                const categories = yield book_model_1.default.findOne({ where: { category: requiredCategory } });
                if (!categories) {
                    return res.status(200).json({
                        message: "Category not found at the moment!"
                    });
                }
                return res.status(200).json({
                    message: "success!",
                    status: true,
                    data: categories
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: error.message,
                    status: false
                });
            }
        });
    }
}
;
exports.default = categoryController;
