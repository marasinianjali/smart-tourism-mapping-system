import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import PublicPlaceCard from "../components/PublicPlaceCard";



function CategoryDetail() {
    const { categoryName } = useParams();
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPlaces();
    }, [categoryName]);

    const fetchPlaces = async () => {
        try {
            const response = await api.get("tourism/places/");

            const approvedPlaces =
                response.data.results.filter(
                    (place) =>
                        place.status === "approved" &&
                        place.category_name.toUpperCase() ===
                        categoryName.toUpperCase()
                );
                

            setPlaces(approvedPlaces);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="max-w-7xl mx-auto p-6">

            <h1 className="text-4xl font-bold mb-6">
                {categoryName}
            </h1>

            <p className="text-gray-500 mb-8">
                {places.length} Tourist Places
            </p>

            {loading ? (
                <p>Loading...</p>
            ) : (
                places.map((place) => (
                    <PublicPlaceCard
                        key={place.id}
                        place={place}
                    />
                ))
            )}

        </div>
    );
}

export default CategoryDetail;