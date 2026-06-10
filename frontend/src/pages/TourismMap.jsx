import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import api from "../api/axios";

function TourismMap() {
  const [places, setPlaces] = useState([]);
  console.log("MAP PLACES:", places);
  useEffect(() => {
    fetchPlaces();
  }, []);

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
      console.log(response.data.results);
  

      setPlaces(response.data.results);

    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">
        Tourism Map
      </h1>

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
        
        {places.map((place) => (
          <Marker
            key={place.id}
            position={[
              Number(place.latitude),
              Number(place.longitude),
            ]}
          >
            <Popup>
              {place.name}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Layout>
  );
}

export default TourismMap;