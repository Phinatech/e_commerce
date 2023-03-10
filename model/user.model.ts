import {Document,model,Schema} from "mongoose"
import { IUser } from "../interface/User";
import isEmail from "validator/lib/isEmail"
import { authRole } from "../constrants/user.constrants";

interface UserSchema extends Document, IUser{}

const userSchema: Schema<UserSchema> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "please enter your email"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide your passwod"],
      minlength: 6,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please provide your passwod"],
      minlength: 6,
    },
    role: {
      type: String,
      required: true,
      enum: [authRole.admin, authRole.manager, authRole.user],
      message: `Please identify yor role as provideed :admin ,user,manager ${authRole.admin}, ${authRole.manager},${authRole.user}`,
      default: "user",
    },
    // cart:[
    //  {
    //   items:{
    //       products:Schema.Types.ObjectId,
    //       ref:"products"
    //   }
    //  }

    // ]
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserModel = model<UserSchema>("User",userSchema )
export default UserModel
