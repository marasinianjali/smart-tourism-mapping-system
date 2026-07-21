import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import PublicLayout from "../components/PublicLayout";
import api from "../api/axios";

import PlaceHero from "../components/place/PlaceHero";
import PlaceInfo from "../components/place/PlaceInfo";
import PlaceGallery from "../components/place/PlaceGallery";
import PlaceMap from "../components/place/PlaceMap";
import PlaceLocation from "../components/place/PlaceLocation";
import AverageRating from "../components/reviews/AverageRating";
import ReviewList from "../components/reviews/ReviewList";
import ReviewForm from "../components/reviews/ReviewForm";

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

                <Link
                    to="/explore"
                    className="inline-flex items-center text-green-600 hover:text-green-700 font-medium mb-6"
                >
                    ← Back to Explore
                </Link>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                    <PlaceHero place={place} />


                    <div className="p-8">
                        <AverageRating
                            averageRating={place.average_rating}
                            reviewCount={place.review_count}
                        />
                    </div>
                    <div className="p-8 border-t">

                        <ReviewForm
                            placeId={place.id}
                            onReviewAdded={fetchPlace}
                        />

                    </div>

                    <div className="p-8 border-t">

                        <h2 className="text-3xl font-bold mb-6">
                            Reviews
                        </h2>

                        <ReviewList
                            reviews={place.reviews}
                        />

                    </div>
                    <div className="p-8 border-t">
                        <h2 className="text-3xl font-bold mb-6">
                            Reviews
                        </h2>

                        <ReviewList reviews={place.reviews} />
                    </div>

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