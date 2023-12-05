import { RequestHandler } from "express";
import Payment from "../models/payment.model";
import dotenv from "dotenv";
dotenv.config();
import axios, { AxiosError } from "axios";
import Book from "../models/book.model";
import Order from "../models/order.model";
import OrderItems from "../models/orderItem.model";
import logger from "../utils/logger";
import Users from "../models/users.model";


export const payForOrder: RequestHandler = async (req, res) => {
  try {
    const orderItemId = req.params.orderId;
    const customerId = req.params.userId;
    const { cardNumber, cvv, pin, expiryYear, expiryMonth } = req.body;

    const order = await OrderItems.findAll({ where: { orderItemId } });
    if (!order) {
      return res.status(404).json({
        message: "Cannot find the order you want to pay for"
      })
    };

    if (order[0].processed) {
      return res.status(400).json({
        message: "Already paid for this order."
      })
    }

    const customer = await Users.findOne({ where: { id: customerId } });
    const orderBook = await Order.findAll({ where: { customerId } });

    axios.post("https://api.paystack.co/charge", {
      card: {
        number: cardNumber,
        cvv,
        expiry_year: expiryYear,
        expiry_month: expiryMonth
      },
      email: customer?.email,
      currency: "NGN",
      amount: order[0].totalPrice
    }, {
      headers: {
        Authorization: `Bearer ${process.env.PAY_SECRET}`
      }
    }).then(async (response) => {
      logger.info(response)
      if (response.data.status) {

        //reduce the quantity of the book after payment.
        orderBook.map(async (item: any) => {
          const book = await Book.findOne({ where: { id: item.bookId } });

          await book?.update({ stock: book?.stock - item.quantity }, { where: { id: item.bookId } })
          await Order.update({ processed: true }, {
            where: { id: item.id }
          })
        })

        const paid = await Payment.create({
          status: true,
          totalAmount: order[0].totalPrice,
          orderId: Number(orderItemId),
          reference: response.data.reference
        })

        order.filter((items) => items.orderItemId)

        return res.status(201).json({
          message: "Payment successful.",
          data: paid
        })
      }
    }).catch((error: AxiosError) => {
      res.status(500).json({
        message: error.message
      })
      logger.error(error)
    })

  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: "failed."
    })
  }
}