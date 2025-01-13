import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch(`${baseUrl}/api/v1/categories/all`);
      const categories = await res.json();

      setCategories(categories.data);
    }

    fetchCategories();
  }, []);

  return (
    <section className="mt-4 px-5">
      <h2 className="text-[25px] font-semibold">Search by Categories</h2>
      <section className="mt-3 flex gap-x-5">
        {categories?.map((category) => {
          return (
            <Link to={"/books/" + category?.name} key={category?._id}>
              <article className="bg-blue-900 text-white p-4 rounded-md">
                <p>
                  {category?.name.slice(0, 1).toUpperCase() +
                    category?.name.slice(1)}
                </p>
              </article>
            </Link>
          );
        })}
      </section>
    </section>
  );
}

export default Categories;
