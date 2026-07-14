function PlaceGallery({ place }) {

    if (!place.images || place.images.length === 0) {
        return null;
    }

    return (

        <section className="p-8">

            <h2 className="text-3xl font-bold mb-6">
                Gallery
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

                {place.images.map((image) => (

                    <div
                        key={image.id}
                        className="overflow-hidden rounded-2xl shadow-md group"
                    >

                        <img
                            src={image.image}
                            alt={image.caption}
                            className="
                                w-full
                                h-64
                                object-cover
                                transition-transform
                                duration-500
                                group-hover:scale-110
                            "
                        />

                    </div>

                ))}

            </div>

        </section>

    );

}

export default PlaceGallery;