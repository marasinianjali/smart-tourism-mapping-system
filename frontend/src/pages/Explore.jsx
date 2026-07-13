import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProvinceFilter from "../components/ProvinceFilter";
import PublicPlaceCard from "../components/PublicPlaceCard";


function Explore() {
    const [searchParams] = useSearchParams();
    const initialSearch =
        searchParams.get("search") || "";
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] =
        useState(initialSearch);
    console.log("SEARCH TERM:", searchTerm);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");

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
        const matchesSearch =
            place.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

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


    console.log("FIRST PLACE:", places[0]);
    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Explore Nepal || Discover Tourist Destinations
                </h1>
            </div>

            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <CategoryFilter
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            <ProvinceFilter
                selectedProvince={selectedProvince}
                setSelectedProvince={setSelectedProvince}
            />
            {loading ? (
                <p>Loading...</p>
            ) : (
                filteredPlaces.length > 0 ? (

    filteredPlaces.map((place) => (

        <PublicPlaceCard
            key={place.id}
            place={place}
        />

    ))

) : (

    <div className="text-center py-20">

        <h2 className="text-3xl font-bold">
            No places found 😔
        </h2>

        <p className="mt-3 text-gray-500">
            Try another destination, category, or province.
        </p>

    </div>

)
            )}
        </div>
    );
}
export default Explore;