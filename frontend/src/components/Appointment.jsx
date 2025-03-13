// Appointment.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./doctors.css";

const timeSlots = [
  "9:00 - 9:20", "9:20 - 9:40", "9:40 - 10:00", "10:00 - 10:20",
  "10:20 - 10:40", "10:40 - 11:00", "11:00 - 11:20", "11:20 - 11:40",
  "11:40 - 12:00", "12:00 - 12:20", "12:20 - 12:40", "12:40 - 1:00",
  "Lunch Break", 
  "2:00 - 2:20", "2:20 - 2:40", "2:40 - 3:00", "3:00 - 3:20",
  "3:20 - 3:40", "3:40 - 4:00", "4:00 - 4:20", "4:20 - 4:40",
  "4:40 - 5:00"
];

const generateAvailability = () => {
  return timeSlots.map(slot => ({
    time: slot,
    status: slot === "Lunch Break" ? "break" : (Math.random() > 0.5 ? "available" : "unavailable"),
  }));
};

const Appointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor;
  const [selectedDate, setSelectedDate] = useState("");
  const [schedule, setSchedule] = useState(generateAvailability());

  return (
    <div className="appointment-page">
      <h2>Book an Appointment with {doctor?.name}</h2>
      <input type="date" onChange={(e) => setSelectedDate(e.target.value)} className="date-picker" />
      
      {selectedDate && (
        <>
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Time Slot</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map(({ time, status }) => (
                <tr key={time} className={status}>
                  <td>{time}</td>
                  <td>{status === "break" ? "Lunch Break" : status === "available" ? "Available" : "Booked"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="legend">
            <span className="available"></span> Available
            <span className="unavailable"></span> Booked
          </div>
        </>
      )}

      <button onClick={() => navigate(-1)} className="back-btn">Go Back</button>
    </div>
  );
};

export default Appointment;
