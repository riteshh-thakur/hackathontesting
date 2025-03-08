import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { MdSend } from "react-icons/md";

function Message() {
  const location = useLocation();
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState(location.state?.name||"paras");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    console.log(location.state?.name);
    
      if (patientName) {
        setMessages([
          { sender: "Patient", name: patientName, text: "Hello, I have a skin rash. Can you help?", time: "12:01 PM" },
          { sender: "Patient", name: patientName, text: "Should I schedule an appointment?", time: "12:02 PM" },
          { sender: "Doctor", name: "Doctor", text: "Sure! Please send me more details.", time: "12:03 PM" },
        ]);
      }
    }, [patientName]);
  
  return (
    <div>
    <div className=" mt-5 max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
           
          <button onClick={() =>  navigate(-1)} className="border px-3 py-1 text-green-600 rounded-md mb-4 hover:bg-green-100">
            ⬅ Back
          </button>
 
          <div className="border-b pb-4 mb-4">
            {messages.map((msg, index) => (
              <div key={index} className="mb-3">
                <p className="font-semibold">{msg.name}</p>
                <p className="text-gray-700">{msg.text}</p>
                <p className="text-sm text-gray-500">{msg.time}</p>
              </div>
            ))}
          </div>

        
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">{patientName}</h2>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center">
               Video Call
            </button>
          </div>

        
          <div>
            <label className="block font-semibold mb-1">Message Input Area</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="border rounded-md px-3 py-2 w-full"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                onClick={() => {
                  if (message.trim() !== "") {
                    setMessages([...messages, { sender: "Doctor", name: "Doctor", text: message, time: "12:04 PM" }]);
                    setMessage("");
                  }
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
               
 
             <MdSend />

              </button>
            </div>
          </div>

          
          <div className="mt-4 text-right">
            <button className="bg-green-100 text-green-700 px-4 py-2 rounded-md">
              Suggest Prescription
            </button>
            <button className=" ml-5 bg-green-100 text-green-700 px-4 py-2 rounded-md">
              Suggest test
            </button>
          </div>
        </div>
       
    </div>)}

export default Message
