import UserModel from "../model/user.model";
import { IUser } from "../interface/User";
import { NextFunction,Request,Response } from "express"
import bcrypt from "bcrypt"
import { asyncHandler } from "../utils/AsyncHandler"
import { AppError, HttpCode } from "../utils/AppError"

export const Register = asyncHandler(
   async (
    req:Request<{},{},IUser>,
    res:Response,
    next:NextFunction
   ):Promise<Response> => {
    const {name, email, password,confirmPassword,cart} = req.body
    
   const salt:string = await bcrypt.genSalt(12)
   const hassedPassword = await bcrypt.hash(password, salt)
    const regUser = UserModel.create({
      name,
      email,
      password:hassedPassword,
      confirmPassword:hassedPassword,
      cart
    })

    if (!regUser) {
      next(
        new AppError({
         message:"An error occured",
         httpCode:HttpCode.BAD_REQUEST
        })
      )
    }

    return res.status(200).json({
      message:"User Created",
      data:regUser
    })

   }
)

 export const GetAll =async (req:Request,res:Response):Promise<Response>=> {
   try {
      const GettingAllUser = await UserModel.find()
      return res.status(200).json({
         message:"User data gotten successfully",
         data:GettingAllUser
      })
   } catch (error) {
      return res.status(404).json({
         message:"An error occurred while getting Data",
      data:error
      })
   }
}

