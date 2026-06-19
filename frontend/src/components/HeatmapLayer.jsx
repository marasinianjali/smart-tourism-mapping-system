import { useEffect } from "react";
import L from "leaflet";
import "leaflet.heat";
import { useMap } from "react-leaflet";

function HeatmapLayer({ places }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !places.length) return;

    const heatPoints = places
      .filter(
        (p) =>
          p.latitude &&
          p.longitude
      )
      .map((p) => [
        Number(p.latitude),
        Number(p.longitude),
        0.5, 
      ]);

    const heat = L.heatLayer(heatPoints, {
      radius: 25,
      blur: 15,
      maxZoom: 10,
    }).addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [map, places]);

  return null;
}

export default HeatmapLayer;