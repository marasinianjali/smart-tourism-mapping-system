import { useState } from "react";
import api from "../../api/axios";
import StarRating from "./StarRating";

function ReviewForm({
    placeId,
    onReviewAdded,
}) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await api.post(
                "tourism/reviews/",
                {
                    place: placeId,
                    rating,
                    comment,
                }
            );

            setComment("");
            setRating(5);

            onReviewAdded();

        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.detail ||
                "Unable to submit review."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow p-6"
        >

            <h2 className="text-2xl font-bold mb-5">
                Write a Review
            </h2>

            <StarRating
                rating={rating}
                editable
                onChange={setRating}
            />

            <textarea
                rows={5}
                value={comment}
                onChange={(e) =>
                    setComment(e.target.value)
                }
                placeholder="Share your experience..."
                className="w-full mt-5 border rounded-xl p-4"
            />

            <button
                type="submit"
                disabled={loading}
                className="mt-5 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
            >
                {loading
                    ? "Submitting..."
                    : "Submit Review"}
            </button>

        </form>
    );
}

export default ReviewForm;