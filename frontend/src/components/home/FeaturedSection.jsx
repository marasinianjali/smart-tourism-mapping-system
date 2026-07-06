function FeaturedSection() {
    return (
    <div> 
        {/* Featured */}

        <section className="max-w-7xl mx-auto px-6 py-20">

            <h2 className="text-4xl font-bold text-center mb-12">
                Featured Destinations
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <img
                        src="https://picsum.photos/600/400"
                        className="h-52 w-full object-cover rounded-lg"
                    />

                    <h3 className="text-2xl font-bold">
                        Pashupatinath
                    </h3>

                    <p className="text-gray-600 mt-2">
                        Sacred Hindu temple and UNESCO World Heritage Site.
                    </p>

                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="h-52 bg-gray-200 rounded-lg mb-4"></div>

                    <h3 className="text-2xl font-bold">
                        Pokhara
                    </h3>

                    <p className="text-gray-600 mt-2">
                        Stunning lakes, mountains and adventure sports.
                    </p>

                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="h-52 bg-gray-200 rounded-lg mb-4"></div>

                    <h3 className="text-2xl font-bold">
                        Lumbini
                    </h3>

                    <p className="text-gray-600 mt-2">
                        Birthplace of Lord Buddha and global pilgrimage destination.
                    </p>

                </div>

            </div>

        </section></div>);
}
export default FeaturedSection;