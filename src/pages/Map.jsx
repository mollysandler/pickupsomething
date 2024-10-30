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
  const [selectedSport, setSelectedSport] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [locations, setLocations] = useState(locationsData);
  const [noValidLocations, setNoValidLocations] = useState(false);

  const searchLocations = () => {
    // If searchTerm is empty and "All" is selected, return all locations
    if (!searchTerm && selectedSport === "All") return locations;

    // Filter based on the selected sport and search term
    return locations.filter((location) => {
      const townMatch = location.town
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // If "All" is selected, include all locations, otherwise filter by sport
      if (selectedSport === "All") {
        return townMatch; // Match by town name only
      }

      return townMatch && location.sport === selectedSport; // Match by sport and town name
    });
  };

  useEffect(() => {
    console.log("selected sport: ", selectedSport);
    const validLocations = searchLocations().length > 0; // Check if there are valid locations for the current sport
    setNoValidLocations(!validLocations); // Update state based on validity
  }, [selectedSport, searchTerm]); // Add searchTerm to dependency array

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
        </button>
      </div>

      {/* Display message if no valid locations */}
      {/* {noValidLocations && (
        <div className="no-valid-locations-message">
          We don't have any sports in this location yet! Let us know if we are
          missing one <a href="/register-sport">HERE!</a>
        </div>
      )} */}

      <MapComponent sport={selectedSport} locations={searchLocations()} />

      <a href="/">Go back</a>
    </div>
  );
};

export default Map;
