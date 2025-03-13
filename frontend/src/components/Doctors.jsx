


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserMd } from "react-icons/fa"; // ✅ React doctor icon
import "./doctors.css";

const Doctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_API_URL}/api/doctors`;
        console.log("Fetching doctors from:", apiUrl);

        const response = await axios.get(apiUrl);
        console.log("API Response:", response.data);

        // ✅ Correct response structure check
        if (response.data.success && Array.isArray(response.data.data)) {
          setDoctors(response.data.data);
        } else {
          throw new Error("Unexpected API response structure");
        }
      } catch (err) {
        setError("Error fetching doctors. Please try again later.");
        console.error("Error fetching doctors:", err.message, err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleAppointment = (doctor) => {
    navigate(`/appointment/${doctor._id}`, { state: { doctor } });
  };



  if (loading) return <p>Loading doctors...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="doctors-container">
      {doctors.length > 0 ? (
        doctors.map((doctor) => (
          <div className="doctor-card" key={doctor._id}>
            <div className="card-header">
              <FaUserMd size={50} color="#007bff" /> {/* ✅ React icon instead of image */}
            </div>
            <div className="card-body">
              <h3>{doctor.name}</h3>
              <p>Experience: {doctor.experience} years</p>
              <p>Licence: {doctor.licence}</p>
              <p>Specialization: {doctor.specialization}</p>
              <button onClick={() => handleAppointment(doctor)} className="appointment-btn">
                Book an Appointment
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No doctors available.</p>
      )}
    </div>
  );
};

export default Doctors;

