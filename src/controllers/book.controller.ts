import { RequestHandler } from "express";
import Book from "../models/book.model";
import { BookInputInterface } from "../interfaces/books.interface";
import Admin from "../models/admin.model";


export const uploadAbook: RequestHandler = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const AdminDetails = await Admin.findAll({ where: { id: adminId } });
    const { title, description, price, stock, bookImage, cloudId } = req.body;

    const bookData: BookInputInterface = {
      title,
      description,
      adminId: Number(adminId),
      author: AdminDetails[0].fullName,
      price,
      stock,
      bookImage,
      cloudId
    }
    const publishBook = await Book.create(bookData);

    return res.status(201).json({
      message: "Success",
      data: publishBook
    })

  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    })
  }
}