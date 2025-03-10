import { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SignIn from "@/views/dashboard/SignIn";
import DoctorDashboard from "@/layout/dashboardLayout";
 
import "./index.css";
import DoctorDashboards from "@/layout/doctordashboard";

const App = () => {
  return (
    <div className="w-full">
      <MainApp />
    </div>
  );
};

const MainApp = () => {
  const navigate = useNavigate();

  

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/SignIn" />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/dashboard/*" element={<DoctorDashboard />} />
        <Route path="/docdashboard/*" element={<DoctorDashboards />} />
      </Routes>
      <Toaster 
        position="top-center" 
        reverseOrder={false} 
        containerStyle={{ zIndex: 99999 }} 
      />
    </>
  );
};

export default App;
