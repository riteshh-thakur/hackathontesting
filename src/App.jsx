



import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "@/layout/dashboardLayout";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user-token")) {
      navigate("/dashboard");
    } else {
      navigate("/dashboard");
    }
  }, []);
  return (
    <div className="w-full">
      <Routes>
  
        
        <Route path="/dashboard/*" element={<DashboardLayout />} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{ zIndex: 99999 }}
      />
    </div>
  );
};

export default App;