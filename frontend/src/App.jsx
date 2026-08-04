import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Places from "./pages/Places";
import Explore from "./pages/Explore";
import PlaceDetail from "./pages/PlaceDetail";
import Profile from "./pages/Profile";
import TourismMap from "./pages/TourismMap";
import Dashboard from "./pages/Dashboard";
import CreatePlace from "./pages/CreatePlace";
import EditPlace from "./pages/EditPlace";
import Districts from "./pages/Districts";
import DistrictDetail from "./pages/DistrictDetail";
import Categories from "./pages/Categories";
import CategoryDetail from "./pages/CategoryDetail";
import Provinces from "./pages/Provinces";
import ProvinceDetail from "./pages/ProvinceDetail";
import PublicMap from "./pages/PublicMap";
import PublicPlaceDetail from "./pages/PublicPlaceDetail";
import TripPlanner from "./pages/TripPlanner";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/places"
          element={<Places />}
        />
        <Route
          path="/explore"
          element={<Explore />}
        />
        <Route
          path="/trip-planner"
          element={<TripPlanner />}
        />

        <Route
          path="/admin/places/:id"
          element={<PlaceDetail />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/admin/map"
          element={<TourismMap />}
        />
        <Route
          path="/map"
          element={<PublicMap />}
        />

        <Route
          path="/places/:id"
          element={<PublicPlaceDetail />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/districts"
          element={<Districts />}
        />

        <Route
          path="/districts/:districtName"
          element={<DistrictDetail />} />

        <Route
          path="/categories"
          element={<Categories />}
        />
        <Route
          path="/categories/:categoryName"
          element={<CategoryDetail />}
        />

        <Route
          path="/provinces"
          element={<Provinces />}
        />

        <Route
          path="/provinces/:provinceName"
          element={<ProvinceDetail />}
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