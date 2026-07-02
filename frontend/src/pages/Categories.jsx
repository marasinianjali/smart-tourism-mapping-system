import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem("access");

            const config = token
                ? {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                : {};

            const response = await api.get(
                "tourism/categories/",
                config
            ); 
            setCategories(response.data.results);
        }catch (error) {
                console.error(error);
            }
        };

        return (
            <div className="max-w-7xl mx-auto p-6">

                <h1 className="text-4xl font-bold mb-8">
                    Explore Categories
                </h1>

                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">

                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            to={`/categories/${category.name}`}
                            className="border rounded-xl p-6 shadow hover:shadow-lg transition"
                        >
                            <h2 className="text-xl font-bold">
                                {category.name}
                            </h2>
                        </Link>
                    ))}

                </div>

            </div>
        );
    }

    export default Categories;