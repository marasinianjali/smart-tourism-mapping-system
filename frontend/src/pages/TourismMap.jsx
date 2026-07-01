import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import PlacePopup from "../components/PlacePopup";
import DistrictLayer from "../components/DistrictLayer";
import HeatmapLayer from "../components/HeatmapLayer";

function TourismMap() {
  const [places, setPlaces] = useState([]);
  const [startPlace, setStartPlace] = useState(null);
  const [endPlace, setEndPlace] = useState(null);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const isAdmin = [
    "MUNICIPALITY_ADMIN",
    "DATA_ENTRY_USER",
  ].includes(role);
  const visiblePlaces = isAdmin
    ? places
    : places.filter(
      (place) => place.status === "approved"
    );

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
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
      // console.log(response.data.results);
      // console.log(response.data);


      setPlaces(response.data.results);
      console.log(
        response.data.results.filter(
          p => p.district_name === "Kathmandu"
        )
      );

    } catch (error) {
      console.error(error);
    }

  };
  
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">
        Tourism Map
      </h1>
      {isAdmin && (
        <div className="mb-4 p-4 bg-white rounded shadow">
          <p>
            <strong>Start:</strong>{" "}
            {startPlace ? startPlace.name : "Not selected"}
          </p>

          <p>
            <strong>End:</strong>{" "}
            {endPlace ? endPlace.name : "Not selected"}
          </p>
        </div>
      )}
      <MapContainer
        center={[28.3949, 84.1240]}
        zoom={7}
        style={{
          height: "600px",
          width: "100%",
        }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <HeatmapLayer places={visiblePlaces} />
        <DistrictLayer
          places={visiblePlaces}
          onDistrictClick={(district) =>
            navigate(`/districts/${district}`)
          }
        />
        {startPlace && endPlace && (
          <Polyline
            pathOptions={{
              color: "red",
              weight: 5,
            }}
            positions={[
              [
                Number(startPlace.latitude),
                Number(startPlace.longitude),
              ],
              [
                Number(endPlace.latitude),
                Number(endPlace.longitude),
              ],
            ]}
          />
        )}


        <MarkerClusterGroup key={visiblePlaces.length}>
          {visiblePlaces.map((place) => (
            <Marker
              key={place.id}
              position={[
                Number(place.latitude),
                Number(place.longitude),
              ]}
            >
              <Popup>
                {isAdmin && (
                  <>
                    <button
                      onClick={() => setStartPlace(place)}
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Start
                    </button>

                    <button
                      onClick={() => setEndPlace(place)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      End
                    </button>
                  </>
                )}

                <PlacePopup
                  place={place}
                  places={visiblePlaces}
                />
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </Layout>
  );
}

export default TourismMap;