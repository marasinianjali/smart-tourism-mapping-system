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
  console.log(
    "CURRENT:",
    place.name
  );

  console.log(
    "ALL:",
    places.length
  );
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
      <div className="mt-3">
        <strong>Nearby Places:</strong>

        {nearbyPlaces.length > 0 ? (
          <ul className="list-disc ml-5 mt-1">
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
        className="inline-block mt-3 text-blue-600 hover:underline"
      >
        View Details →
      </Link>

    </div>
  );
}

export default PlacePopup;