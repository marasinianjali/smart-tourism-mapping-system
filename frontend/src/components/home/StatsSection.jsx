import { useEffect, useState } from "react";
import api from "../../api/axios";

function StatsSection() {

    const [stats, setStats] = useState({
        places: 0,
        districts: 0,
        categories: 0,
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {

        try {

            const [
                placesResponse,
                districtsResponse,
                categoriesResponse,
            ] = await Promise.all([
                api.get("tourism/places/"),
                api.get("tourism/districts/"),
                api.get("tourism/categories/"),
            ]);

            const approvedPlaces =
                placesResponse.data.results.filter(
                    (place) => place.status === "approved"
                ).length;

            setStats({
                places: approvedPlaces,
                districts: districtsResponse.data.count,
                categories: categoriesResponse.data.count,
            });

        } catch (error) {
            console.error(error);
        }
    };

    return (

        <section className="bg-gradient-to-r from-green-50 to-blue-50 py-24">

            <div className="max-w-7xl mx-auto px-6">

                <h2 className="text-4xl font-bold text-center">
                    Nepal at a Glance
                </h2>

                <p className="text-gray-500 text-center mt-4 mb-14">
                    Discover Nepal through verified tourism information.
                </p>

                <div className="grid md:grid-cols-3 gap-8">

                    <div className="bg-white rounded-2xl shadow-md p-10 text-center hover:shadow-xl transition">

                        <div className="text-5xl mb-5">
                            📍
                        </div>

                        <h3 className="text-5xl font-extrabold text-blue-600">
                            {stats.places}+
                        </h3>

                        <p className="mt-4 text-lg text-gray-600">
                            Tourist Places
                        </p>

                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-10 text-center hover:shadow-xl transition">

                        <div className="text-5xl mb-5">
                            🏞️
                        </div>

                        <h3 className="text-5xl font-extrabold text-green-600">
                            {stats.districts}
                        </h3>

                        <p className="mt-4 text-lg text-gray-600">
                            Districts Covered
                        </p>

                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-10 text-center hover:shadow-xl transition">

                        <div className="text-5xl mb-5">
                            🗂️
                        </div>

                        <h3 className="text-5xl font-extrabold text-orange-500">
                            {stats.categories}
                        </h3>

                        <p className="mt-4 text-lg text-gray-600">
                            Categories
                        </p>

                    </div>

                </div>

            </div>

        </section>

    );
}

export default StatsSection;