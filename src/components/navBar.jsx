import { Link } from "react-router-dom";
import "./navBar.css"; // Import the CSS file here

const SportButtons = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
        <li className="navbar-item">
          <Link to="/search-sports">Search Sports</Link>
        </li>
        <li className="navbar-item">
          <Link to="/start-sport">Start a Sport</Link>
        </li>
        <li className="navbar-item">
          <Link to="/register-sport">Register a Sport</Link>
        </li>
        <li className="navbar-item">
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SportButtons;
