import Users from "../models/users.model";
import Order from "../models/order.model";
import { RequestHandler } from "express";
import Book from "../models/book.model";
import OrderItems from "../models/orderItem.model";


export const getOrderByUser: RequestHandler = async (req, res) => {
  try {
    const customerId = req.params.userId;

    const order = await Order.findAll({
      where: { customerId },
    });

    if (order.length === 0) {
      return res.status(404).json({
        message: "Order details is currently empty."
      })
    }

    order.filter(async (item) => {
      const book = await Order.findByPk(item.id);
      book?.processed === true
    })
    const totalPrice = order.reduce((sum, order) => sum + order.price, 0);
    const orderItems = await OrderItems.create({
      customerId: Number(customerId),
      totalPrice
    });

    return res.status(200).json({
      message: "All summed order items",
      items: order,
      totalPrice: orderItems.totalPrice
    })

  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: "Failed."
    })
  }
}