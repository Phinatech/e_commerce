import dotenv from "dotenv";

dotenv.config();

export const enVariables = {
    PORT:process.env.PORT as string,
    DB_STRING:process.env.MONGO_STRING as string
}