import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import PublicLayout from "../components/PublicLayout";
import api from "../api/axios";

import PlaceHero from "../components/place/PlaceHero";
import PlaceInfo from "../components/place/PlaceInfo";
import PlaceGallery from "../components/place/PlaceGallery";
import PlaceMap from "../components/place/PlaceMap";
import PlaceLocation from "../components/place/PlaceLocation";
import ReviewSection from "../components/reviews/ReviewSection";

function PublicPlaceDetail() {
    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        fetchPlace();
    }, []);
    const token = localStorage.getItem("access");

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
        <PublicLayout>

            <div className="max-w-5xl mx-auto py-8">

                <div className="flex gap-3 mb-6">

                    <Link
                        to="/explore"
                        className="
            inline-flex items-center
            text-green-600
            hover:text-green-700
            font-medium
        "
                    >
                        ← Back to Explore
                    </Link>

                    <Link
                        to={`/map?destination=${place.id}`}
                        className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-5
            py-2
            rounded-xl
            font-medium
            no-underline
        "
                    >
                        🧭 Get Directions
                    </Link>

                </div>


                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                    <PlaceHero place={place} />
                    <ReviewSection
                        place={place}
                        fetchPlace={fetchPlace}
                    />

                    <PlaceInfo place={place} />

                    <PlaceGallery place={place} />

                    <PlaceMap place={place} />

                    <PlaceLocation place={place} />

                </div>

            </div>

        </PublicLayout>
    );
}

export default PublicPlaceDetail;