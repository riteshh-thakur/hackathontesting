import React, { useState, useEffect } from "react";
import "./styles.css";

// Import your images
import bche from "../assets/bche.png";
import auntylogs from "../assets/auntylogs.png";
import chacha from "../assets/chacha.png";

const MainPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [restartKey, setRestartKey] = useState(0);
  const fullText = "Connecting Rural Himachal to E-Health Services";
  const images = [ auntylogs,bche,chacha];

  // Image Slider Effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Typing Effect That Repeats Every 4 Seconds
  useEffect(() => {
    let i = 0;
    setDisplayText(""); // Clear text before retyping
    const typingInterval = setInterval(() => {
      setDisplayText(fullText.substring(0, i + 1));
      i++;
      if (i > fullText.length) {
        clearInterval(typingInterval);
        setTimeout(() => setRestartKey((prevKey) => prevKey + 1), 4000); // Force restart
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [restartKey]); // Depend on restartKey to force re-run

  return (
    <div className="dashboard-container">
      {/* Image Slider with Centered Text */}
      <div className="image-slider" style={{ position: "relative" }}>
        <img
          src={images[currentImageIndex]}
          alt={`Slide ${currentImageIndex + 1}`}
          className="slider-image"
          style={{ width: "100%", height: "auto" }}
        />
        <h2 className="text-overlay typing-text">{displayText}</h2>
      </div>

      
       
    </div>
  );
};

export default MainPage;
