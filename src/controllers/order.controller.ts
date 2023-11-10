import Order from "../models/order.model";
import Book from "../models/book.model";
import { orderDataObject } from "../interfaces/order.interface"
import { RequestHandler, Response, Request } from "express";
import Users from "../models/users.model";
import Admin from "../models/admin.model";


export const processOrder: RequestHandler = async (req, res) => {
  try {
    const { quantity } = req.body;
    const bookId = req.params.bookId;
    const customerId = req.params.userId;

    const book = await Book.findOne({ where: { id: bookId } });

    if (!book) {
      return res.status(404).json({
        message: "Book not found!"
      })
    }
    const available = book.stock;
    if (quantity > available) {
      return res.status(400).json({
        message: "The quantity requested exceeds the available quantity."
      })
    };

    const orderData: orderDataObject = {
      customerId: Number(customerId),
      adminId: Number(book.adminId),
      bookId: Number(bookId),
      quantity,
      price: quantity * Number(book.price)
    }
    const order = await Order.create(orderData);
    if (!order) {
      return res.status(400).json({
        message: "An Error occurred."
      })
    }
    return res.status(201).json({
      message: "order made success.",
      data: order
    })
  }
  catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: "Failed"
    })
  }
};

export const singleOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findByPk(orderId, {
      include: [Users],
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found."
      })
    }
    return res.status(200).json({
      data: order
    })

  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: "Failed"
    })
  }
}