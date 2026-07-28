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
import FlyToLocation from "../components/map/FlyToLocation";
import CurrentLocationMarker from "../components/map/CurrentLocationMarker";
import SearchRadiusCircle from "../components/map/SearchRadiusCircle";

function PublicMap() {

    const [places, setPlaces] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [radius, setRadius] = useState(10);
    const [mapCenter, setMapCenter] = useState([
        28.3949,
        84.1240,
    ]);


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

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported");
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                setUserLocation({
                    lat,
                    lng,
                }); fetchNearbyPlaces(lat, lng);

                setMapCenter([
                    lat,
                    lng
                ]);
            }
        );
    };

    const fetchNearbyPlaces = async (lat, lng) => {

        try {

            const response = await api.get(
                `tourism/places/radius/?lat=${lat}&lng=${lng}&radius=${radius}`
            );

            setPlaces(response.data);

        } catch (error) {
            console.error(error);
        }

    };
    const resetMap = async () => {

        setUserLocation(null);

        setMapCenter([
            28.3949,
            84.1240,
        ]);

        fetchPlaces();

    };

    return (
        <PublicLayout>

            <div className="max-w-7xl mx-auto py-8">

                <h1 className="text-3xl font-bold mb-6">
                    Explore Nepal Map
                </h1>
                <div className="mb-4 flex gap-4 items-center">

                    <button
                        onClick={getCurrentLocation}
                        className=" bg-green-600 hover:bg-green-700 text-white
                            px-5 py-3 rounded-xl transition " >
                        📍 Find Places Near Me
                    </button>
                    <select
                        value={radius}
                        onChange={(e) => setRadius(Number(e.target.value))}
                        className="border rounded-lg px-3 py-2"
                    >

                        <option value={5}>5 km</option>
                        <option value={10}>10 km</option>
                        <option value={20}>20 km</option>
                        <option value={50}>50 km</option>

                    </select>
                    <button
                        onClick={resetMap}
                        className="
        bg-gray-300
        hover:bg-gray-400
        px-5
        py-3
        rounded-xl
    "
                    >
                        Reset Map
                    </button>

                </div>

                <MapContainer
                    center={mapCenter}

                    zoom={13}
                    style={{
                        height: "650px",
                        width: "100%",
                    }}
                ><FlyToLocation
                        position={userLocation}
                    />
                    <CurrentLocationMarker
                        position={userLocation}
                    />
                    <SearchRadiusCircle
                        position={userLocation}
                        radius={radius}
                    />


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