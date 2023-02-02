import { Router } from "express";
import { registerValidation,loginValidation } from "../Validator/authValidator/userValidation";

import { GetAll, login, Register } from "../Controller/user.controller"

const userRouter = Router()

userRouter.route("/").get(registerValidation, Register)
userRouter.route("/registerUser").post(GetAll);
userRouter.route("/login").post(loginValidation,login)

export default userRouter;