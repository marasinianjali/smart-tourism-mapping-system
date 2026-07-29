import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
} from "react-leaflet";

import MarkerClusterGroup from "react-leaflet-cluster";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import api from "../api/axios";

import PublicLayout from "../components/PublicLayout";
import PlacePopup from "../components/PlacePopup";
import DistrictLayer from "../components/DistrictLayer";
import HeatmapLayer from "../components/HeatmapLayer";
import FlyToLocation from "../components/map/FlyToLocation";
import CurrentLocationMarker from "../components/map/CurrentLocationMarker";
import SearchRadiusCircle from "../components/map/SearchRadiusCircle";
import RouteControl from "../components/map/RouteControl";
import DestinationMarker from "../components/map/DestinationMarker";

function PublicMap() {

    const [places, setPlaces] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [radius, setRadius] = useState(10);
    const [mapCenter, setMapCenter] = useState([
        28.3949,
        84.1240,
    ]);
    const location = useLocation();
    const [destination, setDestination] = useState(null);
    const [routeInfo, setRouteInfo] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const destinationId = params.get("destination");

        if (destinationId) {
            fetchDestination(destinationId);
        }
    }, [location.search]);


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
                console.log("Current Position:", position.coords);
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

    const fetchDestination = async (id) => {
        try {
            const response = await api.get(
                `tourism/places/${id}/`

            );
            setDestination(response.data);
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

    const endNavigation = () => {

        setDestination(null);
        setRouteInfo(null);

        fetchPlaces();

    };
    console.log(destination);
    console.log(routeInfo);

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
                        " >
                        Reset Map
                    </button>
                    <button
                        onClick={endNavigation}
                        className="
                            ml-3
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            px-5
                            py-2
                            rounded-xl
                        " >
                        ❌ End Navigation
                    </button>

                </div>
                {routeInfo && destination && (

                    <div className="bg-white shadow rounded-2xl p-5 mb-6">

                        <h2 className="text-xl font-bold mb-3">
                            🧭 Navigation
                        </h2>
                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${destination.latitude},${destination.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                inline-block
                                mt-4
                                bg-green-600
                                hover:bg-green-700
                                text-white
                                px-5
                                py-2
                                rounded-xl
                                no-underline
                                transition
                            "  >
                            🗺 Open in Google Maps
                        </a>

                        <div className="space-y-2">

                            <p>
                                <span className="font-semibold">
                                    📍 Destination:
                                </span>{" "}
                                {destination.name}
                            </p>

                            <p>
                                <span className="font-semibold">
                                    📏 Distance:
                                </span>{" "}
                                {(routeInfo.distance / 1000).toFixed(2)} km
                            </p>

                            <p>
                                <span className="font-semibold">
                                    ⏱ Estimated Time:
                                </span>{" "}
                                {Math.ceil(routeInfo.time / 60)} minutes
                            </p>

                        </div>

                    </div>

                )}

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
                    <DestinationMarker
                        destination={destination}
                    />
                    <SearchRadiusCircle
                        position={userLocation}
                        radius={radius}
                    />
                    <RouteControl
                        userLocation={userLocation}
                        destination={destination}
                        onRouteFound={setRouteInfo}
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