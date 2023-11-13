import express, { Request, Response } from "express";
import cors from "cors"
import path from "path";
import fileUpload from "express-fileupload"
import userRoute from "./routes/user.route";
import adminRouter from "./routes/admin.route";
import bookRouter from "./routes/book.route";
import orderRouter from "./routes/order.route";
import itemRoute from "./routes/orderItem.router";

const app = express();



app.use(express.json());
app.use(cors());
app.use(fileUpload({
  useTempFiles: true
}))

app.set('view engine', 'pug');
app.set('view', path.join(__dirname, 'public'));

app.use("/api/v1", userRoute);

app.use("/api/v1", adminRouter);

app.use("/api/v1", bookRouter);

app.use("/api/v1", orderRouter);

app.use("/api/v1", itemRoute)

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    message: `This Route ${req.originalUrl} does not exist on this Server`
  })
})

export default app;