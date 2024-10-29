import { useState, useEffect } from "react";
import MapComponent from "../components/MapComponent";
import locationsData from "../useful/locations.json"; // Adjust the path as needed
import "./styles/Map.css";

const sports = [
  "Pickleball",
  "Basketball",
  "Dodgeball",
  "Running",
  "Ultimate Frisbee",
  "Tennis",
];

const Map = () => {
  const [selectedSport, setSelectedSport] = useState(sports[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locations, setLocations] = useState(locationsData);

  const searchLocations = () => {
    // If searchTerm is empty, return all locations
    if (!searchTerm) return locations;

    return locations.filter((location) => {
      const townMatch = location.town
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return townMatch; // Match by town name
    });
  };

  useEffect(() => {
    console.log("selected sport: ", selectedSport);
  }, [selectedSport]);

  return (
    <div className="container">
      <h2>Welcome to Maps!</h2>

      <input
        type="text"
        placeholder="Search for a location..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "200px" }}
      />

      <div className="tabs">
        {sports.map((sport, index) => (
          <button
            key={index}
            className={`tab-button ${selectedSport === sport ? "active" : ""}`}
            onClick={() => setSelectedSport(sport)}
          >
            {sport}
          </button>
        ))}
        <button
          className={`tab-button ${selectedSport === "All" ? "active" : ""}`}
          onClick={() => setSelectedSport("All")}
        >
          All
        </button>{" "}
      </div>

      <MapComponent sport={selectedSport} locations={searchLocations()} />

      <a href="/">Go back</a>
    </div>
  );
};

export default Map;
