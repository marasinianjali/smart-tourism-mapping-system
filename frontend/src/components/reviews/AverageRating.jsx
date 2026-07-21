import StarRating from "./StarRating";

function AverageRating({
    averageRating,
    reviewCount,
}) {
    return (
        <div className="flex items-center gap-4">

            <StarRating
                rating={Math.round(averageRating)}
            />

            <div>

                <p className="font-semibold text-lg">
                    {averageRating.toFixed(1)} / 5
                </p>

                <p className="text-sm text-gray-500">
                    {reviewCount} review
                    {reviewCount !== 1 && "s"}
                </p>

            </div>

        </div>
    );
}

export default AverageRating;