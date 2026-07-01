import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import PublicPlaceCard from "../components/PublicPlaceCard";

function DistrictDetail() {
    const { districtName } = useParams();

    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [districtInfo, setDistrictInfo] = useState(null);

    useEffect(() => {
        fetchPlaces();
    }, [districtName]);
    useEffect(() => {
        fetchDistrictInfo();
    }, [districtName]);

    const fetchDistrictInfo = async () => {
        try {
            const response = await fetch(
                "/data/nepal-with-districts-acesmndr.geojson"
            );

            const data = await response.json();

            const info = data.features.find(
                (feature) =>
                    feature.properties.DISTRICT.toUpperCase() ===
                    districtName.toUpperCase()
            );

            setDistrictInfo(info?.properties);

        } catch (error) {
            console.error(error);
        }
    };
    const fetchPlaces = async () => {
        try {
            const response = await api.get("tourism/places/");

            const approvedPlaces = response.data.results.filter(
                (place) =>
                    place.status === "approved" &&
                    place.district_name.toUpperCase() === districtName.toUpperCase()
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

            <h1 className="text-4xl font-bold mb-2">
                {districtName}
            </h1>
            {districtInfo && (
                <p className="text-gray-600 mt-2">
                    Province: {districtInfo.PROVINCE}
                </p>
            )}

            <p className="text-gray-600 mb-8">
                {places.length} Tourist Places
            </p>

            {loading ? (
                <p>Loading...</p>
            ) : places.length === 0 ? (
                <p>No tourist places found.</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {places.map((place) => (
                        <PublicPlaceCard
                            key={place.id}
                            place={place}
                        />
                    ))}

                </div>
            )}

        </div>
    );
}

export default DistrictDetail;