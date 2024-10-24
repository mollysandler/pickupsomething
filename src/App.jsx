import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SportButtons from "./components/SportsButtons";
import Pickleball from "./pages/Pickleball";
import Basketball from "./pages/Basketball";
import Frisbee from "./pages/frisbee";

function App() {
  return (
    <Router>
      <Routes>
        {/* Homepage with buttons */}
        <Route path="/" element={<SportButtons />} />
        {/* Routes for each sport */}
        <Route path="/pickleball" element={<Pickleball />} />
        <Route path="/basketball" element={<Basketball />} />
        <Route path="/frisbee" element={<Frisbee />} />
      </Routes>
    </Router>
  );
}

export default App;
