import { Link } from "react-router-dom";

function PlacePopup({ place, places }) {
  const calculateDistance = (
    lat1,
    lon1,
    lat2,
    lon2
  ) => {
    const R = 6371;

    const dLat =
      (lat2 - lat1) * Math.PI / 180;

    const dLon =
      (lon2 - lon1) * Math.PI / 180;

    const a =
      Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    return R * c;
  };
  const nearbyPlaces = places
    .filter(
      (p) => p.id !== place.id
    )
    .map((p) => ({
      ...p,
      distance:
        calculateDistance(
          Number(place.latitude),
          Number(place.longitude),
          Number(p.latitude),
          Number(p.longitude)
        ),
    }))
    .filter((p) => p.distance <= 50)
    .sort(
      (a, b) =>
        a.distance - b.distance
    )
    .slice(0, 3);

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
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            {nearbyPlaces.map((nearby) => (
              <li key={nearby.id}>
                {nearby.name}
                {" "}
                (
                {nearby.distance.toFixed(1)}
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