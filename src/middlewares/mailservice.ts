import nodemailer from "nodemailer";
import { Job } from "bull";
import dotenv from 'dotenv';
import mailInterface from "../interfaces/mailservice.interface";
import { emailQueue } from "../queues/email.queue";
dotenv.config();

class mailSender {
  private static instance: mailSender
  private transporter!: nodemailer.Transporter;

  static getInstance() {
    if (!mailSender.instance) {
      mailSender.instance = new mailSender()
    }
    return mailSender.instance
  };
  async createConnection() {
    this.transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    })
    try {
      await this.transporter.verify();
      // console.log("MailSender connection established successfully.");
    } catch (error) {
      // console.error("Error establishing MailSender connection:", error);
    }
  };
  async mail(Option: mailInterface) {
    const mailOption = {
      from: {
        name: "Page",
        address: process.env.EMAIL as string
      },
      to: Option.email,
      subject: Option.subject,
      text: Option.message,
      html: Option.html
    }
    // console.log(mailOption);
    await this.transporter.sendMail(mailOption);

  }
  getTransporter() {
    return this.transporter;
  }
}

export default mailSender;

