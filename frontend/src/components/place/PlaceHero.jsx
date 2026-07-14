function PlaceHero({ place }) {

    return (

        <section className="relative h-[500px] rounded-3xl overflow-hidden shadow-xl">


            <img
                src={
                    place.primary_image
                        ? `http://127.0.0.1:8000${place.primary_image}`
                        : "/images/nepal1.webp"
                }
                alt={place.name}
                className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 flex flex-col justify-end h-full p-10 text-white">

                <div className="flex justify-between items-center">

                    <span className="bg-green-500 px-4 py-2 rounded-full text-sm font-medium">
                        {place.category_name}
                    </span>

                    <span
                        className={`
            px-4 py-2 rounded-full text-sm font-semibold
            ${place.status === "approved"
                                ? "bg-green-100 text-green-700"
                                : place.status === "pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                            }
        `}
                    >
                        {place.status}
                    </span>

                </div>

                <h1 className="text-5xl font-bold mt-5">

                    {place.name}

                </h1>

                <p className="mt-3 text-lg text-gray-200">

                    📍 {place.district_name} • {place.province_name}

                </p>
               
            </div>

        </section>

    );

}

export default PlaceHero;