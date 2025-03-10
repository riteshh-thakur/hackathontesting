import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

function Schedule() {
  // Appointment data with date strings in 'YYYY-MM-DD' format
  const data = [
    { id: 1, name: "John Adam", date: "2025-03-11", time: "10:00 AM", status: "Confirmed" },
    { id: 2, name: "Sara Allen", date: "2024-02-10", time: "11:00 AM", status: "Pending" },
    { id: 3, name: "Alan Turner", date: "2025-03-11", time: "12:00 PM", status: "Cancelled" },
    { id: 4, name: "Brian Zhao", date: "2025-03-09", time: "1:00 PM", status: "Confirmed" },
    { id: 5, name: "Ashley Lopez", date: "2025-03-06", time: "2:00 PM", status: "Pending" },
  ];

  const [value, setValue] = useState(new Date());
  const [sched, setSched] = useState([]);

  useEffect(() => {
    // Convert selected date to 'YYYY-MM-DD' format manually
    const selectedDate = formatDate(value);
    console.log("Selected Date:", selectedDate);

    // Filter appointments that match the selected date
    const filteredAppointments = data.filter(item => item.date === selectedDate);
    
    setSched(filteredAppointments);
  }, [value]);

  // Function to format Date object to 'YYYY-MM-DD'
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2-digit month
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit day
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="p-8">
      <Calendar onChange={setValue} value={value} />
      
      <h2 className="text-lg font-bold mt-4">Selected Date: {value.toDateString()}</h2>

      <div className="mt-4">
        {sched.length > 0 ? (
          sched.map(({ id, name, time, status }) => (
            <div key={id} className="border p-3 mb-2 rounded-md shadow-md">
              <p className="font-medium">{name}</p>
              <p className="text-gray-600">{time}</p>
              <p className={`text-sm font-semibold ${status === "Cancelled" ? "text-red-500" : status === "Confirmed" ? "text-green-500" : "text-yellow-500"}`}>
                {status}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No appointments on this day.</p>
        )}
      </div>
    </div>
  );
}

export default Schedule;
