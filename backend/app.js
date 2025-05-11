import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from './routes/userRouter.js';
import applicationRouter from './routes/applicationRouter.js';
import jobRouter from './routes/jobRouter.js';
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js"

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    method: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
}));
app.use(cookieParser()); //in Express.js sets up middleware to handle cookies for incoming HTTP requests
app.use(express.json()); // only parse json data, ignore other than json data
app.use(express.urlencoded({ extended: true })); // when we provides string it convert string to json format

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    }
    ));// to upload file  in Express.js sets up middleware to handle file uploads.

app.use("/api/v1/user", userRouter);
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/job", jobRouter);

dbConnection();

app.use(errorMiddleware) // always use error handler at the bottom

export default app;