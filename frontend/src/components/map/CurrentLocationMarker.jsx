import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const currentLocationIcon = new L.Icon({
    iconUrl: "/icons/current-location.webp",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
});

function CurrentLocationMarker({ position }) {

    if (!position) return null;

    return (
        <Marker
            position={[position.lat, position.lng]}
            icon={currentLocationIcon}
        >
            <Popup>
                📍 You are here
            </Popup>
        </Marker>
    );
}

export default CurrentLocationMarker;