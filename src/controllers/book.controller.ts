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
      price: Number(price),
      stock: Number(stock),
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

export const allBooks: RequestHandler = async (req, res) => {
  try {
    const books = await Book.findAll();
    if (books.length < 0) {
      return res.status(200).json({
        message: "Books not available"
      })
    } else {
      return res.status(200).json({
        message: "Success",
        length: books.length,
        data: books.reverse()
      })
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    })
  }
}


export const singleBook: RequestHandler = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const books = await Book.findAll({ where: { id: bookId } });
    if (books.length < 0) {
      return res.status(200).json({
        message: "Books not available"
      })
    } else {
      return res.status(200).json({
        message: "Success",
        length: books.length,
        data: books.reverse()[0]
      })
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    })
  }
}