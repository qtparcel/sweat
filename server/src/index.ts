import Express from "express";
import cors from 'cors';
import authRouter from "../routes/authentication";
import "dotenv/config";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser'

const app = Express();

app.use(cors());

app.use(bodyParser.json());
app.use(cookieParser());

const port = 3000;

app.listen(port, () => {
  console.log("Server is running on port: 3000");
});

app.use("/auth", authRouter);

mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => {
    console.log("Connected to mongodb successfully");
  })
  .catch((err) => {
    console.log(err);
  });
