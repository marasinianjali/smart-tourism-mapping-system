import { useEffect } from "react";
import { useMap } from "react-leaflet";

import L from "leaflet";
import "leaflet-routing-machine";

function RouteControl({ userLocation, destination, onRouteFound }) {

    const map = useMap();
    useEffect(() => {

        if (!userLocation || !destination) return;

        const routingControl = L.Routing.control({

            waypoints: [

                L.latLng(
                    userLocation.lat,
                    userLocation.lng
                ),

                L.latLng(
                    Number(destination.latitude),
                    Number(destination.longitude)
                ),

            ],

            routeWhileDragging: false,
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: true,
            show: true,

        }).addTo(map);

        routingControl.on("routesfound", (e) => {

            const route = e.routes[0];

            onRouteFound({
                distance: route.summary.totalDistance,
                time: route.summary.totalTime,
            });

        });

        return () => {

            map.removeControl(routingControl);

        };

    }, [userLocation, destination]);
    

    return null;
}

export default RouteControl;