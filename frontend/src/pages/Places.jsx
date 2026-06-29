import { useState, useEffect } from "react";
import api from "../api/axios";
import PlaceCard from "../components/PlaceCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProvinceFilter from "../components/ProvinceFilter";
import { Link } from "react-router-dom";

function Places() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  console.log("SEARCH TERM:", searchTerm);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

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

    const matchesStatus =
      selectedStatus === "" ||
      place.status === selectedStatus;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesProvince &&
      matchesStatus
    );
  });
  const role =
    localStorage.getItem("role");

  const visiblePlaces =
    role === "PUBLIC_USER"
      ? filteredPlaces.filter(
        (place) =>
          place.status === "approved"
      )
      : filteredPlaces;

  console.log("FIRST PLACE:", places[0]);
  return (
    
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Tourist Places
        </h1>

        {[
          "MUNICIPALITY_ADMIN",
          "DATA_ENTRY_USER",
        ].includes(
          localStorage.getItem("role")
        ) && (
            <Link
              to="/create-place"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              + Add Place
            </Link>
          )}

      </div>

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
      {role !== "PUBLIC_USER" && (
        <select
          value={selectedStatus}
          onChange={(e) =>
            setSelectedStatus(
              e.target.value
            )
          }
          className="border p-2 rounded"
        >
          <option value="">
            All Statuses
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="approved">
            Approved
          </option>

          <option value="rejected">
            Rejected
          </option>
        </select>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        visiblePlaces.map((place) => (

          <PlaceCard
            key={place.id}
            place={place}
            onPlaceUpdated={fetchPlaces}
          />
        ))
      )}
    </div>
  );
}

export default Places;