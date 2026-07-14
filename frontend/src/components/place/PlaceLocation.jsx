function PlaceLocation({ place }) {

    return (

        <section className="p-8">

            <h2 className="text-3xl font-bold mb-6">
                Location Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">

                    <p className="text-gray-500 text-sm uppercase">
                        Address
                    </p>

                    <p className="text-xl font-semibold mt-2">
                        {place.address || "Not Available"}
                    </p>

                </div>

                <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">

                    <p className="text-gray-500 text-sm uppercase">
                        District
                    </p>

                    <p className="text-xl font-semibold mt-2">
                        {place.district_name}
                    </p>

                </div>

                <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">

                    <p className="text-gray-500 text-sm uppercase">
                        Province
                    </p>

                    <p className="text-xl font-semibold mt-2">
                        {place.province_name}
                    </p>

                </div>

                <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">

                    <p className="text-gray-500 text-sm uppercase">
                        Coordinates
                    </p>

                    <p className="text-xl font-semibold mt-2">
                        {place.latitude}, {place.longitude}
                    </p>

                </div>

            </div>

        </section>

    );

}

export default PlaceLocation;