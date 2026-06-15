import Layout from "../components/Layout";
import StatsCard from "../components/StatsCard";
import { useState, useEffect } from "react";
import api from "../api/axios";

function Dashboard() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        fetchPlaces();
    }, []);

    const fetchPlaces = async () => {
        try {
            const response = await api.get(
                "tourism/places/",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                }
            );

            setPlaces(response.data.results);

        } catch (error) {
            console.error(error);
        }
    };
    const totalPlaces = places.length;


    const uniqueDistricts = new Set(
        places.map((place) => place.district_name)
    );

    const districtCount = uniqueDistricts.size;

    const uniqueCategories = new Set(
        places.map((place) => place.category_name)
    );

    const categoryCount = uniqueCategories.size;
    const featuredPlaces = places.filter(
        (place) => place.is_featured
    ).length;

    const categoryStats = {};
    const districtStats = {};
    const recentPlaces = [...places]
        .sort(
            (a, b) =>
                new Date(b.created_at) -
                new Date(a.created_at)
        )
        .slice(0, 5);
    places.forEach((place) => {
        const category = place.category_name;

        if (categoryStats[category]) {
            categoryStats[category]++;
        } else {
            categoryStats[category] = 1;
        }
    });
    places.forEach((place) => {
        const district = place.district_name;

        if (districtStats[district]) {
            districtStats[district]++;
        } else {
            districtStats[district] = 1;
        }
    });


    return (
        <Layout>
            <h1 className="text-4xl font-bold">
                Tourism Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
                Overview of tourism statistics and activity.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatsCard
                    title="Total Places"
                    value={totalPlaces}
                />

                <StatsCard
                    title="Districts Covered"
                    value={districtCount}
                />

                <StatsCard
                    title="Categories"
                    value={categoryCount}
                />
                <StatsCard
                    title="Featured Places"
                    value={featuredPlaces}
                />
            </div>
            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">
                    Places by Category
                </h2>

                <div className="bg-white rounded-lg shadow-md p-4 w-full">
                    {Object.entries(categoryStats).map(
                        ([category, count]) => (
                            <div
                                key={category}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "5px",
                                    padding: "12px 0",
                                    margin: "0 10px",

                                }}
                            >
                                <span>{category}</span>
                                <span>{count}</span>
                            </div>
                        )
                    )}
                </div>
            </div>
            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">
                    Places by District
                </h2>

                <div className="bg-white rounded-lg shadow-md p-4">
                    {Object.entries(districtStats).map(
                        ([district, count]) => (
                            <div
                                key={district}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "5px",
                                    padding: "12px 0",
                                    margin: "0 10px",

                                }}
                            >
                                <span>{district}</span>
                                <span>{count}</span>
                            </div>
                        )
                    )}
                </div>
            </div>
            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">
                    Recent Places
                </h2>

                <div className="bg-white rounded-lg shadow-md p-4">
                    {recentPlaces.map((place) => (
                        <div
                            key={place.id}
                            className="border-b py-3"
                        >
                            <p className="font-semibold">
                                {place.name}
                            </p>

                            <p className="text-sm text-gray-500">
                                {new Date(place.created_at).toLocaleDateString(
                                    "en-US",
                                    {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }
                                )}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;