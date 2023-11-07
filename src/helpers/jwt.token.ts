import jwt, { Secret } from "jsonwebtoken";
import Admin from "../models/admin.model";
import Users from "../models/users.model";
import { AdminInterface } from "../interfaces/admin.interface";
import { PayLoad } from "../interfaces/users.interface";


export const decodeAdminToken = async (token: string, jwtSecret: Secret): Promise<AdminInterface | null> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, async (err, data) => {
      if (err) {
        resolve(null)
      }
      try {
        const payLoad = data as PayLoad;
        const admin = await Admin.findOne({ where: { email: payLoad.email } })
        if (admin) {
          const adminData: AdminInterface = admin.dataValues;
          resolve(adminData)
        } else {
          resolve(null)
        }
      } catch (error) {
        reject(error)
      }
    })
  })
} 
