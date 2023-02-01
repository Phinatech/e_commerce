import ValiSchema from "./userSchema";
import { validator } from "../validators";
import { NextFunction, RequestHandler, Request, Response } from "express";

//Validation middleware Functions

export const registerValidation: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validator(ValiSchema.register, req.body, next);
};

export const loginValidation: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validator(ValiSchema.login, req.body, next);
};
