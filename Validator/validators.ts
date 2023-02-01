import { NextFunction } from "express";
import { AppError, HttpCode } from "../utils/AppError";
import Joi from "joi";

export const validator  = async (
    SchemaName:Joi.ObjectSchema,
    body:Object,
    next:NextFunction
    ): Promise<void> =>{
        const value = await SchemaName.validate(body,
            {
        abortEarly:false,
        allowUnknown:true,
        stripUnknown:true,
        });

        try {
           value.error? 
           next(
            new AppError({
                httpCode:HttpCode.BAD_REQUEST,
                message:value.error.details[0].message,
            })
           ) 
           : next()
        } catch (error) {
            console.log(error)
        }
    }