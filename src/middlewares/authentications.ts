import jwt, { Secret } from "jsonwebtoken";
import Users from "../models/users.model";
import Admin from "../models/admin.model";
import { IGetUserAuthInfoRequest, PayLoad } from "../interfaces/users.interface";
import { NextFunction, RequestHandler, Request, Response } from "express";
import { decodeAdminToken } from "../helpers/jwt.token";
import { AdminInterface } from "../interfaces/admin.interface";

export const authenticatedUser = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const registeredUser = await Users.findOne({
      where: {
        id: userId
      }
    });
    if (!registeredUser) {
      return res.status(401).json({
        message: "Unauthorized token"
      })
    };

    const authenticToken = registeredUser.token;
    jwt.verify(authenticToken, <string>process.env.SECRET_KEY as Secret, async (err, payLoad) => {
      if (err) {
        return res.status(401).json({
          message: "Please login "
        });
      } else {
        req.user = payLoad
        next()
      }
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: "Failed",
    })
  }
}

export const authenticatedAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { adminId } = req.params;
    const registeredAdmin = await Admin.findOne({
      where: {
        id: adminId
      }
    });
    if (!registeredAdmin) {
      return res.status(401).json({
        message: "Unauthorized token"
      })
    };

    const authenticToken = registeredAdmin.token;
    jwt.verify(authenticToken, <string>process.env.SECRET_KEY_AD as Secret, async (err, payLoad) => {
      if (err) {
        return res.status(401).json({
          message: "Please login "
        });
      } else {
        next()
      }
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: "Failed",
    })
  }
}
