import { useEffect } from "react";
import { useMap } from "react-leaflet";

function FlyToLocation({ position }) {

    const map = useMap();

    useEffect(() => {

        if (position) {

            map.flyTo(
                [position.lat, position.lng],
                13,
                {
                    duration: 2,
                }
            );

        }

    }, [position, map]);

    return null;
}

export default FlyToLocation;