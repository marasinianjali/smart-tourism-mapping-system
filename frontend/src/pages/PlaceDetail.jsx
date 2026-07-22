import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";
import PlaceHero from "../components/place/PlaceHero";
import PlaceInfo from "../components/place/PlaceInfo";
import PlaceGallery from "../components/place/PlaceGallery";
import PlaceMap from "../components/place/PlaceMap";
import PlaceLocation from "../components/place/PlaceLocation";
import ReviewSection from "../components/reviews/ReviewSection";

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
        <Layout>

            <div className="max-w-5xl mx-auto py-8">

                <Link
                    to="/places" className=" inline-flex items-center text-green-600 hover:text-green-700
                                    font-medium mb-6 " >
                    ← Back to Places
                </Link>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                    <PlaceHero place={place}
                        showStatus={true} />
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

        </Layout>
    );
}

export default PlaceDetail;