import express from "express";
import router from "./route.js";
import mongoose from "mongoose";
import cors from "cors"

const app = express();
const mongoDBURL = "mongodb+srv://ppaproject:Teamwork12@sample-sxout.mongodb.net/BookStoreDB?retryWrites=true&w=majority"; // setting mongodb database url
const PORT = 8000;
//middleware for parsing request body

app.use(express.json());
app.use(cors());
app.use("/books", router)

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("App is connected to database");
        app.listen(PORT, () => {
            console.log(`App is listening on port :${PORT}`);
        })
    })
    .catch((error) => {
        console.log("error", error);
    })