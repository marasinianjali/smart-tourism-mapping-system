import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import PublicLayout from "../components/PublicLayout";

function TripPlanner() {
    const [provinces, setProvinces] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [days, setDays] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [itinerary, setItinerary] = useState(null);

    useEffect(() => {
        fetchCategories();
        fetchProvinces();
    }, [])

    const fetchCategories = async () => {
        const response = await api.get(
            "tourism/categories/"
        );
        console.log(response.data);
        setCategories(response.data.results);
    };
    const fetchProvinces = async () => {
        const response = await api.get(
            "tourism/districts/"
        );
        const uniqueProvinces = [
            ...new Map(
                response.data.results.map((district) => [
                    district.province,
                    {
                        value: district.province,
                        label: district.province_display,
                    },
                ])
            ).values(),
        ];
        setProvinces(uniqueProvinces);
    }
    const toggleCategory = (id) => {

        if (selectedCategories.includes(id)) {

            setSelectedCategories(
                selectedCategories.filter(
                    (categoryId) => categoryId !== id
                )
            );

        } else {

            setSelectedCategories([
                ...selectedCategories,
                id,
            ]);

        }

    };
    const generateTrip = async () => {

        if (!selectedProvince) {
            alert("Please select a province.");
            return;
        }

        try {

            const response = await api.post(
                "tourism/trip-planner/",
                {
                    province: selectedProvince,
                    days: days,
                    categories: selectedCategories,
                }
            ); console.log(response.data);

            setItinerary(response.data);

        } catch (error) {

            console.error(error);

        }

    };
    console.log(categories);

    return (
        <PublicLayout>

            <div className="max-w-5xl mx-auto py-10">
                {/* <h1>Trip Planner V2

                - Better itinerary starting point
                - Distance-aware clustering
                - Travel time optimization
                - Smart recommendations</h1> */}

                <h1 className="text-3xl font-bold">
                    Plan Your Trip
                </h1>

                <p className="text-gray-600 mt-2">
                    Generate a personalized travel itinerary based on your interests.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="mt-8">

                        <label className="block font-semibold mb-2">
                            Province
                        </label>

                        <select
                            value={selectedProvince}
                            onChange={(e) => setSelectedProvince(e.target.value)}
                            className="
                                    w-full
                                    border
                                    rounded-xl
                                    px-4
                                    py-3
                                "
                        >

                            <option value="">
                                Select Province
                            </option>

                            {provinces.map((province) => (

                                <option
                                    key={province.value}
                                    value={province.value}
                                >
                                    {province.label}
                                </option>

                            ))}

                        </select>

                    </div>
                    <div className="mt-6">

                        <label className="block font-semibold mb-2">
                            Number of Days
                        </label>

                        <select
                            value={days}
                            onChange={(e) => setDays(Number(e.target.value))}
                            className="
                    w-full
                    border
                    rounded-xl
                    px-4
                    py-3
                "
                        >

                            {[1, 2, 3, 4, 5, 6, 7].map((day) => (

                                <option
                                    key={day}
                                    value={day}
                                >
                                    {day} {day === 1 ? "Day" : "Days"}
                                </option>

                            ))}

                        </select>

                    </div>
                    <div className="mt-8">

                        <label className="block font-semibold mb-4">
                            Categories
                        </label>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                            {categories.map((category) => (

                                <label
                                    key={category.id}
                                    className="
                    flex
                    items-center
                    gap-3
                    border
                    rounded-xl
                    p-3
                    cursor-pointer
                    hover:bg-gray-50
                "
                                >

                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(category.id)}
                                        onChange={() => toggleCategory(category.id)}
                                    />

                                    <span>
                                        {category.name}
                                    </span>

                                </label>

                            ))}

                        </div>
                        <div className="mt-8">

                            <button
                                onClick={generateTrip}
                                className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
        "
                            >
                                Generate Trip
                            </button>
                            {itinerary && (

                                <div className="mt-10">

                                    <h2 className="text-2xl font-bold mb-6">
                                        Your Trip Plan
                                    </h2>

                                    {itinerary.days.map((dayPlan) => (

                                        <div
                                            key={dayPlan.day}
                                            className="mb-8 border rounded-xl p-5"
                                        >

                                            <h3 className="text-xl font-semibold mb-4">
                                                Day {dayPlan.day}
                                            </h3>

                                            {dayPlan.places.map((place) => (

                                                <div
                                                    key={place.id}
                                                    className="
                                                        bg-white
                                                        rounded-xl
                                                        shadow-sm
                                                        border
                                                        p-4
                                                        mb-4
                                                        hover:shadow-md
                                                        transition
                                                    "
                                                >

                                                    <img
                                                        src={
                                                            place.primary_image
                                                                ? `http://127.0.0.1:8000${place.primary_image}`
                                                                : "/images/nepal1.webp"
                                                        }
                                                        alt={place.name}
                                                        className="w-full h-44 object-cover rounded-lg"
                                                    />

                                                    <h4 className="text-lg font-bold mt-4">
                                                        {place.name}
                                                    </h4>

                                                    <span
                                                        className="
                                                        inline-block
                                                        mt-2
                                                        bg-green-100
                                                        text-green-700
                                                        px-3
                                                        py-1
                                                        rounded-full
                                                        text-sm
                                                    "
                                                    >
                                                        {place.category_name}
                                                    </span>

                                                    <p className="mt-3 text-gray-600">
                                                        📍 {place.district_name}
                                                    </p>

                                                    <p className="text-yellow-600 mt-1">
                                                        ⭐ {place.average_rating ?? "N/A"}
                                                    </p>
                                                    <div className="flex gap-3 mt-5">

                                                        <Link
                                                            to={`/places/${place.id}`}
                                                            className="
            flex-1
            bg-green-600
            hover:bg-green-700
            text-white
            text-center
            py-2
            rounded-lg
            no-underline
        "
                                                        >
                                                            View Details
                                                        </Link>

                                                        <Link
                                                            to={`/map?destination=${place.id}`}
                                                            className="
            flex-1
            bg-blue-600
            hover:bg-blue-700
            text-white
            text-center
            py-2
            rounded-lg
            no-underline
        "
                                                        >
                                                            Navigate
                                                        </Link>

                                                    </div>

                                                </div>

                                            ))}

                                        </div>



                                    ))}

                                </div>

                            )}

                        </div>

                    </div>
                </div>

            </div>

        </PublicLayout>
    );
}

export default TripPlanner;