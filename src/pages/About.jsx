import React from "react";
import "./styles/About.css"; // Create this CSS file for custom styles
import banner from "../assets/banner.jpeg";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <img
        src={banner}
        alt="Pick Up N’ Play Banner"
        className="about-us-banner"
      />

      <div className="about-us-content">
        {/* Main Title */}
        <h1>About Us</h1>

        {/* Description */}
        <p>
          Discover a world of fun and friendship. Connect with fellow sports
          enthusiasts, discover local leagues, and find your next game. Pick Up
          N’ Play takes the hassle out of finding sports and social activities.
          Simply sign up, choose your sport, and let the games begin!
        </p>

        {/* Tagline */}
        <p className="about-us-tagline">
          Pick Up N’ Play: Your City, Your Sport, Your Community.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
