import { Link } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />

      {/* Hero */}
      <div className="mt-20 animate-bounce">

          <p className="text-lg">
              ↓
          </p>

      </div>
      <section className="bg-gradient-to-r from-blue-700 to-green-600 text-white">

        <div className="max-w-7xl mx-auto px-6 py-28 text-center">

          <h1 className="text-6xl font-extrabold mb-6">
            Explore Nepal
          </h1>

          <p className="text-xl max-w-3xl mx-auto leading-8 text-gray-100">
            Discover breathtaking mountains,
            ancient temples,
            vibrant culture,
            and unforgettable travel experiences
            across Nepal.
          </p>

          <div className="mt-10 flex justify-center gap-6">

            <Link
              to="/places"
              className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Explore Places
            </Link>

            <Link
              to="/map"
              className="border border-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-700 transition"
            >
              View Map
            </Link>

          </div>

        </div>

      </section>

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

      </section>

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

      </section>

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

      {/* Footer */}

      <footer className="bg-gray-900 text-white py-8 text-center">

        © 2026 Smart Tourism Mapping System

      </footer>

    </div>
  );
}

export default Home;