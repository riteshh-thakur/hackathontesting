// Doctors.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./doctors.css";
import doctor1 from "../assets/doctor1.jpg";
import doctor2 from "../assets/doctor2.jpg";
import doctor3 from "../assets/doctor3.jpg";

const doctors = [
  { id: 1, name: "Dr. Aryan Sharma", specialty: "Cardiologist", img: doctor1 },
  { id: 2, name: "Dr. Neha Verma", specialty: "Dermatologist", img: doctor2 },
  { id: 3, name: "Dr. Rohan Khanna", specialty: "Neurologist", img: doctor3 },
];

const Doctors = () => {
  const navigate = useNavigate();

  const handleAppointment = (doctor) => {
    navigate(`/appointment/${doctor.id}`, { state: { doctor } });
  };

  return (
    <div className="doctors-container">
      {doctors.map((doctor) => (
        <div className="doctor-card" key={doctor.id}>
          <div className="card-header">
            <img src={doctor.img} alt={doctor.name} className="doctor-img" />
          </div>
          <div className="card-body">
            <h3>{doctor.name}</h3>
            <p>{doctor.specialty}</p>
            <button onClick={() => handleAppointment(doctor)} className="appointment-btn">
              Book an Appointment
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Doctors;
