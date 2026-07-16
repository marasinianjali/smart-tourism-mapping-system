import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProvinceFilter from "../components/ProvinceFilter";
import SortFilter from "../components/SortFilter";
import PublicPlaceCard from "../components/PublicPlaceCard";


function Explore() {
    const [searchParams] = useSearchParams();
    const initialSearch =
        searchParams.get("search") || "";
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedSort, setSelectedSort] = useState("newest");

    useEffect(() => {
        fetchPlaces();
    }, []);
    useEffect(() => {
        setSearchTerm(initialSearch);
    }, [initialSearch]);
    useEffect(() => {
        console.log("PLACES STATE:", places);
    }, [places]);
    const fetchPlaces = async () => {
        try {
            const response = await api.get(
                "tourism/places/",
            );
            console.log("RESPONSE:", response.data);
            setPlaces(response.data.results);

        } catch (error) {
            console.error("API ERROR:", error);
        } finally {
            setLoading(false);
        }
    };
    const filteredPlaces = places.filter((place) => {
        const search = searchTerm.toLowerCase();

        const matchesSearch =
            place.name.toLowerCase().includes(search) ||
            place.description.toLowerCase().includes(search) ||
            place.category_name.toLowerCase().includes(search) ||
            place.district_name.toLowerCase().includes(search) ||
            place.province_name.toLowerCase().includes(search);

        const matchesCategory =
            selectedCategory === "" ||
            place.category_name === selectedCategory;

        const matchesProvince =
            selectedProvince === "" ||
            place.province_name === selectedProvince;

        return (
            matchesSearch &&
            matchesCategory &&
            matchesProvince
        );
    });
    const sortedPlaces = [...filteredPlaces];
    if (selectedSort === "az") {
        sortedPlaces.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    if (selectedSort === "za") {
        sortedPlaces.sort((a, b) =>
            b.name.localeCompare(a.name)
        );
    }

    if (selectedSort === "newest") {
        sortedPlaces.sort(
            (a, b) =>
                new Date(b.created_at) -
                new Date(a.created_at)
        );
    }

    if (selectedSort === "oldest") {
        sortedPlaces.sort(
            (a, b) =>
                new Date(a.created_at) -
                new Date(b.created_at)
        );
    }
    const clearFilters = () => {
        setSearchTerm("");
        setSelectedCategory("");
        setSelectedProvince("");
        setSelectedSort("newest");
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Explore Nepal || Discover Tourist Destinations
                </h1>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8">

                <div className="flex-1">
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </div>

                <CategoryFilter
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />

                <ProvinceFilter
                    selectedProvince={selectedProvince}
                    setSelectedProvince={setSelectedProvince}
                />

                <SortFilter
                    selectedSort={selectedSort}
                    setSelectedSort={setSelectedSort}
                />

            </div>
            <div className="flex justify-between items-center mb-6">

                <p className="text-gray-500">
                    Showing <span className="font-semibold">{sortedPlaces.length}</span> places
                </p>

                <button
                    onClick={clearFilters}
                    className="
            px-5
            py-2
            rounded-xl
            border
            border-gray-300
            hover:bg-gray-100
            transition
        "
                >
                    Clear Filters
                </button>

            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                sortedPlaces.length > 0 ? (

                    sortedPlaces.map((place) => (

                        <PublicPlaceCard
                            key={place.id}
                            place={place}
                        />

                    ))

                ) : (

                    <div className="text-center py-20">

                        <div className="text-6xl mb-6">
                            🔍
                        </div>

                        <h2 className="text-3xl font-bold">
                            No places found
                        </h2>

                        <p className="mt-4 text-gray-500">
                            Try changing your search or filters.
                        </p>

                        <button
                            onClick={clearFilters}
                            className=" mt-8 bg-green-600 hover:bg-green-700 text-white 
                                        px-6 py-3 rounded-xl transition "
                        >
                            Clear Filters
                        </button>

                    </div>

                )
            )}
        </div>
    );
}
export default Explore;