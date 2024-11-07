import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { RRule } from "rrule";
import "./styles/SportsCalendar.css"; // Import your custom styles

const localizer = momentLocalizer(moment);

const generateRecurringEvents = (eventData) => {
  const recurringEvents = [];

  eventData.forEach((event) => {
    if (event.schedule && event.start && event.end) {
      const daysMap = {
        Sunday: RRule.SU,
        Monday: RRule.MO,
        Tuesday: RRule.TU,
        Wednesday: RRule.WE,
        Thursday: RRule.TH,
        Friday: RRule.FR,
        Saturday: RRule.SA,
      };

      const scheduleDays = event.schedule.match(/\b(\w+days?)\b/g);
      const days = scheduleDays
        ?.map((day) => daysMap[day.replace("s", "")])
        .filter(Boolean);

      if (days && days.length > 0) {
        const rule = new RRule({
          freq: RRule.WEEKLY,
          interval: 1,
          byweekday: days,
          dtstart: new Date(event.start),
          until: new Date("2025-05-31"),
        });

        const dates = rule.all();

        dates.forEach((date) => {
          const start = new Date(date);
          const end = new Date(date);
          end.setHours(end.getHours() - start.getHours());

          recurringEvents.push({
            id: event.id,
            title: `${event.sport}: ${event.title}`,
            start,
            end,
            description: event.description,
            sport: event.sport,
            location: event.location,
            schedule: event.schedule,
            color: event.color || "blue",
          });
        });
      }
    } else if (event.start && event.end) {
      recurringEvents.push({
        id: event.id,
        title: `${event.sport}: ${event.title}`,
        start: new Date(event.start),
        end: new Date(event.end),
        description: event.description,
        sport: event.sport,
        location: event.location,
        schedule: event.schedule,
        color: event.color || "blue",
      });
    }
  });

  return recurringEvents;
};

const SportsCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [personalCalendarEvents, setPersonalCalendarEvents] = useState([]); // State to hold saved events
  const [activeTab, setActiveTab] = useState("all"); // Track active tab (All Events vs Personal Calendar)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/pins.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const formattedEvents = generateRecurringEvents(data);
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    // Load personal calendar events from localStorage on page load
    const savedEvents =
      JSON.parse(localStorage.getItem("personalCalendarEvents")) || [];
    setPersonalCalendarEvents(savedEvents);
  }, []);

  const handleEventClick = (event, e) => {
    const rect = e.target.getBoundingClientRect();
    setPopupPosition({
      top: rect.top + window.scrollY - 50,
      left: rect.left + window.scrollX + rect.width + 10,
    });
    setSelectedEvent(event);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  const handleSaveEvent = () => {
    if (selectedEvent) {
      const updatedEvents = [...personalCalendarEvents, selectedEvent];
      setPersonalCalendarEvents(updatedEvents);
      localStorage.setItem(
        "personalCalendarEvents",
        JSON.stringify(updatedEvents)
      ); // Save to localStorage
      setSelectedEvent(null); // Close the popup after saving
    }
  };

  const handleDeleteEvent = (eventId) => {
    // Ensure the eventId is correctly passed as a string or number to uniquely identify the event
    console.log("Deleting event with ID:", eventId); // Debugging to check the eventId
    const updatedEvents = personalCalendarEvents.filter(
      (event) => event.id !== eventId
    );
    setPersonalCalendarEvents(updatedEvents);
    localStorage.setItem(
      "personalCalendarEvents",
      JSON.stringify(updatedEvents)
    ); // Update in localStorage
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const eventStyleGetter = (event) => {
    const backgroundColor = event.color || "blue"; // Default to blue if no color attribute
    return {
      style: {
        backgroundColor: backgroundColor, // Set the background color for the event
        color: "white", // Set the text color to white for contrast
      },
    };
  };

  return (
    <div style={{ height: "80vh", margin: "50px" }}>
      <div className="tabs">
        <button
          onClick={() => handleTabChange("all")}
          className={activeTab === "all" ? "active" : ""}
        >
          All Events
        </button>
        <button
          onClick={() => handleTabChange("personal")}
          className={activeTab === "personal" ? "active" : ""}
        >
          Personal Calendar
        </button>
      </div>

      <Calendar
        localizer={localizer}
        events={activeTab === "all" ? events : personalCalendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%", width: "100%" }}
        onSelectEvent={handleEventClick}
        eventPropGetter={eventStyleGetter} // Apply custom styles
      />

      {/* Small Pop-up with Event Details */}
      {selectedEvent && (
        <div
          className="popup"
          style={{
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`,
          }}
        >
          <div className="popup-header">
            <h5>{selectedEvent.title}</h5>
            <button className="close-btn" onClick={handleClosePopup}>
              X
            </button>
          </div>
          <div className="popup-body">
            <p>
              <strong>Sport:</strong> {selectedEvent.sport}
            </p>
            <p>
              <strong>Description:</strong> {selectedEvent.description}
            </p>
            <p>
              <strong>Location:</strong> {selectedEvent.location.latitude},{" "}
              {selectedEvent.location.longitude}
            </p>
            <p>
              <strong>Schedule:</strong> {selectedEvent.schedule}
            </p>
            <p>
              <strong>Start Time:</strong>{" "}
              {moment(selectedEvent.start).format("MMMM Do YYYY, h:mm a")}
            </p>
            <p>
              <strong>End Time:</strong>{" "}
              {moment(selectedEvent.end).format("MMMM Do YYYY, h:mm a")}
            </p>
          </div>
          <div className="popup-footer">
            <button onClick={handleSaveEvent}>Save to Personal Calendar</button>
          </div>
        </div>
      )}

      {/* Personal Calendar Events with Delete Option */}
      {activeTab === "personal" && (
        <div className="personal-calendar">
          <h3>Your Personal Calendar</h3>
          <ul>
            {personalCalendarEvents.map((event) => (
              <li key={event.id}>
                <div>
                  <strong>{event.title}</strong> -{" "}
                  {moment(event.start).format("MMMM Do YYYY, h:mm a")} to{" "}
                  {moment(event.end).format("MMMM Do YYYY, h:mm a")}
                </div>
                <button onClick={() => handleDeleteEvent(event.id)}>
                  Delete from Calendar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SportsCalendar;
