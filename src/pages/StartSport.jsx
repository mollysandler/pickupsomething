import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./styles/formStyles.css";

const StartSport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    sport: "",
    mainContact: "",
    message: "",
  });
  const [message, setMessage] = useState("");

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
      <h2>Request A Sport</h2>

      <p>
        We’re passionate about helping people find the sports they love. If you
        want a sport that we don't have, please let us know here and we will add
        some information on it as soon as possible!
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
          <input
            type="text"
            id="sport"
            name="sport"
            value={formData.sport}
            onChange={handleChange}
            required
          />

          <button type="submit">Request</button>
        </form>
        {message && <p className="form-message">{message}</p>}
      </div>
    </div>
  );
};

export default StartSport;
