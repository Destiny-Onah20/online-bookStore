import { RequestHandler } from "express";
import Review from "../models/review.model";



export const createReview: RequestHandler = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    const review = await Review.create(req.body);

    return res.status(201).json({
      message: "success",
      status: true,
      data: review
    })
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: false
    })
  }
}

