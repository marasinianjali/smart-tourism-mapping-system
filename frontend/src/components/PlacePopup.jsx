import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

function PlacePopup({ place }) {

  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  useEffect(() => {
    fetchNearbyPlaces();
  }, [place.id]);

  const fetchNearbyPlaces = async () => {
    try {
      const response = await api.get(
        `tourism/places/${place.id}/nearby/`
      );

      setNearbyPlaces(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-64">
      <img
        src={
          place.primary_image
            ? `http://127.0.0.1:8000${place.primary_image}`
            : "/images/nepal1.webp"
        }
        alt={place.name}
        className="w-full h-36 object-cover rounded-xl"
      />

      <h3 className="text-xl font-bold mt-3">
        {place.name}
      </h3>

      <p>
        <span
          className=" inline-block mt-3 bg-green-100 text-green-700
            px-3 py-1 rounded-full text-sm font-medium " >
          {place.category_name}
        </span>
      </p>
      <p className="text-gray-600 mt-2">
        📍 {place.district_name}
      </p>
      <p className="text-gray-600">
        🏔 {place.province_name}
      </p>
      <div className="mt-3">
        <h4 className="mt-5 font-semibold">
          Nearby Places
        </h4>

        {nearbyPlaces.length > 0 ? (
          <ul className="list-disc ml-5 mt-1">
            {nearbyPlaces.map((nearby) => (

              <li key={nearby.id}>
                {nearby.name}
                {" "}
                (
                {nearby.distance}
                km away)
              </li>

            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">
            No nearby places found.
          </p>
        )}
      </div>
      <Link
        to={`/places/${place.id}`}
        className=" mt-5 block w-full text-center bg-green-600 hover:bg-green-700
                    !text-white py-2 rounded-lg font-semibold no-underline transition " >
        View Details
      </Link>

    </div>
  );
}

export default PlacePopup;