import express, {Application} from "express";
import { appConfig } from "./app";
import{ dbConfig }from "./config/db";
import {enVariables} from "./config/environmentvariable"


const port = enVariables.PORT

const app:Application = express()
appConfig(app)
dbConfig()


app.listen(port,()=>{
    console.log(`listening to PORT: ${port}`)
})



//its create an enviroment that hel-ps you encrypt a file.. so what your git does it helps yiu read or encrypt this push and allows alow you to push without pushing this file

//Process can be use to target a root element..
//it helps in the event loop
//its a core variable of node
//they are needed for application to run.
//. env means its a environment variable.