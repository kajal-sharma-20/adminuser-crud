import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import route from "./routes/userroute.js"; 
import cookieParser from "cookie-parser";
import { createAdminIfNotExists } from "./controller/admincontroller.js";


dotenv.config();
const app = express();
app.use(cookieParser());
app.use(cors({origin: "http://localhost:3000",credentials: true }));
app.use(express.json());


const PORT = 5000;
const URL = process.env.MONGOURL;

app.use("/api", route)

// Connect to MongoDB Atlas
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    createAdminIfNotExists();

  })
  .catch((err) => console.error("Database connection error:", err));
