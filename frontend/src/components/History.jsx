




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../axios/axios.js";

function Messagebox() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [doctors, setDoctors] = useState([]);

    // Fetch patients data
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await apiClient.get('/chat/allchat');
                console.log("API Response:", response.data);
                setDoctors(Array.isArray(response.data.chats) ? response.data.chats : []);
            } catch (error) {
                console.error("Error fetching the History:", error);
            }
        };
        fetchDoctors();
    }, []);

    // Filter patients based on search input
    const filteredDoctors = doctors.filter((doctor) =>
        doctor.usertwo?.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex justify-center items-center min-h-screen ml-64">
            <div className="w-3/4 p-6 bg-white rounded-lg shadow-lg">
                <input
                    type="text"
                    placeholder="Search Doctors..."
                    className="border rounded-md px-3 py-2 w-full mb-4"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredDoctors.map(({ _id, usertwo}) => (
                        <div key={_id} className="border p-4 rounded-lg shadow-sm bg-gray-50">
                            <h2 className="font-semibold text-lg">{usertwo?.name}</h2>
                            {/* <p className="text-sm text-gray-500">Specialization: {new Date(createdAt).toLocaleDateString()}</p> */}
                            <p className="text-sm text-gray-500">Joined at: {new Date(createdAt).toLocaleDateString()}</p> 

                           
                            <div className="flex flex-col gap-2 mt-3">
                            <button className="w-full px-4 py-2 text-center border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition"> 
                                    View Prescription
                                </button>
                                <button className="w-full px-4 py-2 text-center border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition">
                                    View Tests
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Messagebox;




