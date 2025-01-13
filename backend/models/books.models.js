import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    category: String,
    releasedYear: String,
    imageSrc: String,
    rating: String,
    country: String
}, { timestamps: true });

bookSchema.index({
    title: "text",
    author: "text",
    description: "text",
    category: "text"
});

const Book = mongoose.model("Book", bookSchema);

export default Book;