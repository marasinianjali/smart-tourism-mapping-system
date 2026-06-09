import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Places from "./pages/Places";
import PlaceDetail from "./pages/PlaceDetail";
import Profile from "./pages/Profile";
import TourismMap from "./pages/TourismMap";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/places" element={<Places />} />
        <Route path="/places/:id" element={<PlaceDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/map" element={<TourismMap />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;