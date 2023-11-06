import jwt from "jsonwebtoken";
import Users from "../models/users.model";
import Admin from "../models/admin.model";
import { PayLoad } from "../interfaces/users.interface";
import { RequestHandler } from "express";

export const authenticatedUser: RequestHandler = async (req, res, next) => {
  try {
    const { token } = req.params;
    const registeredToken = await Users.findOne({
      where: {
        token: token
      }
    });
    if (!registeredToken) {
      return res.status(401).json({
        message: "Unauthorized token"
      })
    };

    const authenticToken = registeredToken.token;
    jwt.verify(authenticToken, <string>process.env.SECRET_KEY, async (err, payLoad) => {
      if (err) {
        return res.status(401).json({
          message: err.message
        });
      } else {
        const payLoadResponse = payLoad as PayLoad;

        next();
      }
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: "Failed",
    })
  }
}