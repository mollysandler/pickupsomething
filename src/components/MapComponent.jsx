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

        // Filter pins based on the selected sport and optional location search
        const filteredPins = data.filter((pin) => {
          const inSport =
            sport === "All" || pin.sport.toLowerCase() === sport.toLowerCase();
          return inSport;
        });

        setPins(filteredPins);
      } catch (error) {
        console.error("Error fetching pin data:", error);
      }
    };

    fetchPins();
  }, [sport, locations]);

  // Custom component to handle zoom on click
  const ZoomToMarker = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(position, 12, { animate: true }); // Adjust zoom level as needed
    }, [map, position]);

    return null;
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
            click: () => {
              // This will zoom to the marker position when clicked
              setPins((currentPins) =>
                currentPins.map((currentPin, i) =>
                  i === idx
                    ? { ...currentPin, isZoomed: true }
                    : { ...currentPin, isZoomed: false }
                )
              );
            },
          }}
        >
          <Popup>
            <div style={{ textAlign: "left" }}>
              <h3>{pin.title}</h3>
              <p>
                <strong>Description:</strong> {pin.description}
              </p>
              <p>
                <strong>Contact Name:</strong> {pin.contact?.name}
              </p>
              {pin.contact?.email && (
                <p>
                  <strong>Email:</strong>{" "}
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
          {pin.isZoomed && <ZoomToMarker position={pin.position} />}
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
