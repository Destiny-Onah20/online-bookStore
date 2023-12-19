import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors"
import path from "path";
import { createBullBoard } from "bull-board";
import { rateLimit } from "express-rate-limit";
import fileUpload from "express-fileupload"
import userRoute from "./routes/user.route";
import adminRouter from "./routes/admin.route";
import bookRouter from "./routes/book.route";
import orderRouter from "./routes/order.route";
import itemRoute from "./routes/orderItem.router";
import categoryRouter from "./routes/category.route";
import billingRoute from "./routes/billing.route";
import sendMail from "./queues/email.queue";

const app = express();

app.use(helmet());

const { router } = createBullBoard([]);
app.use("/admin/queue", router);

const limiter = rateLimit({
  max: 3,
  windowMs: 60 * 60 * 1000,
  message: (req: Request, res: Response) => {
    return res.status(400).json({
      message: "Too many request from this IP address, Please try again later!"
    })
  }
});

app.post("/send-mail", async (req: Request, res: Response) => {
  await sendMail(req.body);
  res.send("ok")

});

app.use(express.json());
app.use(cors());

app.use("/api/v1/admin/login", limiter);

app.use(fileUpload({
  useTempFiles: true
}))

app.set('view engine', 'pug');
app.set('view', path.join(__dirname, 'public'));

app.use("/api/v1", userRoute);

app.use("/api/v1", adminRouter);

app.use("/api/v1", bookRouter);

app.use("/api/v1", orderRouter);

app.use("/api/v1", itemRoute);

app.use("/api/v1", categoryRouter);

app.use("/api/v1", billingRoute);

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    message: `This Route ${req.originalUrl} does not exist on this Server`
  })
})

export default app;