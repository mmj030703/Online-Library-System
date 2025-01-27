import { addBook, getAllBooks, getBookByID, getBooksByCategory, getBooksBySearch } from "../controllers/books.controllers.js";
import express from "express";
import { dynamicUpload } from "../middlewares/multer.middleware.js";

const booksRouter = new express.Router();

booksRouter.post("/add", dynamicUpload.single('bookCover'), addBook);
booksRouter.get("/all", getAllBooks);
booksRouter.get("/category/:category", getBooksByCategory);
booksRouter.get("/search", getBooksBySearch);
booksRouter.get("/book/:id", getBookByID);

// Reloads server again
booksRouter.get("/reload", (req, res) => res.status(200).send("Reload Successfull !"));

export default booksRouter;