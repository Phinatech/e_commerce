import { Router } from "express";

import { GetAll, Register } from "../Controller/user.controller"

const userRouter = Router()

userRouter.route("/").get(Register)
userRouter.route("/registerUser").post(GetAll);

export default userRouter;