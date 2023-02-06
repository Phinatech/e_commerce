import {Document, Schema} from "mongoose"

export interface ReviewT{
        user:Schema.Types.ObjectId;
        name:string;
        rating:number;
        comments:string
}

export interface IProduct extends Document{
    name:String;
    price:String;
    catergory:string;
    rating:number;
    productImage:string;
    numberofReviews:number;
    reviews:ReviewT[]
}