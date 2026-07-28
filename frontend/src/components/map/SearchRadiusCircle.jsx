import { Circle } from "react-leaflet";

function SearchRadiusCircle({ position, radius }) {

    if (!position) return null;

    return (
        <Circle
            center={[position.lat, position.lng]}
            radius={radius * 1000}
            pathOptions={{
                color: "green",
                fillColor: "green",
                fillOpacity: 0.15,
            }}
        />
    );
}

export default SearchRadiusCircle;