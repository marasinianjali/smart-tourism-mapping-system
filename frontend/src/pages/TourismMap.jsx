import { MapContainer, TileLayer } from "react-leaflet";
import Layout from "../components/Layout";

function TourismMap() {
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
      </MapContainer>
    </Layout>
  );
}

export default TourismMap;