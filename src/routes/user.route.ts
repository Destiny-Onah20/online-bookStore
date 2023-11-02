import { Router } from "express";
import { loginUser, singUpUser, verifyUser } from "../controllers/user.controller";
import { validateUserInput } from "../middlewares/validations";
import { userInputSchema } from "../schemas/user.schema";


const userRoute = Router();

userRoute.route("/user").post(validateUserInput(userInputSchema), singUpUser);
userRoute.route("/user").patch(verifyUser);
userRoute.route("/login").post(loginUser);

export default userRoute;