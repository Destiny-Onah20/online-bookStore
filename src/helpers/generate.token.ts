import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const generateUserToken = (userId: string, username: string): string => {
  const userToken = jwt.sign({
    user_id: userId,
    username: username
  }, <string>process.env.SECRET_KEY, {
    expiresIn: <string>process.env.EXPIRE_TIME
  })

  return userToken;
};

export const generateAdminToken = (typeOfAdmin: string, socialMediaHandle: string, isAdmin: boolean, verified: boolean): string => {
  const adminToken = jwt.sign({
    user_id: typeOfAdmin,
    username: socialMediaHandle,
    isAdmin: isAdmin,
    verification: verified
  }, <string>process.env.SECRET_KEY_AD, {
    expiresIn: <string>process.env.EXPIRE_TIME_AD
  })

  return adminToken;
}