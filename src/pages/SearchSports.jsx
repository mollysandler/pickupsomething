import React, { useState, useEffect } from "react";
import "../index.css";
import sportsData from "../useful/sports.json";
import locData from "../useful/locations.json";

const SearchSports = () => {
  const [searchTermSports, setSearchTermSports] = useState("");
  const [filteredSports, setFilteredSports] = useState([]);

  const [searchTermTowns, setSearchTermTowns] = useState("");
  const [filteredTowns, setFilteredTowns] = useState([]);

  //search through sports
  useEffect(() => {
    const filtered = sportsData.filter((sport) =>
      sport.name.toLowerCase().includes(searchTermSports.toLowerCase())
    );
    setFilteredSports(filtered);
  }, [searchTermSports]);

  //search through towns
  useEffect(() => {
    const filtered = locData.filter((loc) =>
      loc.town.toLowerCase().includes(searchTermTowns.toLowerCase())
    );
    setFilteredTowns(filtered);
  }, [searchTermTowns]);

  useEffect(() => {
    //filter sports based on the search term
    const filtered = sportsData.filter((sport) =>
      sport.name.toLowerCase().includes(searchTermTowns.toLowerCase())
    );
    setFilteredSports(filtered);
  }, [searchTermTowns]);

  useEffect(() => {
    //filter towns based on the search term
    const filtered = locData.filter((loc) =>
      loc.town.toLowerCase().includes(searchTermTowns.toLowerCase())
    );
    setFilteredTowns(filtered);
  }, [searchTermTowns]);

  return (
    <div className="container">
      <h2>Searching For Sports</h2>
      <p>Wanna play a sport in your area?</p>
      <input
        type="text"
        placeholder="Search for a sport..."
        value={searchTermSports}
        onChange={(e) => setSearchTermSports(e.target.value)}
        className="search-bar" // Optional: add a CSS class for styling
      />

      <h3>Available Sports:</h3>
      <ul>
        {filteredSports.map((sport, index) => (
          <li key={index}>{sport.name}</li>
        ))}
      </ul>

      <p>Where do you live?</p>
      <input
        type="text"
        placeholder="Search for a town..."
        value={searchTermTowns}
        onChange={(e) => setSearchTermTowns(e.target.value)}
        className="search-bar" // Optional: add a CSS class for styling
      />

      <h3>Available Towns:</h3>
      <ul>
        {filteredTowns.map((loc, index) => (
          <li key={index}>{loc.town}</li>
        ))}
      </ul>

      <a href="/">Go back</a>
    </div>
  );
};

export default SearchSports;
