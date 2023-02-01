import {Document, Schema} from "mongoose"

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  cart: {
    items: {
      products: Schema.Types.ObjectId;
    };
    quantity: number;
  }[];
}