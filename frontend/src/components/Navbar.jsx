import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/dashboard"
          className="hover:text-blue-300 transition"
        >
          Dashboard
        </Link>
        <Link
          to="/places"
          className="text-2xl font-bold text-slate-800"
        >
          STMS
        </Link>

        <div className="flex items-center gap-6 text-slate-600">

          <Link
            to="/places"
            className="hover:text-blue-600 transition font-medium"
          >
            Places
          </Link>

          <Link
            to="/profile"
            className="hover:text-blue-600 transition font-medium"
          >
            Profile
          </Link>

          <Link
            to="/admin/map"
            className="hover:text-blue-600 transition font-medium"
          >
            Map
          </Link>


          <button
            onClick={() => {
              localStorage.removeItem("access");
              localStorage.removeItem("refresh");
            }}
            className="px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;