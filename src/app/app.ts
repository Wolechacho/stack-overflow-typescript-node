import express from "express";
import routes from './routes/index-route';
import {api_version_config} from "./config/development.json"


const app = express();
app.use(express.json());

//register all routes
app.use(`/api/${api_version_config.appversion}`,routes)

app.use('/',(req,res,next) => {
    res.send({data :"Hello. Welcome to typescript"})
});

//Set Header Response 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
    res.setHeader('content-type', 'application/json');
    next();
});


process.on('unhandledRejection', (reason, p) => {
    console.log("unhandledRejection", reason);
    throw reason;
});

process.on('uncaughtException', (error) => {
    console.log("uncaughtException", error);
    throw error;
});




export default app;



