import { billingDataInterface } from "../interfaces/billing.interface";
import Billing from "../models/billing.model";
import { RequestHandler } from "express";


export const BillingInfo: RequestHandler = async (req, res) => {
  try {
    const user_id = req.params.userId;
    const { firstName, lastName, email, phoneNumber, country, state, town, homeAddress, } = req.body;

    const data: billingDataInterface = {
      fullName: lastName + " " + firstName,
      email,
      phoneNumber,
      country,
      state,
      town,
      homeAddress,
      user: Number(user_id)
    };
    const response = await Billing.create(data);
    return res.status(201).json({
      status: true,
      data: response
    })
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
};