import express from "express";
import cors from "cors"
import path from "path";
import userRoute from "./routes/user.route";

const app = express();



app.use(express.json());
app.use(cors());
app.set('view engine', 'pug');
app.set('view', path.join(__dirname, 'public'));

app.use("/api/v1", userRoute);

export default app;