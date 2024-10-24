import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pickleball from "./pages/Pickleball";
import Basketball from "./pages/Basketball";
import Dodgeball from "./pages/Dodgeball";
import RunClub from "./pages/RunClub";
import Frisbee from "./pages/frisbee";

import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import About from "./pages/About";
// import SearchSports from "./pages/SearchSports";
// import StartSport from "./pages/StartSport";
// import RegisterSport from "./pages/RegisterSport";

import Layout from "./components/Layout"; // Import Layout

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Homepage with buttons */}
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          {/* <Route path="/search-sports" element={<SearchSports />} />
        <Route path="/start-sport" element={<StartSport />} />
        <Route path="/register-sport" element={<RegisterSport />} />*/}
          <Route path="/about" element={<About />} />

          <Route path="/pickleball" element={<Pickleball />} />
          <Route path="/basketball" element={<Basketball />} />
          <Route path="/dodgeball" element={<Dodgeball />} />
          <Route path="/runclub" element={<RunClub />} />
          <Route path="/frisbee" element={<Frisbee />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
