function PlaceCard({ place }) {
  return (
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
    </div>
  );
}

export default PlaceCard;