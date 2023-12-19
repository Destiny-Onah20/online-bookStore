import Bull from "bull";
import { createBullBoard } from "bull-board";
import { BullAdapter } from "bull-board/bullAdapter";
import dotenv from "dotenv";
import emailProcess from "../processing/email.process";
import mailInterface from "../interfaces/mailservice.interface";
import MailService from "../middlewares/mailservice";
dotenv.config();

export const emailQueue = new Bull("email", {
  redis: process.env.REDIS_UR
});

const { setQueues } = createBullBoard([]);

setQueues([
  new BullAdapter(emailQueue)
]);


const sendMail = async (data: mailInterface) => {
  await emailQueue.add(data, {
  })
};

export default sendMail;