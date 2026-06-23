import { Link } from "react-router-dom";
import {
  approvePlace,
  rejectPlace,
  deletePlace,
} from "../services/placeService";

function PlaceCard({ place }) {
  const role = localStorage.getItem("role");
  const handleApprove = async (e) => {
    e.preventDefault();

    try {
      await approvePlace(place.id);

      window.location.reload();

    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (e) => {
    e.preventDefault();

    try {
      await rejectPlace(place.id);

      window.location.reload();

    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();

    const confirmed = window.confirm(
      "Are you sure?"
    );

    if (!confirmed) return;

    try {
      await deletePlace(place.id);

      window.location.reload();

    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Link to={`/places/${place.id}`}>

      <div className="border rounded-lg p-4 mb-4 shadow">
        <h2 className="text-xl font-bold">
          {place.name}
        </h2>

        <p className="text-gray-600">
          {place.category_name}
        </p>

        <p className="text-gray-600">
          {place.district_name}
        </p>

        <p className="mt-2">
          {place.description}
        </p>
        <p className="mt-2">
          Status:
          <span className="font-bold">
            {" "}
            {place.status}
          </span>
        </p>

        <p className="text-sm text-red-500">
          Current Role: {role}
        </p>
        {role === "MUNICIPALITY_ADMIN" && (
          <button
            onClick={handleApprove}
            className="bg-green-500 text-white px-3 py-1 rounded mt-2 mr-2">
            Approve
          </button>
        )}

        {role === "MUNICIPALITY_ADMIN" && (
          <button
            onClick={handleReject}
            className="bg-red-500 text-white px-3 py-1 rounded mt-2">
            Reject
          </button>
        )}
        {[
          "MUNICIPALITY_ADMIN",
          "DATA_ENTRY_USER",
        ].includes(role) && (
            <button
              onClick={handleDelete}
              className="bg-gray-700 text-white px-3 py-1 rounded mt-2 ml-2"
            >
              Delete
            </button>
          )}
      </div>
    </Link>
  );
}

export default PlaceCard;