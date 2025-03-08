import React, { useState, useEffect } from "react";
 import { Navigate } from "react-router-dom";
 import { useNavigate } from "react-router-dom";
const patients = [
  { id: 1, name: "John Doe", appointment: "Oct 20", message: "Feeling better with the new medication." },
  { id: 2, name: "Emily Clark", appointment: "Nov 2", message: "Can we reschedule the appointment?" },
  { id: 3, name: "Michael Smith", appointment: "Oct 25", message: "Experiencing mild side effects." },
  { id: 4, name: "Sophia Johnson", appointment: "Nov 10", message: "Thanks for the quick response!" },
  { id: 5, name: "Liam Brown", appointment: "Oct 28", message: "Need advice on diet changes." },
  { id: 6, name: "Olivia Martinez", appointment: "Nov 5", message: "Blood pressure is stable.", prescription: "Take meds twice daily." },
];

function Messagebox() {
  const navigate=useNavigate();
  const [search, setSearch] = useState("");
  const [patientName, setPatientName] = useState("");
  

  // Filter patients based on search input
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  );

  // Load chat messages for selected patient
   

  return (
    <div>
      
        <div className="max-w-5xl mx-auto p-6">
          <h1 className="text-2xl font-bold text-green-700 mb-4">HealthConnect</h1>

       
          <input
            type="text"
            placeholder="Search patients..."
            className="border rounded-md px-3 py-2 w-full mb-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

       
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPatients.map(({ id, name, appointment, message, prescription }) => (
              <div key={id} className="border p-4 rounded-lg shadow-sm bg-white">
                <h2 className="font-semibold text-lg">{name}</h2>
                <p className="text-sm text-gray-500">Next appointment: {appointment}</p>
                <p className="text-gray-700 mt-1 text-sm">Last message: "{message}"</p>
 
                <button
                  onClick={() => {
                    setPatientName(name);
                    navigate("/message", { state: { name } });

                    setChat(true);
                  }}
                  className="mt-3 px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition"
                >
                  View Chat
                </button>

                {/* View Prescription Button */}
                {prescription && (
                  <button className="mt-3 ml-3 px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition">
                    View Prescription
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
       
      
    </div>
  );
}

export default Messagebox;
