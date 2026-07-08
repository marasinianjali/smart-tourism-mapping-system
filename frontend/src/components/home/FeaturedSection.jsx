import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

function FeaturedSection() {
    const [featuredPlaces, setFeaturedPlaces] = useState([]);

    useEffect(() => {
        fetchFeaturedPlaces();
    }, []);
    const fetchFeaturedPlaces = async () => {
        try {
            const response = await api.get("tourism/places/");

            const featured = response.data.results.filter(
                (place) =>
                    place.status === "approved" &&
                    place.is_featured
            );

            setFeaturedPlaces(featured);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            {/* Featured */}

            <section className="max-w-7xl mx-auto px-6 py-20">

                <h2 className="text-4xl font-bold text-center mb-12">
                    Explore Nepal's Highlights

                </h2>

                <p className="mt-10 max-w-3xl text-lg md:text-xl text-center text-black-200 leading-8">
                    Handpicked destinations that showcase the beauty, history and culture of Nepal.
                </p>

                <div className="grid md:grid-cols-3 gap-8">

                    {featuredPlaces.map((place) => (

                        <div
                            key={place.id}
                            className="
                group
                bg-white
                rounded-2xl
                overflow-hidden
                shadow-md
                hover:shadow-2xl
                transition-all
                duration-300
            "
                        >

                            <img
                                src={`http://127.0.0.1:8000${place.primary_image}`}
                                alt={place.name}
                                className="
                    h-64
                    w-full
                    object-cover
                    group-hover:scale-105
                    transition-transform
                    duration-500
                "
                            />

                            <div className="p-6">

                                <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                    {place.category_name}
                                </span>

                                <h3 className="text-2xl font-bold mt-4">
                                    {place.name}
                                </h3>

                                <p className="text-gray-600 mt-3 line-clamp-3">
                                    {place.description}
                                </p>

                                <p className="mt-4 text-gray-500">
                                    📍 {place.district_name}
                                </p>

                                <Link
                                    to={`/places/${place.id}`}
                                    className="
                        inline-block
                        mt-6
                        text-green-600
                        font-semibold
                        hover:text-green-800
                    "
                                >
                                    Explore →
                                </Link>

                            </div>

                        </div>

                    ))}

                </div>

            </section ></div >);
}
export default FeaturedSection;