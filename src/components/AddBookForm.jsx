import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../utils/store/slices/bookSlice";
import { useNavigate } from "react-router-dom";
import Toaster from "./Toaster";

function AddBookForm() {
    const [bookTitle, setBookTitle] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");
    const [bookDescription, setBookDescription] = useState("");
    const [bookCategory, setBookCategory] = useState("");
    const [bookReleasedYear, setBookReleasedYear] = useState("");
    const [bookRating, setBookRating] = useState("");
    const [bookCountry, setBookCountry] = useState("");
    const imageFileRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showToaster, setShowToaster] = useState(false);
    const [toasterMessage, setToasterMessage] = useState("");
    const [toasterTextColorClass, setToasterTextColorClass] = useState("");

    function addBookToList(e) {
        e.preventDefault();
        const imageInput = imageFileRef.current;
        const imageUrl = imageInput.files.length ? URL.createObjectURL(imageInput.files[0]) : "";
        console.log(imageInput, imageUrl);


        if (bookTitle === "" || bookAuthor === "" || bookDescription === "" || bookCategory === "" || bookReleasedYear === "" || imageUrl === "" || bookRating === "" || bookCountry === "") {
            setShowToaster(true);
            setToasterMessage("Field is Empty!");
            setToasterTextColorClass("text-black");
            setTimeout(() => {
                setShowToaster(false);
                setToasterMessage("");
                setToasterTextColorClass("");
            }, 3000);
            return;
        }

        const bookObj = {
            id: (Math.random() * 10 ** 6).toFixed(0) + (Math.random() * 10 ** 6).toFixed(0),
            title: bookTitle,
            author: bookAuthor,
            description: bookDescription,
            category: bookCategory,
            releasedYear: bookReleasedYear,
            imageSrc: imageUrl,
            rating: bookRating,
            country: bookCountry
        }

        dispatch(addBook(bookObj));
        navigate("/books/all");
    }

    return (
        <section>
            <section className="flex flex-col place-self-center items-center mt-5 shadow-lg bg-slate-200 w-fit px-4 py-3 rounded-md">
                <h1 className="text-3xl font-bold">Add Book</h1>
                <form method="get" action="" onSubmit={addBookToList} className="flex flex-col gap-y-5 mt-7">
                    <article className="flex flex-col gap-y-1">
                        <label className="font-semibold">Enter Book Title</label>
                        <input value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} type="text" className="outline-none border-2 border-sky-900 rounded-md ps-1 py-1 pe-2" />
                    </article>
                    <article className="flex flex-col gap-y-1">
                        <label className="font-semibold">Enter Author Name</label>
                        <input value={bookAuthor} onChange={(e) => setBookAuthor(e.target.value)} type="text" className="outline-none border-2 border-sky-900 rounded-md ps-1 py-1 pe-2" />
                    </article>
                    <article className="flex flex-col gap-y-1">
                        <label className="font-semibold">Enter Description</label>
                        <textarea value={bookDescription} onChange={(e) => setBookDescription(e.target.value)} className="resize-none outline-none border-2 border-sky-900 rounded-md ps-1 pe-2" cols="60" rows="3"></textarea>
                    </article>
                    <article className="flex flex-col gap-y-1">
                        <label className="font-semibold">Select Category</label>
                        <select className="p-2" value={bookCategory} onChange={(e) => setBookCategory(e.target.value)}>
                            <option>Fiction</option>
                            <option>Historical Fiction</option>
                            <option>Mythology</option>
                            <option>Romance</option>
                            <option>Dystopian</option>
                            <option>Classic</option>
                            <option>Magical Realism</option>
                            <option>Philosophy</option>
                            <option>Self-Help</option>
                        </select>
                    </article>
                    <article className="flex flex-col gap-y-1">
                        <label className="font-semibold">Enter Released Year</label>
                        <input value={bookReleasedYear} onChange={(e) => setBookReleasedYear(e.target.value)} type="number" className="outline-none border-2 border-sky-900 rounded-md ps-1 py-1 pe-2" />
                    </article>
                    <article className="flex flex-col gap-y-1">
                        <label className="font-semibold">Select Book Cover Image</label>
                        <input ref={imageFileRef} type="file" className="outline-none border-2 border-sky-900 rounded-md ps-1 py-1 pe-2" />
                    </article>
                    <article className="flex flex-col gap-y-1">
                        <label className="font-semibold">Enter Ratings</label>
                        <input value={bookRating} onChange={(e) => setBookRating(e.target.value)} type="number" className="outline-none border-2 border-sky-900 rounded-md ps-1 py-1 pe-2" />
                    </article>
                    <article className="flex flex-col gap-y-1">
                        <label className="font-semibold">Enter Origin Country</label>
                        <input value={bookCountry} onChange={(e) => setBookCountry(e.target.value)} type="text" className="outline-none border-2 border-sky-900 rounded-md ps-1 py-1 pe-2" />
                    </article>
                    <button
                        type="submit"
                        className="mt-4 text-[15px] bg-blue-900 text-white w-fit self-center py-2 px-10 rounded-md"
                    >
                        Add Book
                    </button>
                </form>
            </section>
            {showToaster && <Toaster message={toasterMessage} textColorClass={toasterTextColorClass} />}
        </section>
    )
}

export default AddBookForm;