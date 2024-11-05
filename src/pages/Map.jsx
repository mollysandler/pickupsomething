import { useState, useEffect, Flex } from "react";
import MapComponent from "../components/MapComponent";
import locationsData from "../useful/locations.json"; // Adjust the path as needed
import MyLocation from "../components/MyLocation"; // Import the new component

import "./styles/Map.css";

const sports = [
  "Pickleball",
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
  const [starredSports, setStarredSports] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  const searchLocations = () => {
    if (!searchTerm && selectedSport === "All") return locations;

    return locations.filter((location) => {
      const townMatch = location.town
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      if (selectedSport === "All") {
        return townMatch;
      }

      return townMatch && location.sport === selectedSport;
    });
  };

  useEffect(() => {
    const validLocations = searchLocations().length > 0;
    setNoValidLocations(!validLocations);
  }, [selectedSport, searchTerm]);

  const toggleStarSport = (sport) => {
    setStarredSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );
  };

  // Sort sports, placing starred ones at the front
  const sortedSports = [
    ...starredSports,
    ...sports.filter((sport) => !starredSports.includes(sport)),
  ];

  return (
    <div className="container">
      <h2>Check out our sports!</h2>
      <div style={{ display: "flex", alignItems: "center", marginTop: "2px" }}>
        <input
          type="text"
          placeholder="Search for a location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px", // Keep padding consistent
            width: "200px",
            marginRight: "10px", // Space between input and button
            height: "40px", // Set height to ensure consistent size
          }}
        />
        <MyLocation onSetLocation={setCurrentLocation} />
      </div>

      {/* Use the new component */}
      <div className="tabs">
        {sortedSports.map((sport, index) => (
          <button
            key={index}
            className={`tab-button ${selectedSport === sport ? "active" : ""}`}
            onClick={() => setSelectedSport(sport)}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              backgroundColor: selectedSport === sport ? "#87CEFA" : "#ADD8E6", // Light blue background
              color: "#000", // Black text for contrast
              border: "none",
              borderRadius: "5px",
              padding: "10px 15px",
              cursor: "pointer",
              margin: "5px",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "5px",
                left: "5px",
                cursor: "pointer",
                fontSize: "18px",
                color: starredSports.includes(sport) ? "#FFD700" : "#000", // Yellow for filled star, black for empty
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => {
                if (!starredSports.includes(sport)) {
                  e.target.style.color = "#FFFACD"; // Light yellow on hover
                }
              }}
              onMouseLeave={(e) => {
                if (!starredSports.includes(sport)) {
                  e.target.style.color = "#000"; // Revert to black
                }
              }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent button click
                toggleStarSport(sport);
              }}
            >
              {starredSports.includes(sport) ? "★" : "☆"} {/* Star Icon */}
            </span>
            <span style={{ marginLeft: "20px" }}>{sport}</span>
          </button>
        ))}
        <button
          className={`tab-button ${selectedSport === "All" ? "active" : ""}`}
          onClick={() => setSelectedSport("All")}
          style={{
            backgroundColor: selectedSport === "All" ? "#87CEFA" : "#ADD8E6", // Light blue background
            color: "#000", // Black text for contrast
            border: "none",
            borderRadius: "5px",
            padding: "10px 15px",
            cursor: "pointer",
            margin: "5px",
          }}
        >
          All
        </button>
      </div>
      <MapComponent
        sport={selectedSport}
        locations={searchLocations()}
        currentLocation={currentLocation} // Pass the current location to the map
      />
    </div>
  );
};

export default Map;
