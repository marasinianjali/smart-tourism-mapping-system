import { useState, useEffect } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";
import PlaceCard from "../components/PlaceCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProvinceFilter from "../components/ProvinceFilter";
import SortFilter from "../components/SortFilter";
import { Link } from "react-router-dom";

function Places() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSort, setSelectedSort] = useState("newest");

  useEffect(() => {
    fetchPlaces();
  }, []);
  useEffect(() => {
  }, [places]);
  const fetchPlaces = async () => {
    try {

      const response = await api.get(
        "tourism/places/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      setPlaces(response.data.results);

    } catch (error) {
      console.error("API ERROR:", error);
    } finally {
      setLoading(false);
    }
  };
  const filteredPlaces = places.filter((place) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      place.name.toLowerCase().includes(search) ||
      place.description.toLowerCase().includes(search) ||
      place.category_name.toLowerCase().includes(search) ||
      place.district_name.toLowerCase().includes(search) ||
      place.province_name.toLowerCase().includes(search);

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

  const sortedPlaces = [...filteredPlaces];
  if (selectedSort === "az") {
    sortedPlaces.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (selectedSort === "za") {
    sortedPlaces.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  if (selectedSort === "newest") {
    sortedPlaces.sort(
      (a, b) =>
        new Date(b.created_at) -
        new Date(a.created_at)
    );
  }

  if (selectedSort === "oldest") {
    sortedPlaces.sort(
      (a, b) =>
        new Date(a.created_at) -
        new Date(b.created_at)
    );
  }
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedProvince("");
    setSelectedStatus("");
    setSelectedSort("newest");
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">

          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Tourist Places
            </h1>

            <p className="text-gray-500 mt-2">
              Manage all tourism destinations across Nepal.
            </p>
          </div>

          {[
            "MUNICIPALITY_ADMIN",
            "DATA_ENTRY_USER",
          ].includes(
            localStorage.getItem("role")
          ) && (
              <Link
                to="/create-place"
                className=" bg-green-600 hover:bg-green-700 text-white font-semibold px-5
                py-3 rounded-xl shadow-md transition "
              >
                + Add Place
              </Link>
            )}

        </div>
        <div className=" bg-white rounded-2xl shadow p-6 space-y-5 mb-8 ">

          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <div className="grid md:grid-cols-3 gap-4">

            <CategoryFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <ProvinceFilter
              selectedProvince={selectedProvince}
              setSelectedProvince={setSelectedProvince}
            />
            <SortFilter
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
            />
          </div>
          <button
            onClick={clearFilters}
            className="
        px-5
        py-3
        rounded-xl
        border
        border-gray-300
        hover:bg-gray-100
        transition
    "
          >
            Clear Filters
          </button>
        </div>

        {role !== "PUBLIC_USER" && (
          <select
            value={selectedStatus}
            onChange={(e) =>
              setSelectedStatus(
                e.target.value
              )
            }
            className=" min-w-[180px]rounded-xl bg-white px-4 py-2 shadow-sm outline-none 
            transition focus:ring-2 focus:ring-green-300 focus:border-green-500 "
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
          sortedPlaces.map((place) => (

            <PlaceCard
              key={place.id}
              place={place}
              onPlaceUpdated={fetchPlaces}
            />
          ))
        )}
      </div>
    </Layout>
  );
}

export default Places;