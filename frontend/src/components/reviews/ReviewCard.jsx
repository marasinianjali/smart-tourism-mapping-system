import StarRating from "./StarRating";
import api from "../../api/axios";
import { useState } from "react";


function ReviewCard({ review, onReviewUpdated }) {
    const [isEditing, setIsEditing] = useState(false);

    const [editedComment, setEditedComment] = useState(
        review.comment
    );

    const [editedRating, setEditedRating] = useState(
        review.rating
    );

    const formattedDate =
        new Date(review.created_at).toLocaleDateString(
            "en-US",
            {
                year: "numeric",
                month: "short",
                day: "numeric",
            }
        );
    const currentUserId = Number(
        localStorage.getItem("user_id")
    );

    const deleteReview = async () => {

        if (!window.confirm("Delete this review?")) {
            return;
        }

        try {

            await api.delete(
                `tourism/reviews/${review.id}/`
            );

            onReviewUpdated();

        } catch (error) {

            console.error(error);

        }

    };
    const updateReview = async () => {

        try {

            await api.patch(
                `tourism/reviews/${review.id}/`,
                {
                    rating: editedRating,
                    comment: editedComment,
                }
            );

            setIsEditing(false);

            onReviewUpdated();

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex justify-between items-start">

                <div>

                    <h3 className="font-semibold text-lg">
                        👤 {review.user_full_name}
                    </h3>

                    <div className="mt-2">

                        <StarRating
                            rating={review.rating}
                        />

                    </div>

                </div>

                <span className="text-sm text-gray-500">
                    🗓 {formattedDate}
                </span>

            </div>

            {isEditing ? (

                <div className="mt-5">

                    <select
                        value={editedRating}
                        onChange={(e) =>
                            setEditedRating(Number(e.target.value))
                        }
                        className="border rounded-lg p-2 mb-4 w-full"
                    >
                        <option value={1}>★☆☆☆☆</option>
                        <option value={2}>★★☆☆☆</option>
                        <option value={3}>★★★☆☆</option>
                        <option value={4}>★★★★☆</option>
                        <option value={5}>★★★★★</option>
                    </select>

                    <textarea
                        value={editedComment}
                        onChange={(e) =>
                            setEditedComment(e.target.value)
                        }
                        rows={4}
                        className="
                w-full
                border
                rounded-xl
                p-3
            "
                    />

                </div>

            ) : (

                <p className="mt-5 text-gray-700 leading-relaxed">
                    {review.comment}
                </p>

            )}
            {currentUserId === review.user && (

                <div className="mt-5 flex gap-4">

                    {isEditing ? (

                        <>

                            <button
                                onClick={updateReview}
                                className="
                        text-green-600
                        hover:text-green-700
                        font-semibold
                    "
                            >
                                💾 Save
                            </button>

                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditedComment(review.comment);
                                    setEditedRating(review.rating);
                                }}
                                className="
                        text-gray-600
                        hover:text-gray-700
                        font-semibold
                    "
                            >
                                Cancel
                            </button>

                        </>

                    ) : (

                        <>

                            <button
                                onClick={() =>
                                    setIsEditing(true)
                                }
                                className="
                        text-blue-600
                        hover:text-blue-700
                        font-semibold
                    "
                            >
                                ✏ Edit
                            </button>

                            <button
                                onClick={deleteReview}
                                className="
                        text-red-600
                        hover:text-red-700
                        font-semibold
                    "
                            >
                                🗑 Delete
                            </button>

                        </>

                    )}

                </div>

            )}

        </div>

    );

}

export default ReviewCard;