import React, { useState, useEffect } from "react";
import "./styles/searchsports.css"; // Ensure this file contains your custom styles
import sportsData from "../useful/sports.json";
import locData from "../useful/locations.json";

const SearchSports = () => {
  const [searchTermSports, setSearchTermSports] = useState("");
  const [filteredSports, setFilteredSports] = useState([]);
  const [searchTermTowns, setSearchTermTowns] = useState("");
  const [filteredTowns, setFilteredTowns] = useState([]);

  // Search through sports
  useEffect(() => {
    const filtered = sportsData.filter((sport) =>
      sport.name.toLowerCase().includes(searchTermSports.toLowerCase())
    );
    setFilteredSports(filtered);
  }, [searchTermSports]);

  // Search through towns
  useEffect(() => {
    const filtered = locData.filter((loc) =>
      loc.town.toLowerCase().includes(searchTermTowns.toLowerCase())
    );
    setFilteredTowns(filtered);
  }, [searchTermTowns]);

  return (
    <div className="container">
      <h2>Searching For Sports</h2>
      <p>Wanna play a sport in your area?</p>

      <div className="search-container">
        <div className="search-box">
          <h3>Sports:</h3>
          <input
            type="text"
            placeholder="Search for a sport..."
            value={searchTermSports}
            onChange={(e) => setSearchTermSports(e.target.value)}
            className="search-bar"
          />
          <h3>Available Sports:</h3>
          <ul className="results-list">
            {filteredSports.map((sport, index) => (
              <li key={index} className="result-item">
                {sport.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="search-box">
          <h3>Towns:</h3>
          <input
            type="text"
            placeholder="Search for a town..."
            value={searchTermTowns}
            onChange={(e) => setSearchTermTowns(e.target.value)}
            className="search-bar"
          />
          <h3>Available Towns:</h3>
          <ul className="results-list">
            {filteredTowns.map((loc, index) => (
              <li key={index} className="result-item">
                {loc.town}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <a href="/">Go back</a>
    </div>
  );
};

export default SearchSports;
