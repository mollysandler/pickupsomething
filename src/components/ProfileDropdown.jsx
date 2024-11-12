import { useState } from "react";
import "./styles/navBar.css";
import prof from "../assets/profile.png";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState("Enter your name");
  const [pronouns, setPronouns] = useState("Enter your pronouns");
  const [bio, setBio] = useState("Enter your bio");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleImageDelete = () => {
    setProfilePic(null); // Reset profile picture when deleting
  };

  const handleSave = () => {
    // Save the data (could be an API call or storing in a global state)
    console.log("Profile saved:", { name, pronouns, bio, profilePic });
    setIsOpen(false);
  };

  const imageStyles = {
    width: "30px", // Replace with desired width
    height: "30px", // Replace with desired height
    borderRadius: "50%", // Ensures the image is circular
    objectFit: "cover", // Ensures the image scales properly within the container
  };

  return (
    <div className="profile-dropdown-container">
      <div className="profile-logo" onClick={toggleDropdown}>
        {/* Use the uploaded profile picture if it exists, otherwise use the default */}
        <img
          src={profilePic || prof}
          alt="Profile"
          style={imageStyles} // Apply consistent size constraints
        />
      </div>
      {isOpen && (
        <div className={`dropdown-content ${isOpen ? "open" : ""}`}>
          <div className="dropdown-header">
            <h3>Edit Profile</h3>
            <button onClick={toggleDropdown}>X</button>
          </div>
          <div className="profile-picture-upload">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {profilePic && (
              <div>
                <img
                  src={profilePic}
                  alt="Uploaded Profile"
                  className="uploaded-profile-pic"
                  style={imageStyles} // Apply same constraints to the uploaded image
                />
                <button onClick={handleImageDelete} className="delete-btn">
                  Delete Picture
                </button>
              </div>
            )}
          </div>
          <div className="profile-info">
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Pronouns:</label>
              <input
                type="text"
                value={pronouns}
                onChange={(e) => setPronouns(e.target.value)}
              />
            </div>
            <div>
              <label>Bio:</label>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>
          </div>
          <div className="save-btn-container">
            <button onClick={handleSave} className="save-btn">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
