import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Places from "./pages/Places";
import PlaceDetail from "./pages/PlaceDetail";
import Profile from "./pages/Profile";
import TourismMap from "./pages/TourismMap";
import Dashboard from "./pages/Dashboard";
import CreatePlace from "./pages/CreatePlace";
import EditPlace from "./pages/EditPlace";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/places"
          element={<Places />}
        />

        <Route
          path="/places/:id"
          element={<PlaceDetail />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/map"
          element={<TourismMap />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/create-place"
          element={
            <ProtectedRoute
              allowedRoles={[
                "MUNICIPALITY_ADMIN",
                "DATA_ENTRY_USER",
              ]}
            >
              <CreatePlace />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-place/:id"
          element={
            <ProtectedRoute
              allowedRoles={[
                "MUNICIPALITY_ADMIN",
                "DATA_ENTRY_USER",
              ]}
            >
              <EditPlace />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;