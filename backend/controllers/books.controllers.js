import mongoose from "mongoose";
import Book from "../models/books.models.js";
import { uploadImage } from "../utils/imagekit.js";

export async function addBook(req, res) {
    try {
        const { title, author, description, category, releasedYear, rating, country } = req.body;

        if ([title, author, description, category, releasedYear, rating, country].some(item => item.trim() === "")) {
            return res.status(400).json({ errorCode: "FIELDS_MISSING", message: "Fields are missing !" });
        }

        const image = req.file;

        if (!image) {
            return res.status(400).json({ errorCode: "IMAGE_MISSING", message: "Book Cover Image is missing !" });
        }

        let imageSrc;

        try {
            // Upload to ImageKit
            imageSrc = await uploadImage(image.path);
        } catch (error) {
            return res.status(400).json({ error: error.message || error, errorCode: "IMAGEKIT_UPLOAD_ERROR", message: "An error occurred while uploading image to imagekit !" });
        }

        const book = await Book.create({
            title,
            author,
            description,
            category,
            releasedYear,
            imageSrc,
            rating,
            country
        });

        if (!book) {
            return res.status(400).json({ errorCode: "ADD_BOOK_ERROR", message: "An error occurred while adding book !" });
        }

        res.send({ status: "success", data: book });
    } catch (error) {
        return res.status(500).json({ error: error.message || error, errorCode: "ADD_BOOK_ERROR", message: "An error occurred while adding book !" });
    }
}

export async function getAllBooks(req, res) {
    try {
        const books = await Book.find();

        res.status(200).send({ status: "success", data: books });
    } catch (error) {
        res.status(500).json({ error: error.message || error, errorCode: "GET_BOOKS_ERROR", message: "Something went wrong!" });
    }
}

export async function getBookByID(req, res) {
    try {
        const { id: bookId } = req.params;

        if (!mongoose.isValidObjectId(bookId)) {
            return res.status(400).json({ errorCode: "MONGODB_ID_ERROR", message: "Provided book id is an invalid mongodb id !" });
        }

        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ errorCode: "BOOK_NOT_FOUND", message: "Book not found !" });
        }

        return res.status(200).json({ status: "success", data: book });
    } catch (error) {
        return res.status(500).json({ error: error.message || error, errorCode: "GET_BOOK_BY_ID_ERROR", message: "Something went error !" });
    }
}

export async function getBooksByCategory(req, res) {
    try {
        const { category } = req.params;

        if (category.trim() === "") {
            return res.status(400).json({ errorCode: "CATEGORY_MISSING", message: "Category is missing !" });
        }

        console.log(category)

        const books = await Book.find({
            category
        });

        console.log(books);


        res.status(200).send({ status: "success", data: books });
    } catch (error) {
        return res.status(500).json({ error: error.message || error, errorCode: "GET_BOOKS_BY_CATEGORY", message: "Internal Server Error !" });
    }
}

export async function getBooksBySearch(req, res) {
    try {
        const { q } = req.query;

        if (q.trim() === "") {
            return res.status(400).json({ errorCode: "SEARCH_EMPTY", message: "Search is empty !" });
        }

        const books = await Book.aggregate([
            {
                $search: {
                    index: "books-search",
                    text: {
                        query: q,
                        path: ["title", "author"]
                    }
                }
            },
        ])

        res.status(200).send({ status: "success", data: books });
    } catch (error) {
        return res.status(500).json({ error: error.message || error, errorCode: "GET_BOOKS_BY_CATEGORY", message: "Internal Server Error !" });
    }
}