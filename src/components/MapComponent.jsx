import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import pinIconUrl from "../assets/pin.png";
import "leaflet/dist/leaflet.css";

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

        // Filter pins based on the selected sport
        const filteredPins = data.filter(
          (pin) =>
            sport === "All" || pin.sport.toLowerCase() === sport.toLowerCase()
        );

        setPins(filteredPins);
      } catch (error) {
        console.error("Error fetching pin data:", error);
      }
    };

    fetchPins();
  }, [sport]);

  const handleMarkerClick = (pin) => {
    const map = useMap(); // Using useMap instead of mapRef
    if (map) {
      map.setView(pin.position, 12, { animate: true });
    }
  };

  return (
    <MapContainer
      center={[35.2828, -120.6596]} // Centered on San Luis Obispo
      zoom={8}
      style={{ height: "75vh", width: "80%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      {pins.map((pin, idx) => (
        <Marker
          key={idx}
          position={pin.position}
          icon={customIcon}
          eventHandlers={{
            click: () => handleMarkerClick(pin),
          }}
        >
          <Popup>
            <div
              style={{
                textAlign: "left",
                fontSize: "0.85rem",
                whiteSpace: "normal",
                wordWrap: "break-word",
              }}
            >
              <h3 style={{ fontSize: "1rem", margin: "0 0 0.5rem 0" }}>
                {pin.title}
              </h3>
              <p>
                <strong>Description:</strong> {pin.description}
              </p>
              <p>
                <strong>Organizer Name:</strong> {pin.contact?.name}
              </p>
              {pin.contact?.email && (
                <p>
                  <strong>Contact:</strong>{" "}
                  <a href={`mailto:${pin.contact?.email}`}>
                    {pin.contact?.email}
                  </a>
                </p>
              )}
              {pin.contact?.website && (
                <p>
                  <strong>Website:</strong>{" "}
                  <a
                    href={pin.contact?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {pin.contact?.website}
                  </a>
                </p>
              )}
              {pin.contact?.mailingList && (
                <p>
                  <strong>Mailing List:</strong>{" "}
                  <a
                    href={pin.contact.mailingList}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {pin.contact.mailingList}
                  </a>
                </p>
              )}
              <p>
                <strong>Schedule:</strong> {pin.schedule}
              </p>
              <p>
                <strong>Last Updated:</strong> {pin.lastUpdated}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
