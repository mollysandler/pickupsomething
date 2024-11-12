import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import "./styles/formStyles.css";
import sportsData from "../../public/sports.json"; // Import the sports data

const RegisterSport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    sport: "",
    mainContact: "",
    message: "",
  });
  const [message, setMessage] = useState("");
  const [sports, setSports] = useState([]);

  useEffect(() => {
    setSports(sportsData);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_95tyieb",
        "template_q5nx3bs", // Replace with your EmailJS template ID
        formData,
        "c84Nxe3wBTlfc1QQm" // Replace with your EmailJS user ID
      )
      .then(
        (result) => {
          console.log("Email successfully sent!", result.text);
          setMessage(
            "Thanks for letting us know about this location! You should see it on our site shortly."
          );
          setFormData({
            name: "",
            email: "",
            location: "",
            sport: "",
            mainContact: "",
            message: "",
          });
        },
        (error) => {
          console.log("Error sending email", error.text);
          setMessage("Sorry, there was an issue. Please try again.");
        }
      );
  };

  return (
    <div className="about-page">
      <h2>Register Your Sport</h2>

      <p>
        We’re passionate about helping people find the sports they love. If
        we're missing a location, please let us know! You should see it
        reflected on our site shortly.
      </p>

      <div className="email-signup">
        <form onSubmit={handleSubmit} className="signup-form">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <label htmlFor="sport">Sport:</label>
          <select
            id="sport"
            name="sport"
            value={formData.sport}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a sport
            </option>
            {sports.map((sport, index) => (
              <option key={index} value={sport.name}>
                {sport.name}
              </option>
            ))}
          </select>
          <label htmlFor="mainContact">Main Contact:</label>
          <input
            type="text"
            id="mainContact"
            name="mainContact"
            value={formData.mainContact}
            onChange={handleChange}
          />
          <label htmlFor="message">General Information:</label>
          <input
            type="text"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>
        {message && <p className="form-message">{message}</p>}
      </div>
    </div>
  );
};

export default RegisterSport;
