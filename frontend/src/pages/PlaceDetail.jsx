import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";


function PlaceDetail() {
    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    useEffect(() => {
        fetchPlace();
    }, []);
    const fetchPlace = async () => {
        try {
            const response = await api.get(
                `tourism/places/${id}/`
            );

            setPlace(response.data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <Layout>

            <div className="max-w-5xl mx-auto py-8">

                {/* Back */}

                <Link
                    to="/places"
                    className="
                    inline-flex
                    items-center
                    text-green-600
                    hover:text-green-700
                    font-medium
                    mb-6
                "
                >
                    ← Back to Places
                </Link>

                {/* Card */}

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                    {/* Image */}

                    <img
                        src={
                            place.primary_image
                                ? `http://127.0.0.1:8000${place.primary_image}`
                                : "/images/nepal1.webp"
                        }
                        alt={place.name}
                        className="w-full h-96 object-cover"
                    />

                    <div className="p-8">

                        {/* Title */}

                        <div className="flex justify-between items-start">

                            <div>

                                <h1 className="text-4xl font-bold">
                                    {place.name}
                                </h1>

                                <p className="text-gray-500 mt-2">
                                    {place.category_name}
                                </p>

                            </div>

                            <span
                                className={`
                                px-4
                                py-2
                                rounded-full
                                text-sm
                                font-semibold
                                ${place.status === "approved"
                                        ? "bg-green-100 text-green-700"
                                        : place.status === "pending"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-red-100 text-red-700"
                                    }
                            `}
                            >
                                {place.status}
                            </span>

                        </div>

                        {/* Description */}

                        <div className="mt-8">

                            <h2 className="text-xl font-bold mb-3">
                                Description
                            </h2>

                            <p className="text-gray-600 leading-8">
                                {place.description}
                            </p>

                        </div>

                        {/* Information */}

                        <div className="grid md:grid-cols-2 gap-8 mt-10">

                            <div className="space-y-4">

                                <h2 className="text-xl font-bold">
                                    Information
                                </h2>

                                <p><strong>📂 Category:</strong> {place.category_name}</p>

                                <p><strong>📍 District:</strong> {place.district_name}</p>

                                <p><strong>🏔 Province:</strong> {place.province_name}</p>

                            </div>

                            <div className="space-y-4">

                                <h2 className="text-xl font-bold">
                                    Coordinates
                                </h2>

                                <p><strong>🌍 Latitude:</strong> {place.latitude}</p>

                                <p><strong>🌍 Longitude:</strong> {place.longitude}</p>

                                <p>
                                    <strong>⭐ Featured:</strong>{" "}
                                    {place.is_featured ? "Yes" : "No"}
                                </p>

                                <p>
                                    <strong>✅ Active:</strong>{" "}
                                    {place.is_active ? "Yes" : "No"}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </Layout>
    );
}

export default PlaceDetail;