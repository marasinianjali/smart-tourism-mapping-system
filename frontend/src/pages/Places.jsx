import { useState, useEffect } from "react";
import api from "../api/axios";
import PlaceCard from "../components/PlaceCard";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProvinceFilter from "../components/ProvinceFilter";
import Layout from "../components/Layout";

function Places() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  console.log("SEARCH TERM:", searchTerm);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");

  useEffect(() => {
    fetchPlaces();
  }, []);
  useEffect(() => {
    console.log("PLACES STATE:", places);
  }, [places]);
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
  const filteredPlaces = places.filter((place) => {
    const matchesSearch =
      place.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "" ||
      place.category_name === selectedCategory;

    const matchesProvince =
      selectedProvince === "" ||
      place.province_name === selectedProvince;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesProvince
    );
  });
  console.log("FIRST PLACE:", places[0]);
  return (
    <div className="max-w-5xl mx-auto p-6">
      <Layout>
        <h1 className="text-3xl font-bold mb-6">
          Tourist Places
        </h1>
      </Layout>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ProvinceFilter
        selectedProvince={selectedProvince}
        setSelectedProvince={setSelectedProvince}
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