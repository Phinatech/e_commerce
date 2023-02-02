import UserModel from "../model/user.model";
import { IUser } from "../interface/User";
import { NextFunction,Request,Response } from "express"
import bcrypt from "bcrypt"
import { asyncHandler } from "../utils/AsyncHandler"
import { AppError, HttpCode } from "../utils/AppError"
import jwt from "jsonwebtoken"
import { generateToken } from "../middlewares/authorization/user.auth";

export const Register = asyncHandler(
   async (
    req:Request<{},{},IUser>,
    res:Response,
    next:NextFunction
   ):Promise<Response> => {
    const {name, email, password,confirmPassword} = req.body
    
   const salt:string = await bcrypt.genSalt(12)
   const hassedPassword = await bcrypt.hash(password, salt)
    const regUser = await UserModel.create({
      name,
      email,
      password: hassedPassword,
      confirmPassword: hassedPassword,
    });

    if (!regUser) 
      next(
        new AppError({
         message:"User not Created",
         httpCode:HttpCode.BAD_REQUEST
        })
      )
    
      return res.status(200).json({
         message:"Successfuly Created",
         data:regUser
      });
   }
);

 export const GetAll =async (req:Request,res:Response):Promise<Response>=> {
   try {
      const GettingAllUser = await UserModel.find()
      return res.status(200).json({
         message:`Gotten ${GettingAllUser.length}`,
         data:GettingAllUser
      })
   } catch (error) {
      return res.status(404).json({
         message:"An error occurred while getting Data",
      data:error
      })
   }
}

export const login = asyncHandler(
  async (
   req:Request,
   res:Response,
   next:NextFunction,
   ):Promise<Response> => {
   
   const {email,password} = req.body
   if (!email || !password) {
      next(
         new AppError({
            message:"please provide a valid email or password",
            httpCode:HttpCode.BAD_REQUEST
         })
      )
   }
   const User = await UserModel.findOne({email})
   const checkpassword = await bcrypt.compare(password,User!.password)
   if (!checkpassword) {
      next(
         new AppError({
            message:"invalid password", 
            httpCode:HttpCode.UNAUTHORIZED
         })
      )
   }
const token = generateToken({email:User!.email, _id:User!._id})
  return res.status(HttpCode.OK).json({
   message:`${User!.name} you  are welcome`,
   token:token
  })
  }
)