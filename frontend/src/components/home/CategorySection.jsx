import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

function CategorySection() {
    const [categories, setCategories] = useState([]);
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [categoryResponse, placeResponse] = await Promise.all([
                api.get("tourism/categories/"),
                api.get("tourism/places/"),
            ]);

            setCategories(categoryResponse.data.results);
            setPlaces(placeResponse.data.results);

        } catch (error) {
            console.error(error);
        }
    };

    const getPlaceCount = (categoryName) => {
        return places.filter(
            (place) =>
                place.status === "approved" &&
                place.category_name === categoryName
        ).length;
    };

    const getCategoryIcon = (categoryName) => {
        switch (categoryName.toLowerCase()) {
            case "natural":
                return "🏔️";

            case "religious":
                return "🛕";

            case "historical":
                return "🏰";

            default:
                return "📍";
        }
    };

    return (
        <section className="bg-gray-50 py-24">

            <div className="max-w-7xl mx-auto px-6">

                <h2 className="text-4xl font-bold text-center">
                    Explore by Category
                </h2>

                <p className="text-gray-500 text-center mt-4 mb-14">
                    Find destinations based on your interests.
                </p>

                <div className="grid md:grid-cols-3 gap-8">

                    {categories.map((category) => (

                        <Link
                            key={category.id}
                            to={`/categories/${category.name}`}
                            className="
                                group
                                bg-white
                                rounded-2xl
                                shadow-md
                                hover:shadow-xl
                                hover:-translate-y-2
                                transition-all
                                duration-300
                                p-10
                                text-center
                            "
                        >

                            <div className="text-6xl mb-6">
                                {getCategoryIcon(category.name)}
                            </div>

                            <h3 className="text-2xl font-bold">
                                {category.name}
                            </h3>

                            <p className="text-gray-500 mt-3">
                                {getPlaceCount(category.name)} Places
                            </p>

                            <p className="mt-6 font-semibold text-green-600 group-hover:text-green-700">
                                Explore →
                            </p>

                        </Link>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default CategorySection;