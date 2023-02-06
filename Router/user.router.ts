import { Router } from "express";
import { registerValidation,loginValidation } from "../Validator/authValidator/userValidation";

import { Deleting, GetAll, login, Register } from "../Controller/user.controller"
import { userAuth } from "../middlewares/authorization/user.auth";
import { IsAdmin } from "../middlewares/authorization/adminAuth";

const userRouter = Router()
userRouter.route("/register").post(registerValidation, Register);
userRouter.route("/login").post(loginValidation,login)
userRouter.route("/").get( IsAdmin, userAuth, GetAll);
userRouter.route("/remove/:ID").delete(Deleting)

export default userRouter;