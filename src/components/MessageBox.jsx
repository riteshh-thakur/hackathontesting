import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const doctors = [
  { id: 1, name: "Dr. John Doe", specialization: "Cardiologist", message: "Your blood pressure seems stable." },
  { id: 2, name: "Dr. Emily Clark", specialization: "Dermatologist", message: "Please avoid direct sunlight for faster recovery." },
  { id: 3, name: "Dr. Michael Smith", specialization: "Pediatrician", message: "Ensure your child gets plenty of rest." },
  { id: 4, name: "Dr. Sophia Johnson", specialization: "Neurologist", message: "Don't forget your MRI scan appointment." },
  { id: 5, name: "Dr. Liam Brown", specialization: "Nutritionist", message: "Consider adding more fiber to your diet." },
  { id: 6, name: "Dr. Olivia Martinez", specialization: "Psychiatrist", message: "Try mindfulness exercises for anxiety relief." },
];

function Messagebox() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [doctorName, setDoctorName] = useState("");

  // Filter doctors based on search input
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-green-700 text-white p-4 mt-[5vh] ml-[-2vw]">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
       
      </div>

      {/* Main Content */}
      <div className=" mt-10   p-6 bg-white w-3/4">
        <h1 className="text-2xl font-bold text-green-700 mb-4"></h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search doctors..."
          className="border rounded-md px-3 py-2 w-full mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDoctors.map(({ id, name, specialization, message }) => (
            <div key={id} className="border p-4 rounded-lg shadow-sm bg-white">
              <h2 className="font-semibold text-lg">{name}</h2>
              <p className="text-sm text-gray-500">Specialization: {specialization}</p>
              <p className="text-gray-700 mt-1 text-sm">Message: "{message}"</p>

              {/* View Chat Button */}
              <button
                onClick={() => {
                  setDoctorName(name);
                  navigate("/messagebox/message", { state: { name } });
                }}
                className="mt-3 px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition"
              >
                Chat with Doctor
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Messagebox;