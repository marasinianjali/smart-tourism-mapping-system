import { Marker, Popup } from "react-leaflet";

function DestinationMarker({ destination }) {

    if (!destination) return null;

    return (

        <Marker
            position={[
                Number(destination.latitude),
                Number(destination.longitude),
            ]}
        >

            <Popup>

                <div className="text-center">

                    <h3 className="font-bold">
                        🎯 Destination
                    </h3>

                    <p>
                        {destination.name}
                    </p>

                </div>

            </Popup>

        </Marker>

    );

}

export default DestinationMarker;