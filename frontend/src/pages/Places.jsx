import { useState, useEffect } from "react";
import api from "../api/axios";

function Places() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaces();
  }, []);

const fetchPlaces = async () => {
  try {
    console.log("TOKEN:", localStorage.getItem("access"));

    const response = await api.get(
      "tourism/places/",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );

    console.log("RESPONSE:", response.data);

    setPlaces(response.data.results);

  } catch (error) {
    console.error("API ERROR:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <h1>Places</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        places.map((place) => (
          <div key={place.id}>
            <h3>{place.name}</h3>
            <p>{place.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Places;