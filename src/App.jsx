import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pickleball from "./pages/sports/Pickleball";
import Dodgeball from "./pages/sports/Dodgeball";
import RunClub from "./pages/sports/RunClub";
import Frisbee from "./pages/sports/Frisbee";

// import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import About from "./pages/About";
import Search from "./pages/Search";
import StartSport from "./pages/StartSport";
import RegisterSport from "./pages/RegisterSport";
import Map from "./pages/Map";
import Calender from "./pages/Calender";

import Layout from "./components/Layout"; // Import Layout

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Homepage with buttons */}
          <Route path="/" element={<Map />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/map" element={<Map />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/search-sports" element={<Search />} />
          <Route path="/start-sport" element={<StartSport />} />
          <Route path="/register-sport" element={<RegisterSport />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
