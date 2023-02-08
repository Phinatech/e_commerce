import {Request,Response,NextFunction} from "express"
import ProductModel from "../model/product.model"
import { IProduct } from "../interface/Product"
import { AppError, HttpCode, } from "../utils/AppError"
import { asyncHandler } from "../utils/AsyncHandler";


 export const Postproduct = asyncHandler(
   async (
     req: Request<{},{},IProduct>,
     res: Response,
     next: NextFunction
   ): Promise<Response> => {
     const { name, price, productImage, catergory } = req.body;

     const product = await ProductModel.create({
       name,
       price,
       productImage,
       catergory,
     });
     if (!product)
       next(
         new AppError({
           httpCode: HttpCode.BAD_REQUEST,
           message: "Products not created",
         })
       );
     return res.status(HttpCode.CREATED).json({
       data: product,
     });
   });

export const GettingProducts = asyncHandler(
  async (
    req: Request<{},{},IProduct>,
     res: Response, 
     next: NextFunction):Promise<Response> => {
        const Getproducts = await ProductModel.find()

        if(!Getproducts)
            next(new AppError({
                httpCode:HttpCode.BAD_REQUEST,
                message:"Products can not be gotten"
            }));
            return res.status(HttpCode.CREATED).json({
                data:``

            })
        });