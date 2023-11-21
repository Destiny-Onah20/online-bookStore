import nodemailer from "nodemailer";
import pug from "pug";
import Users from "../models/users.model";
import htmlTotext from "html-to-text";
import dotenv from 'dotenv';
import mailInterface from "../interfaces/mailservice.interface";
dotenv.config();

const MailService = async (Option: mailInterface) => {

  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions = {
    from: {
      name: "Page.com",
      address: <string>process.env.EMAIL
    },
    to: Option.email,
    subject: Option.subject,
    text: Option.message,
    html: Option.html
  };
  await transporter.sendMail(mailOptions)

};

export default MailService;

