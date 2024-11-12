import { useState, useEffect } from "react";
import "./styles/navBar.css";
import prof from "../assets/profile.png";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState("Enter your name");
  const [pronouns, setPronouns] = useState("Enter your pronouns");
  const [bio, setBio] = useState("Enter your bio");

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("profile"));
    if (storedProfile) {
      setName(storedProfile.name);
      setPronouns(storedProfile.pronouns);
      setBio(storedProfile.bio);
      setProfilePic(storedProfile.profilePic);
    }
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePic(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setProfilePic(null);
  };

  const handleSave = () => {
    const profileData = { name, pronouns, bio, profilePic };
    localStorage.setItem("profile", JSON.stringify(profileData));
    console.log("Profile saved to localStorage:", profileData);
    setIsOpen(false);
  };

  const imageStyles = {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    objectFit: "cover",
  };

  return (
    <div className="profile-dropdown-container">
      <div className="profile-logo" onClick={toggleDropdown}>
        <img src={profilePic || prof} alt="Profile" style={imageStyles} />
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
                  style={imageStyles}
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
