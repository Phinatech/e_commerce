import { Request,Response,NextFunction } from "express"
import { IAuthUser } from "../../interface/User"
import { AppError, HttpCode } from "../../utils/AppError"

export const IsAdmin = (req:IAuthUser,res:Response,next:NextFunction)=> {
    const user = req!.user

   const adminUser = user && user.role === "Admin"
   if(!adminUser){
    next(new AppError({
        message:"Unauthorized admin user",
        httpCode:HttpCode.UNAUTHORIZED
    }));
   }
   next()
}