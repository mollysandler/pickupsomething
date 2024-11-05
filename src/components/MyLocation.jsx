import React from "react";

const MyLocation = ({ onSetLocation }) => {
  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onSetLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(
            "Could not get your location. Please enable location services."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <button
      onClick={handleUseMyLocation}
      style={{
        padding: "5px 15px", // Adjusted padding to match input height
        marginTop: "0", // Removed margin to align with input
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center", // Ensures text is vertically centered
      }}
    >
      Use My Current Location
    </button>
  );
};

export default MyLocation;
