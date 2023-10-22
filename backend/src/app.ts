import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import documentRoutes from "./routes/document";
import alertRoutes from "./routes/alert";
import createHttpError, {isHttpError} from "http-errors";

const cors = require("cors");
const app = express();

app.use(cors({
    origin: ['alert-frontend-theta.vercel.app', 'https://alert-frontend-rivaldi0097.vercel.app'],
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Access-Control-Allow-Headers']
}))

app.use(morgan('dev'));

app.use(express.json());

app.use("/api/document", documentRoutes);
app.use("/api/alert", alertRoutes);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});
  
//make sure this is after the app, because it is useing next() for the error handling
//make sure the Request is from the express package
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknow error happed";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });

});


export default app;