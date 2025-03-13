import React, { useState } from "react";

const patients = [
  { name: "John Doe", id: "P12345", lastVisit: "2023-09-15" },
  { name: "Jane Smith", id: "P12346", lastVisit: "2023-09-12" },
  { name: "Alice Brown", id: "P12347", lastVisit: "2023-09-10" },
  { name: "Bob Johnson", id: "P12348", lastVisit: "2023-09-08" },
  { name: "Carol White", id: "P12349", lastVisit: "2023-09-05" },
  { name: "David Lee", id: "P12350", lastVisit: "2023-09-01" },
  { name: "Emily Clark", id: "P12351", lastVisit: "2023-08-30" },
  { name: "Frank Harris", id: "P12352", lastVisit: "2023-08-25" },
  { name: "Grace King", id: "P12353", lastVisit: "2023-08-20" },
  { name: "Henry Scott", id: "P12354", lastVisit: "2023-08-18" },
];

function Patient() {
  const [addPatients, setAddPatients] = useState(false);
  const [patientDetail, setPatientDetail] = useState(false);
  const [user, setUser] = useState({
    name: "",
    age: 1,
    bloodGroup: "O+",
    conditions: "Hypertension, Allergies",
    details: ["", "", "", "", ""],
  });

  const handleChange = (e) => {
    setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
  };

  const handleDetailChange = (index, value) => {
    setUser((prevUser) => {
      const newDetails = [...prevUser.details];
      newDetails[index] = value;
      return { ...prevUser, details: newDetails };
    });
  };

  return (
    <>
      {!addPatients && !patientDetail && (
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setAddPatients(true)}
              className="flex justify-end bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              + Add Patient
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {patients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                setPatientDetail={setPatientDetail}
                setUser={setUser}
              />
            ))}
          </div>
        </div>
      )}

      {addPatients && (
        <div>
          Add Patients
          <button className="bg-gray-400 rounded-lg" onClick={() => setAddPatients(false)}>
            Back
          </button>
        </div>
      )}

      {patientDetail && (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">HealthTrack - User Details</h1>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="mb-4">
              <label className="block text-gray-700">Patient's Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Patient's Age</label>
              <input
                type="number"
                name="age"
                min="1"
                value={user.age}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Blood Group</label>
              <input
                type="text"
                name="bloodGroup"
                value={user.bloodGroup}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Chronic Conditions</label>
              <textarea
                name="conditions"
                value={user.conditions}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
              ></textarea>
            </div>

            {user.details.map((detail, index) => (
              <div className="mb-2" key={index}>
                <input
                  type="text"
                  value={detail}
                  onChange={(e) => handleDetailChange(index, e.target.value)}
                  placeholder="Enter new detail"
                  className="w-full border p-2 rounded"
                />
              </div>
            ))}

            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  setPatientDetail(false);
                }}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setPatientDetail(false);
                  setUser((prevUser) => ({
                    ...prevUser,
                    details: prevUser.details.map(() => ""),
                  }));
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const PatientCard = ({ patient, setPatientDetail, setUser }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
      <h2 className="text-lg font-semibold">{patient.name}</h2>
      <p className="text-sm text-gray-600">ID: {patient.id}</p>
      <p className="text-sm text-gray-500">Last Visit: {patient.lastVisit}</p>
      <button
        onClick={() => {
          setUser((prevUser) => ({
            ...prevUser,
            name: patient.name,
          }));
          setPatientDetail(true);
        }}
        className="mt-2 bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 transition"
      >
        Details
      </button>
    </div>
  );
};

export default Patient;
