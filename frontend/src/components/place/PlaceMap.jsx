import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
} from "react-leaflet";

function PlaceMap({ place }) {

    return (

        <section className="p-8">

            <h2 className="text-3xl font-bold mb-6">
                Location
            </h2>

            <div className="rounded-2xl overflow-hidden shadow-lg">

                <MapContainer
                    center={[
                        Number(place.latitude),
                        Number(place.longitude),
                    ]}
                    zoom={15}
                    scrollWheelZoom={false}
                    className="h-[500px] w-full"
                >

                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker
                        position={[
                            Number(place.latitude),
                            Number(place.longitude),
                        ]}
                    >

                        <Popup>

                            <strong>{place.name}</strong>

                            <br />

                            {place.district_name}

                        </Popup>

                    </Marker>

                </MapContainer>

            </div>

        </section>

    );

}

export default PlaceMap;