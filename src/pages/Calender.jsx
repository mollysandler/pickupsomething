import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { RRule } from "rrule";

const localizer = momentLocalizer(moment);
const generateRecurringEvents = (eventData) => {
  const recurringEvents = [];

  eventData.forEach((event) => {
    if (event.schedule && event.start && event.end) {
      // Parse the days from the schedule
      const daysMap = {
        Sunday: RRule.SU,
        Monday: RRule.MO,
        Tuesday: RRule.TU,
        Wednesday: RRule.WE,
        Thursday: RRule.TH,
        Friday: RRule.FR,
        Saturday: RRule.SA,
      };

      const scheduleDays = event.schedule.match(/\b(\w+days?)\b/g); // Extract days from the schedule string
      const days = scheduleDays
        ?.map((day) => daysMap[day.replace("s", "")])
        .filter(Boolean);

      if (days && days.length > 0) {
        // Create the recurrence rule
        const rule = new RRule({
          freq: RRule.WEEKLY,
          interval: 1,
          byweekday: days,
          dtstart: new Date(event.start),
          until: new Date("2025-05-31"), // Set an end date for recurrence
        });

        const dates = rule.all();

        // Generate events for each date in the recurrence
        dates.forEach((date) => {
          const start = new Date(date);
          const end = new Date(date);
          end.setHours(start.getHours() + 2); // Set duration (e.g., 2 hours)

          recurringEvents.push({
            title: `${event.sport}: ${event.title}`,
            start,
            end,
          });
        });
      }
    } else if (event.start && event.end) {
      // Handle non-recurring events
      recurringEvents.push({
        title: `${event.sport}: ${event.title}`,
        start: new Date(event.start),
        end: new Date(event.end),
      });
    }
  });

  return recurringEvents;
};

const SportsCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/pins.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Generate recurring events
        const formattedEvents = generateRecurringEvents(data);
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div style={{ height: "80vh", margin: "50px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
};

export default SportsCalendar;
