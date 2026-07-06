function CategorySection() {
    return (
    <div>
      {/* Categories */}

      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-12">
            Explore by Category
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">

            <div className="shadow rounded-xl p-10 hover:shadow-xl transition">

              <div className="text-6xl mb-4">
                🏔
              </div>

              <h3 className="text-2xl font-bold">
                Natural
              </h3>

            </div>

            <div className="shadow rounded-xl p-10 hover:shadow-xl transition">

              <div className="text-6xl mb-4">
                🛕
              </div>

              <h3 className="text-2xl font-bold">
                Religious
              </h3>

            </div>

            <div className="shadow rounded-xl p-10 hover:shadow-xl transition">

              <div className="text-6xl mb-4">
                🏰
              </div>

              <h3 className="text-2xl font-bold">
                Historical
              </h3>

            </div>

          </div>

        </div>

      </section></div>
    );
}
export default CategorySection;