import {Request,Response, NextFunction } from "express";
import jwt,{JwtPayload, Secret, VerifyErrors} from "jsonwebtoken"
import { IUser } from "../../interface/User";
import UserModel from "../../model/user.model";
import { AppError, HttpCode } from "../../utils/AppError";

  interface payload extends JwtPayload{
   _id:string
    email:string
  };

   const secret = "sdfghluyetyuioiuydfgh";
    export const generateToken = (user:payload)=>{
    return jwt.sign(user, secret as Secret, {expiresIn:"1h"})
}

//verify and authorize athe user

export const userAuth = (req:Request,res:Response,next:NextFunction)=>{
    //make request for our token from the header
    const headers = req.headers.authorization;
    if(!headers || !headers.startsWith("Bearer ")){
        next(
            new AppError({
                httpCode:HttpCode.UNAUTHORIZED,
                message:"You are not authorized"
            })
        );
    }

    const token:string = headers!.split(" ")[1];

    //verify the token payload
    jwt.verify(
        token,secret as Secret,async (err:VerifyErrors | null, decodedUser:any)=>{
            if (err){
                const errorMsg = 
                err.name === "JsonWebTokenError"
                ? "Invalid token , you are unauthorized"
                : err.message;
                next(
                    new AppError({
                        httpCode:HttpCode.UNAUTHORIZED,
                        message: errorMsg
                    })
                );
            }
            try {
                const verifiedUser = await UserModel.findOne({_id: decodedUser!._id});
                if (!verifiedUser){
                    next(
                        new AppError({
                            httpCode:HttpCode.UNAUTHORIZED,
                            message:"Unauthorizaed User",
                        })
                    );
                }

                req!.user = verifiedUser as IUser;
                next();
            } catch (error:any) {
                next(
                    new AppError({
                        httpCode:HttpCode.INTERNAL_SERVER_ERROR,
                        message:error
                    })
                )
            }
        }
    )
}
