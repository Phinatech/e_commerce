import { Document,Schema,model } from "mongoose";
import { IProduct } from "../interface/Product";

interface ProductSchema extends Document, IProduct {}
 
const productSchema: Schema<ProductSchema> = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required:true,
  },
  productImage:{
    type:String,
    required:true,
  },
  catergory:{
    type:String,
    required:true,
  },
  rating:{
    type:Number,
    required:true
  }
},{
    timestamps:true,
    versionKey:false
});

const ProductModel = model<ProductSchema>("products" ,productSchema);