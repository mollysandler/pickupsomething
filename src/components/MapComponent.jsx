import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import pinIconUrl from "../assets/pin.png";
import "leaflet/dist/leaflet.css"; // Import Leaflet's CSS

const MapComponent = ({ sport, locations }) => {
  const customIcon = new L.Icon({
    iconUrl: pinIconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const [pins, setPins] = useState([]);

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const response = await fetch("/pins.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Filter pins based on the selected sport and optional location search
        const filteredPins = data.filter((pin) => {
          const inSport =
            sport === "All" || pin.sport.toLowerCase() === sport.toLowerCase();

          // Check for location filtering only when the search term is not empty
          //   const inLocation =
          //     // sport !== "All" ||
          //     locations.length > 0 &&
          //     locations.some((location) => {
          //       console.log(location);
          //       return (
          //         pin.position[0] >= location.latRange[0] &&
          //         pin.position[0] <= location.latRange[1] &&
          //         pin.position[1] >= location.lngRange[0] &&
          //         pin.position[1] <= location.lngRange[1]
          //       );
          //     });

          // Return pins matching sport; if "All", return regardless of location
          return inSport;
          // && (sport !== "All" || (inLocation && locations.length > 0))
        });

        setPins(filteredPins);
      } catch (error) {
        console.error("Error fetching pin data:", error);
      }
    };

    fetchPins();
  }, [sport, locations]);

  return (
    <MapContainer
      center={[37.7749, -122.4194]} // Centered on the Bay Area
      zoom={9}
      style={{ height: "75vh", width: "80%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      {pins.map((pin, idx) => (
        <Marker key={idx} position={pin.position} icon={customIcon}>
          <Popup>
            <h3>Game: {pin.title}</h3>
            <p>General Information: {pin?.description}</p>
            <p>Main Contact: {pin?.contact}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
