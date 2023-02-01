import {} from "mongoose"

export interface IProduct extends Document{
    name:String;
    price:String;
    catergory:string;
    rating:number;
    productImage:string;
}