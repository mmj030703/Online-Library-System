import "./config/config.js";
import express from "express";
import mongoose from "mongoose";
import booksRouter from "./routes/books.routes.js";
import categoriesRouter from "./routes/categories.routes.js";
import cors from "cors";

const corsOptions = ({
    origin: ["http://localhost:5173", "https://online-library-system-mmj030703.onrender.com"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ['Content-Type']
});

const server = new express();

mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DATABASE_NAME}`);
const db = mongoose.connection;

server.use(cors(corsOptions));
server.use(express.json({ limit: "16kb" }));
server.use(express.urlencoded({ extended: true, limit: "16kb" }));

db.on("open", () => {
    console.log("DB Connection Successfull!");
});

db.on("error", () => {
    console.log("DB Connection Failed!");
});

server.listen(5000, () => {
    console.log("Listening to the port 5000.");
});

// Routes
server.use("/api/v1/books", booksRouter);
server.use("/api/v1/categories", categoriesRouter);

////////////////////////////////////////////////////////
const url = `https://online-library-system-97mj.onrender.com/api/v1/books/reload`; // Replace with your Render URL
const interval = 30000; // Interval in milliseconds (30 seconds)

//Reloader Function
function reloadWebsite() {
    fetch(url)
        .then(response => {
            console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
        })
        .catch(error => {
            console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
        });
}

setInterval(reloadWebsite, interval);