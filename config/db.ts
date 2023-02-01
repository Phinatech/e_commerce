import mongoose from "mongoose";
import { enVariables } from "./environmentvariable";

 mongoose.set("strictQuery", false);
const DB = enVariables.DB_STRING
export async function dbConfig() {
    try {
       
       const DBconnect = await mongoose.connect(DB);
       console.log(`Database is connected to ${DBconnect.connection.host}`) 
    } catch (error) {
       console.log(`error ${error}`) 
    }
}

