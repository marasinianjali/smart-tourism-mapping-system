import { useState, useEffect } from "react";
import api from "../api/axios";
import PlaceCard from "../components/PlaceCard";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";


function Places() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  console.log("SEARCH TERM:", searchTerm);

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
  const filteredPlaces = places.filter((place) =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="max-w-5xl mx-auto p-6">
      <Navbar />

      <h1 className="text-3xl font-bold mb-6">
        Tourist Places
      </h1>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        filteredPlaces.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
          />
        ))
      )}
    </div>
  );
}

export default Places;