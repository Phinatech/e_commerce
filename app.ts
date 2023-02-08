import express, { Application, NextFunction,Request,Response } from "express"
import morgan from "morgan"
import cors from "cors"
import userRouter from "./Router/user.router"
import productRouter from "./Router/product.router"
import { AppError, HttpCode } from "./utils/AppError"
import { errorHandler } from "./middlewares/errorHandler"


export const appConfig = (app:Application)=>{
app
.use(morgan("dev"))
.use(express.json())
.use(cors())

.use("/api", userRouter)
.use("/api/product",productRouter)

app.all("*", (req:Request,res:Response,next:NextFunction)=>{
    next(new AppError({
        message:`This route${req.originalUrl} does not exist`,
        httpCode : HttpCode.BAD_REQUEST
       
    }))
})

.use(errorHandler)
}