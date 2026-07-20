import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
} from "react-leaflet";

import MarkerClusterGroup from "react-leaflet-cluster";

import { useEffect, useState } from "react";

import api from "../api/axios";

import PublicLayout from "../components/PublicLayout";
import PlacePopup from "../components/PlacePopup";
import DistrictLayer from "../components/DistrictLayer";
import HeatmapLayer from "../components/HeatmapLayer";

function PublicMap() {

    const [places, setPlaces] = useState([]);

    useEffect(() => {
        fetchPlaces();
    }, []);

    const fetchPlaces = async () => {
        try {

            const response = await api.get(
                "tourism/places/"
            );

            setPlaces(response.data.results);

        } catch (error) {
            console.error(error);
        }
    };

    const visiblePlaces = places.filter(
        (place) => place.status === "approved"
    );

    return (
        <PublicLayout>

            <div className="max-w-7xl mx-auto py-8">

                <h1 className="text-3xl font-bold mb-6">
                    Explore Nepal Map
                </h1>

                <MapContainer
                    center={[28.3949, 84.1240]}
                    zoom={7}
                    style={{
                        height: "650px",
                        width: "100%",
                    }}
                >

                    <TileLayer
                        attribution="&copy; OpenStreetMap contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <HeatmapLayer
                        places={visiblePlaces}
                    />

                    <DistrictLayer
                        places={visiblePlaces}
                    />

                    <MarkerClusterGroup>

                        {visiblePlaces.map((place) => (

                            <Marker
                                key={place.id}
                                position={[
                                    Number(place.latitude),
                                    Number(place.longitude),
                                ]}
                            >

                                <Popup>

                                    <PlacePopup
                                        place={place}
                                        places={visiblePlaces}
                                    />

                                </Popup>

                            </Marker>

                        ))}

                    </MarkerClusterGroup>

                </MapContainer>

            </div>

        </PublicLayout>
    );
}

export default PublicMap;