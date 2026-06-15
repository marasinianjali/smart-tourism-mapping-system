function StatsCard({ title, value }) {
  return (
    <div
      className="
      bg-white
      rounded-xl
      shadow-md
      p-6
      hover:shadow-lg
      transition
      border
      "
    >
      <h3 className="text-gray-500 text-sm uppercase">
        {title}
      </h3>

      <p className="text-4xl font-bold mt-3 text-blue-600">
        {value}
      </p>
    </div>
  );
}

export default StatsCard;