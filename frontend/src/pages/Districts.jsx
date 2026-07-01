import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Districts() {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    fetch("/data/nepal-with-districts-acesmndr.geojson")
      .then((res) => res.json())
      .then((data) => {
        const list = data.features.map((feature) => ({
          name: feature.properties.DISTRICT,
          province: feature.properties.PROVINCE,
        }));

        list.sort((a, b) => a.name.localeCompare(b.name));

        setDistricts(list);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-8">
        Explore Districts
      </h1>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">

        {districts.map((district) => (

          <Link
            key={district.name}
            to={`/districts/${district.name}`}
            className="border rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold">
              {district.name}
            </h2>

            <p className="text-gray-500 mt-2">
              {district.province}
            </p>

          </Link>

        ))}

      </div>

    </div>
  );
}

export default Districts;