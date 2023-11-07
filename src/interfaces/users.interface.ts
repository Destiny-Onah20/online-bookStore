import { Request } from "express"

export interface UsersInterface {
  id?: number;
  user_id: string;
  username: string;
  email: string;
  password: string;
  token?: string;
  profileImage?: string;
  verify?: boolean;
  verifyNumber?: string;
  cloudId?: string;
  createdAt?: Date;
  updatedAt?: Date
}

export interface userInputInterface {
  username: string;
  email: string;
  password: string;
}


export interface PayLoad {
  email: string;
  id: number;
}

export interface IGetUserAuthInfoRequest extends Request {
  user: any // or any other type
}