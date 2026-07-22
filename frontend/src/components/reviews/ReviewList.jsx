import ReviewCard from "./ReviewCard";

function ReviewList({ reviews, onReviewUpdated }) {
    if (reviews.length === 0) {
        return (
            <div className="bg-gray-50 rounded-xl p-8 text-center">
                <div className="text-5xl">
                    ⭐
                </div>
                <h3 className="text-xl font-semibold">
                    No reviews yet
                </h3>

                <p className="text-gray-500 mt-2">
                    Be the first person to review this place.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {reviews.map((review) => (
                <ReviewCard
                    key={review.id}
                    review={review}
                    onReviewUpdated={onReviewUpdated}
                />
            ))}

        </div>
    );
}

export default ReviewList;