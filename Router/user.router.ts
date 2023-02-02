import { Router } from "express";
import { registerValidation,loginValidation } from "../Validator/authValidator/userValidation";

import { GetAll, login, Register } from "../Controller/user.controller"
import { userAuth } from "../middlewares/authorization/user.auth";

const userRouter = Router()
userRouter.route("/").get(userAuth, GetAll);
userRouter.route("/register").post(registerValidation, Register);
userRouter.route("/login").post(loginValidation,login)

export default userRouter;