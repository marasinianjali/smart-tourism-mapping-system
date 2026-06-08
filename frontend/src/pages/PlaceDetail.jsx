import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
                `tourism/places/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                }
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
        <div className="max-w-4xl mx-auto p-6">

            <div className="bg-white shadow-md rounded-lg p-6">

                <h1 className="text-4xl font-bold mb-4">
                    {place.name}
                </h1>

                <p className="text-gray-600 mb-6">
                    {place.description}
                </p>

                <div className="space-y-2">
                    <p>
                        <strong>Category:</strong> {place.category_name}
                    </p>

                    <p>
                        <strong>District:</strong> {place.district_name}
                    </p>

                    <p>
                        <strong>Province:</strong> {place.province_name}
                    </p>

                    <p>
                        <strong>Latitude:</strong> {place.latitude}
                    </p>

                    <p>
                        <strong>Longitude:</strong> {place.longitude}
                    </p>
                </div>

            </div>

        </div>
    );
}

export default PlaceDetail;