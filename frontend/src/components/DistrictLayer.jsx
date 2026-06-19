import { useState, useEffect } from "react";
import { GeoJSON } from "react-leaflet";


function DistrictLayer({ places }) {
    const [districts, setDistricts] = useState(null);

    useEffect(() => {
        fetchDistricts();
    }, []);

    const fetchDistricts = async () => {
        try {
            const response = await fetch(
                "/data/nepal-with-districts-acesmndr.geojson"
            );

            const data = await response.json();

            console.log("GEOJSON:", data);

            setDistricts(data);

        } catch (error) {
            console.error(error);
        }
    };

    if (!districts) {
        return null;
    }
    const onEachFeature = (feature, layer) => {
        console.log(feature.properties);
        const districtName =
            feature.properties.DISTRICT;

        const districtPlaces = places.filter(
            (place) =>
                place.district_name?.trim().toUpperCase() ===
                districtName?.trim().toUpperCase()
        );
       

        layer.bindPopup(`
            <strong>${districtName}</strong>
            <br/>
            Tourist Places:
            ${districtPlaces.length}
        `);
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
        });

    };
    const districtStyle = {
        color: "blue",
        weight: 1,
        fillOpacity: 0.1,
    };
    const highlightFeature = (e) => {
        e.target.setStyle({
            weight: 3,
            color: "red",
            fillOpacity: 0.3,
        });
    };

    const resetHighlight = (e) => {
        e.target.setStyle(districtStyle);
    };
    console.log("PLACES COUNT:", places.length);
    return (
        <GeoJSON
            data={districts}
            style={districtStyle}
            onEachFeature={onEachFeature}
        />
    );
}

export default DistrictLayer;