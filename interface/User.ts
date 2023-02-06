import {Document, Schema} from "mongoose"


//user interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  // userId?: Schema.Types.ObjectId;
  // cart?: {
  //   items: {
  //     products: Schema.Types.ObjectId;
  //     quantity: number;
  //   };
  // }[];
  role:string;
}

export interface IAuthUser extends Request{
  user:IUser
}