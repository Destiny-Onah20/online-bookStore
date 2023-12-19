import nodemailer from "nodemailer";
import { Job } from "bull";
import dotenv from 'dotenv';
import mailInterface from "../interfaces/mailservice.interface";
import { emailQueue } from "../queues/email.queue";
dotenv.config();

const MailService = emailQueue.process(async (job: Job, done) => {

  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mail = async (Option: mailInterface) => {
    const mailOption = {
      from: {
        name: "Room",
        address: <string>process.env.EMAIL
      },
      to: Option.email,
      subject: Option.subject,
      text: Option.message,
      html: Option.html
    }
    await transporter.sendMail(mailOption);

  }
}

);

export default MailService;
