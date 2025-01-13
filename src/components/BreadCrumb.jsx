/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function BreadCrumb({ book, category }) {
    return (
        <section className="mt-10 mb-5 flex justify-center">
            <section className="-ml-52 flex gap-x-2 bg-sky-200 h-fit rounded-full px-3 py-[2px]">
                <Link to={'/books/' + category}>
                    <p className="font-semibold">{category.slice(0, 1).toUpperCase() + category.slice(1)}</p>
                </Link>
                <p>&gt;</p>
                <p>{book?.title || 'Book'}</p>
            </section>
        </section>
    )
}

export default BreadCrumb;