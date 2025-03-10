


import { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SignIn from "@/views/dashboard/SignIn";
import DoctorDashboard from "@/layout/dashboardLayout";
// import "./index.css";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user-token")) {
      navigate("/SignIn");
    }
  }, []);

  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<Navigate to="/SignIn" />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/dashboard/*" element={<DoctorDashboard />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} containerStyle={{ zIndex: 99999 }} />
    </div>
  );
};

export default App;
