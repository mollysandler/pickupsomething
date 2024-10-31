import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./styles/About.css";

const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_tvcmfmh",
        "template_zaqaj4c", // Replace with your EmailJS template ID
        formData,
        "c84Nxe3wBTlfc1QQm" // Replace with your EmailJS user ID
      )
      .then(
        (result) => {
          console.log("Email successfully sent!", result.text);
          setMessage(
            "Thanks for signing up! You’ll receive our emails shortly."
          );
          setFormData({ name: "", email: "" });
        },
        (error) => {
          console.log("Error sending email", error.text);
          setMessage("Sorry, there was an issue. Please try again.");
        }
      );
  };

  return (
    <div className="about-page">
      <h1>About Us</h1>
      <div>
        <p>
          We’re passionate about helping people find the sports they love. Join
          our email list to stay updated! If there are new groups in the sports
          that you subscribe too, or new sports added overall, we will let you
          know!
        </p>
      </div>

      <div className="email-signup">
        <h2>Sign Up for Our Email List</h2>
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

          <button type="submit">Sign Up</button>
        </form>
        {message && <p className="form-message">{message}</p>}
      </div>
    </div>
  );
};

export default About;
