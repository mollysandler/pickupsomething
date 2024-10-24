import { Link } from "react-router-dom";
import "./styles/Home.css"; // Import the CSS file
import SportButtons from "../components/SportsButtons.jsx";

const Home = () => {
  return (
    <div>
      {/* Navigation Bar */} <SportButtons />
    </div>
  );
};

export default Home;
