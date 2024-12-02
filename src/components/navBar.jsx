import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown"; // Import ProfileDropdown
import "./styles/navBar.css";
import image from "../assets/small.jpeg";

const SportButtons = () => {
  return (
    <nav className="navbar">
      {/* <div className="navbar-logo">
        <Link to="/about">
          <img src={image} alt="Logo" className="logo-image" />
        </Link>
      </div> */}
      <ProfileDropdown /> {/* Include ProfileDropdown here */}
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link to="/map">Maps</Link>
        </li>
        <li className="navbar-item">
          <Link to="/calendar">Calendar</Link>
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
