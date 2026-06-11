import { Link } from "react-router-dom";

function PlacePopup({ place }) {
  return (
    <div className="min-w-[200px]">

      <h3 className="font-bold text-lg mb-2">
        {place.name}
      </h3>

      <p>
        <strong>Category:</strong>
        {" "}
        {place.category_name}
      </p>

      <p>
        <strong>District:</strong>
        {" "}
        {place.district_name}
      </p>

      <p>
        <strong>Province:</strong>
        {" "}
        {place.province_name}
      </p>

      <Link
        to={`/places/${place.id}`}
        className="inline-block mt-3 text-blue-600 hover:underline"
      >
        View Details →
      </Link>

    </div>
  );
}

export default PlacePopup;