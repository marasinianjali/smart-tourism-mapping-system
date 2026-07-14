function PlaceInfo({ place }) {
    return (
        <section className="p-8">

            <h2 className="text-3xl font-bold mb-6">
                About this Place
            </h2>

            <p className="text-gray-700 leading-8 text-lg">
                {place.description}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-10">

                <div className="bg-gray-50 rounded-xl p-5">
                    <h3 className="text-sm text-gray-500 uppercase">
                        Category
                    </h3>

                    <p className="text-xl font-semibold mt-2">
                        {place.category_name}
                    </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                    <h3 className="text-sm text-gray-500 uppercase">
                        District
                    </h3>

                    <p className="text-xl font-semibold mt-2">
                        {place.district_name}
                    </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                    <h3 className="text-sm text-gray-500 uppercase">
                        Province
                    </h3>

                    <p className="text-xl font-semibold mt-2">
                        {place.province_name}
                    </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                    <h3 className="text-sm text-gray-500 uppercase">
                        Address
                    </h3>

                    <p className="text-xl font-semibold mt-2">
                        {place.address || "Not Available"}
                    </p>
                </div>

            </div>

        </section>
    );
}

export default PlaceInfo;