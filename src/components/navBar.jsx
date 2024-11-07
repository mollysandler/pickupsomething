import { Link } from "react-router-dom";
import "./styles/navBar.css";

const SportButtons = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        {/* <li className="navbar-item">
          <Link to="/">Home</Link>
        </li> */}
        <li className="navbar-item">
          <Link to="/map">Maps</Link>
        </li>
        <li className="navbar-item">
          <Link to="/calender">Calender</Link>
        </li>
        {/* <li className="navbar-item">
          <Link to="/search-sports">Search</Link>
        </li> */}
        <li className="navbar-item">
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
        <li className="navbar-item">
          <Link to="/start-sport">Request a Sport</Link>
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
