import {Response,Request,NextFunction} from "express"
import { AppError,HttpCode } from "../utils/AppError"

const devError = (err:AppError, res:Response)=>{
    res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      status: err.httpCode,
      message: err.message,
      error: err,
      stack: err.stack,
    })
};

export const errorHandler = (
   err:AppError,
   req:Request,
   res:Response,
    next:NextFunction

)=>{
    devError(err,res)
}