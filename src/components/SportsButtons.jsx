import { Link } from "react-router-dom";
import "../index.css"; // Import the CSS file here

const SportButtons = () => {
  return (
    <div className="container">
      <h1>Select a Sport to Play</h1>
      <div>
        <Link to="/pickleball">
          <button>Pickleball</button>
        </Link>
      </div>
      <div>
        <Link to="/basketball">
          <button>Basketball</button>
        </Link>
      </div>
      <div>
        <Link to="/frisbee">
          <button>Ultimate Frisbee</button>
        </Link>
      </div>
    </div>
  );
};

export default SportButtons;
