import { RequestHandler } from "express";
import Book from "../models/book.model";
import { BookInputInterface } from "../interfaces/books.interface";
import Admin from "../models/admin.model";
import Cloudinary from "../utils/cloudinary";
import redis from "../utils/caching";


export const uploadAbook: RequestHandler = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const AdminDetails = await Admin.findAll({ where: { id: adminId } });
    const { title, description, price, stock, bookImage, cloudId, pdfFile, pdfCloudId } = req.body;

    const bookData: BookInputInterface = {
      title,
      description,
      adminId: Number(adminId),
      author: AdminDetails[0].fullName,
      price: Number(price),
      stock: Number(stock),
      bookImage,
      pdfFile,
      pdfCloudId,
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
    const cachedValue = await redis.get("all");
    if (cachedValue) {
      return res.status(200).json({
        message: "Success",
        length: cachedValue.length,
        data: JSON.parse(cachedValue).reverse()
      })
    }
    const books = await Book.findAll();
    if (books.length < 0) {
      return res.status(200).json({
        message: "Books not available"
      })
    } else {
      await redis.set("all", JSON.stringify(books));
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

    const cachedValue = await redis.get(bookId);
    if (cachedValue) {
      return res.status(200).json({
        message: "Success",
        data: cachedValue
      })
    }

    const books = await Book.findAll({ where: { id: bookId } });
    if (books.length < 0) {
      return res.status(200).json({
        message: "Books not available"
      })
    } else {
      await redis.set(bookId, JSON.stringify(books));
      return res.status(200).json({
        message: "Success",
        length: books.length,
        data: books
      })
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.messageufn
    })
  }
};

export const deleteAbook: RequestHandler = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findByPk(bookId);
    const adminId = req.params.adminId;

    if (!book) {
      return res.status(404).json({
        message: "Book not found."
      })
    }

    const vendor = book.adminId;
    if (vendor !== parseInt(adminId)) {
      return res.status(400).json({
        message: "Not permitted to delete this book."
      })
    }
    await Cloudinary.uploader.destroy(book.cloudId);
    await Book.destroy({ where: { id: bookId } });
    return res.status(202).json({
      message: "Book deleted successfully."
    })

  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    })
  }
};

export const searchForBooks: RequestHandler = async (req, res) => {
  try {
    const { searchValue } = req.body;
    const searchResult = await Book.search(searchValue);
    if (searchResult.length < 1) {
      return res.status(200).json({
        message: `No result for your search currently.`
      })
    }
    return res.status(200).json({
      message: `Search result for ${searchValue}`,
      data: searchResult
    })
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    })
  }
};