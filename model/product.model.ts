import { Document,Schema,model } from "mongoose";
import { category } from "../constrants/products.constrants";
import { IProduct } from "../interface/Product";


interface ProductSchema extends Document, IProduct {}
 
const productSchema: Schema<ProductSchema> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    catergory: {
      type: String,
      required: true,
      enum: [
        category.all,
        category.mensWear,
        category.womenWears,
        category.electronic,
        category.books,
        category.mobilePhone
      ],
      message: `Please enter category as supplied :  ${category.all}, ${category.mensWear},${category.womenWears},s${category.electronic},${category.books},${category.mobilePhone}`,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numberofReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: Schema.Types.ObjectId,
        },
        rating: {
          type: Schema.Types.ObjectId,
        },
        comments: {
          type: Schema.Types.ObjectId,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ProductModel = model<ProductSchema>("products" ,productSchema);

export default ProductModel;