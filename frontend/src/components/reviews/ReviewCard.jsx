import StarRating from "./StarRating";

function ReviewCard({ review }) {
    return (
        <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex justify-between items-start">

                <div>

                    <h3 className="font-semibold text-lg">
                        {review.user_full_name}
                    </h3>

                    <StarRating
                        rating={review.rating}
                    />

                </div>

                <span className="text-sm text-gray-500">
                    {new Date(
                        review.created_at
                    ).toLocaleDateString()}
                </span>

            </div>

            <p className="mt-4 text-gray-700 leading-relaxed">
                {review.comment}
            </p>

        </div>
    );
}

export default ReviewCard;