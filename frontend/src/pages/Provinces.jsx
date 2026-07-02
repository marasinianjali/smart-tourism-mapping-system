import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Provinces() {
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const token = localStorage.getItem("access");

      const config = token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {};

      const response = await api.get(
        "tourism/places/",
        config
      );

      const approvedPlaces =
        response.data.results.filter(
          (place) => place.status === "approved"
        );

      const uniqueProvinces = [
        ...new Set(
          approvedPlaces.map(
            (place) => place.province_name
          )
        ),
      ];

      setProvinces(uniqueProvinces);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-8">
        Explore Provinces
      </h1>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">

        {provinces.map((province) => (

          <Link
            key={province}
            to={`/provinces/${province}`}
            className="border rounded-xl p-6 shadow hover:shadow-lg transition"
          >

            <h2 className="text-xl font-bold">
              {province}
            </h2>

          </Link>

        ))}

      </div>

    </div>
  );
}

export default Provinces;