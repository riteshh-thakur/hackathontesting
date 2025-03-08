import React, { useState, useEffect } from "react";
import "./ProfileCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faTimes } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const defaultData = {
    name: "",dob: "",
    age: "",
    
    bloodGroup: "",
    location: "",
    image: null,
  };

  const [formData, setFormData] = useState({ ...defaultData });
  const [savedData, setSavedData] = useState(null);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedData"));
    console.log("useEffect: savedData from localStorage:", saved);
    if (saved) {
      setSavedData(saved);
      setFormData(saved); // Initialize formData with saved data
    }
  }, []);

  // Handle image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`handleChange: name=${name}, value=${value}`);

    // If the DOB field is changed, calculate the age
    if (name === "dob") {
      const dob = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();

      // Adjust age if the birthday hasn't occurred yet this year
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }

      // Update both dob and age in formData
      setFormData((prev) => ({
        ...prev,
        dob: value,
        age: age.toString(), // Convert age to string to match input type
      }));
    } else {
      // For all other fields, update normally
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Save data to localStorage and update savedData
  const handleSave = () => {
    setSavedData(formData); // Update savedData with the current formData
    localStorage.setItem("savedData", JSON.stringify(formData)); // Save to localStorage
  };

  // Revert formData to the last saved state (or default if no saved data)
  const handleCancel = () => {
    console.log("handleCancel clicked");
    if (savedData) {
      console.log("Reverting to savedData:", savedData);
      setFormData({ ...savedData }); // Revert to savedData
    } else {
      console.log("No savedData, reverting to default");
      setFormData({ ...defaultData }); // Revert to defaultData
    }
  };

  // Trigger file input when profile picture is clicked
  const handleProfileClick = () => {
    console.log("handleProfileClick called");
    document.getElementById("profileInput").click();
  };

  // Remove the profile image and reset image field
  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null })); // Only reset the image field
  };

  return (
    <div className="profile-container">
      {/* Left Card (Display Saved Data) */}
      <div className="card">
        <div className="circle-1"></div>
        <div className="circle-2"></div>
        <div className="circle-3"></div>
        <div className="circle-4"></div>
        <div className="circle-5"></div>
        <div className="circle-6"></div>

        <div className="profile-picture">
          <input
            type="file"
            accept="image/*"
            id="profileInput"
            onChange={handleImageChange}
            capture="user"
            style={{ display: "none" }}
          />
          <label htmlFor="profileInput" className="profile-picture-label">
            {formData.image ? (
              <div className="image-container">
                <img
                  src={formData.image}
                  alt="Profile"
                  onClick={handleProfileClick}
                  className="profile-image"
                />
                <button
                  className="remove-image-button"
                  onClick={handleRemoveImage}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ) : (
              <span className="camera-icon" onClick={handleProfileClick}>
                <FontAwesomeIcon icon={faCamera} />
              </span>
            )}
          </label>
        </div>
        <h2>Personal Information</h2>
        {savedData ? (
          <>
            <p>
              <b>Name:</b> {savedData.name}
            </p><p>
              <b>Date of Birth:</b> {savedData.dob}
            </p>
            <p>
              <b>Age:</b> {savedData.age}
            </p>
            
            <p>
              <b>Blood Group:</b> {savedData.bloodGroup}
            </p>
            <p>
              <b>Location:</b> {savedData.location}
            </p>
          </>
        ) : (
          <p>No details available. Please update your profile.</p>
        )}
      </div>

      {/* Right Card (Edit Form) */}
      <div className="card form-card">
        <div className="circle-1"></div>
        <div className="circle-2"></div>
        <div className="circle-3"></div>
        <div className="circle-4"></div>
        <div className="circle-5"></div>
        <div className="circle-6"></div>

        <h2>Edit Your Details</h2>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        /> <label>Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
       
        <label>Blood Group:</label>
        <input
          type="text"
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
        />
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        <div className="buttons">
          <button className="save" onClick={handleSave}>
            Save
          </button>
          <button className="cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;