import { Link } from "react-router-dom";

function PublicNavbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur shadow-sm z-50">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <Link
          to="/"
          className="text-2xl font-bold text-blue-700"
        >
          Smart Tourism
        </Link>

        <div className="flex gap-8 items-center">

          <Link to="/">Home</Link>

          <Link to="/explore">
            Explore
          </Link>

          <Link to="/map">
            Map
          </Link>

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default PublicNavbar;