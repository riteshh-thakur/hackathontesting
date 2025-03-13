import React, { useState } from 'react';

const Appointments = () => {
  const [appointments,setappointment] = useState([
    { id: 1, name: "John Adam", date: "Thu, 09 Feb 2024", time: "10:00 AM", status: "Confirmed" },
    { id: 2, name: "Sara Allen", date: "Fri, 10 Feb 2024", time: "11:00 AM", status: "Pending" },
    { id: 3, name: "Alan Turner", date: "Sat, 11 Feb 2024", time: "12:00 PM", status: "Cancelled" },
    { id: 4, name: "Brian Zhao", date: "Sun, 12 Feb 2024", time: "1:00 PM", status: "Confirmed" },
    { id: 5, name: "Ashley Lopez", date: "Mon, 13 Feb 2024", time: "2:00 PM", status: "Pending" },
  ]);
  
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredAppointments = appointments.filter(appt => {
    return (filter === "All" || appt.status === filter) &&
           appt.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Filters and Search */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        {["All", "Cancelled", "Pending", "Confirmed"].map(status => (
          <button
            key={status}
            className={`px-4 py-2 rounded-md text-sm font-semibold ${
              filter === status ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
        <input
          type="text"
          placeholder="Search appointments..."
          className="border rounded-md px-3 py-2 w-48"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Appointments List */}
      <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
      <div className="bg-white p-4 shadow-md rounded-md">
        {filteredAppointments.length ? (
          filteredAppointments.map(({ id, name, date, time, status }) => (
            <div key={id} className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-medium">{name}</p>
                <p className="text-sm text-gray-500">{date}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-800">{time}</p>
                <p className={`text-sm font-semibold ${
                  status === "Cancelled" ? "text-red-500" :
                  status === "Confirmed" ? "text-green-500" :
                  "text-yellow-500"
                }`}>
                  {status}
                 { status=='Pending'&&
                  <button onClick={()=>{
                  setappointment(appointments.map(appointment=>appointment.id===id?{...appointment,status:'Confirmed'}:appointment))
                  }}  className="bg-green-500 ml-2 text-white px-4 py-1 rounded-md hover:bg-green-600 transition">
                    confirm
</button>
                  }
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No appointments found.</p>
        )}
      </div>

     
    </div>
  );
};

export default Appointments;
