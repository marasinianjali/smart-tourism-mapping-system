import { Link } from "react-router-dom";

import AverageRating from "./AverageRating";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

function ReviewSection({
    place,
    fetchPlace,
}) {

    const token =
        localStorage.getItem("access");

    return (

        <>
            <div className="p-8">

                <AverageRating
                    averageRating={place.average_rating}
                    reviewCount={place.review_count}
                />

            </div>

            <div className="p-8 border-t">

                {token ? (

                    <ReviewForm
                        placeId={place.id}
                        onReviewAdded={fetchPlace}
                    />

                ) : (

                    <div className="bg-gray-100 rounded-xl p-6 text-center">

                        <p className="mb-4">
                            Please login to write a review.
                        </p>

                        <Link
                            to="/login"
                            className="bg-green-600 hover:bg-green-700
                                       text-white px-5 py-3 rounded-xl transition"
                        >
                            Login
                        </Link>

                    </div>

                )}

            </div>

            <div className="p-8 border-t">

                <h2 className="text-3xl font-bold mb-6">
                    Reviews
                </h2>

                <ReviewList
                    reviews={place.reviews}
                    onReviewUpdated={fetchPlace}
                />

            </div>
            

        </>
    );

}

export default ReviewSection;