function StatsSection() {
    return(
    <div>
         {/* Stats */}

      <section className="py-20 bg-gray-100">

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">

          <div>

            <h2 className="text-5xl font-bold text-blue-700">
              21+
            </h2>

            <p className="mt-2 text-gray-600">
              Tourist Places
            </p>

          </div>

          <div>

            <h2 className="text-5xl font-bold text-green-700">
              14
            </h2>

            <p className="mt-2 text-gray-600">
              Districts
            </p>

          </div>

          <div>

            <h2 className="text-5xl font-bold text-orange-600">
              3
            </h2>

            <p className="mt-2 text-gray-600">
              Categories
            </p>

          </div>

        </div>

      </section>

    </div>
    );
}
export default StatsSection;