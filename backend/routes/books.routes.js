import { addBook, getAllBooks, getBookByID, getBooksByCategory, getBooksBySearch } from "../controllers/books.controllers.js";
import express from "express";
import { dynamicUpload } from "../middlewares/multer.middleware.js";

const booksRouter = new express.Router();

booksRouter.post("/add", dynamicUpload.single('bookCover'), addBook);
booksRouter.get("/all", getAllBooks);
booksRouter.get("/category/:category", getBooksByCategory);
booksRouter.get("/search", getBooksBySearch);
booksRouter.get("/book/:id", getBookByID);

export default booksRouter;