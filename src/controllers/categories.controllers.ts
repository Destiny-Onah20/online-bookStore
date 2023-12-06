import Book from "../models/book.model";
import Category from "../models/category.model";
import { Request, Response } from "express";

class categoryController {
  async createCategory(req: Request, res: Response) {
    try {
      const { category } = req.body
      const categoryInput = await Category.findOne({ where: { category } });

      if (categoryInput) {
        return res.status(400).json({
          message: `This category already exists!`
        })
      }
      const categories = await Category.create(req.body);

      return res.status(201).json({
        message: "category created!",
        data: categories
      })
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
        status: false
      })
    }
  };

  async getCategory(req: Request, res: Response) {
    try {
      const categories = await Category.findAll();
      if (!categories) {
        return res.status(404).json({
          message: 'Category currently empty at the moment!'
        })
      }
      return res.status(200).json({
        message: "All categories : " + categories.length,
        data: categories
      })
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
        status: false
      })
    }
  };

  async deleteCategory(req: Request, res: Response) {
    try {
      const categoryId = req.params.categoryId;
      const category = await Category.destroy({ where: { id: categoryId } });
      if (!category) {
        return res.status(400).json({
          message: "An error occurred while deleting category!"
        })
      }
      return res.status(202).json({
        message: "Success!"
      })
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
        status: false
      })
    }
  };

  async singleCategory(req: Request, res: Response) {
    try {
      const requiredCategory = req.params.category;

      console.log(requiredCategory);

      const categoryAvailability = await Category.findOne({ where: { category: requiredCategory } });

      if (!categoryAvailability) {
        return res.status(200).json({
          message: "Category asked for does not exists at the moment!"
        })
      }

      const categories = await Book.findOne({ where: { category: requiredCategory } });
      if (!categories) {
        return res.status(200).json({
          message: "Category not found at the moment!"
        })
      }
      return res.status(200).json({
        message: "success!",
        status: true,
        data: categories
      })
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
        status: false
      })
    }
  }
};

export default categoryController;