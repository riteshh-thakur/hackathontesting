



<<<<<<< HEAD
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
=======
// import { useEffect } from "react";
// import { Route, Routes, useNavigate } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import DashboardLayout from "@/layout/dashboardLayout";

// const App = () => {
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (localStorage.getItem("user-token")) {
//       navigate("/dashboard");
//     } else {
//       navigate("/dashboard");
//     }
//   }, []);
//   return (
//     <div className="w-full">
//       <Routes>
  
        
//         <Route path="/dashboard/*" element={<DashboardLayout />} />
//       </Routes>
//       <Toaster
//         position="top-center"
//         reverseOrder={false}
//         containerStyle={{ zIndex: 99999 }}
//       />
//     </div>
//   );
// };

// export default App;

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './index.css'
// import SignIn from './SignIn'

// function App() {
//   return (
//     <>    
//     <SignIn/>
//     </>
//   )
// }

// export default App


// import { useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// // import DashboardLayout from "@/layout/dashboardLayout";
// import SignIn from "@/views/dashboard/SignIn";
// import "./index.css";

// const App = () => {
//   return (
//     <Router>
//       <MainApp />
//     </Router>
//   );
// };

// const MainApp = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (localStorage.getItem("user-token")) {
//       navigate("/SignIn");
//     }
//   }, []);

//   return (
//     <div className="w-full">
//       <Routes>
//         <Route path="/SignIn" element={<SignIn />} />
//         {/* <Route path="/dashboard/*" element={<DashboardLayout />} /> */}
//       </Routes>
//       <Toaster position="top-center" reverseOrder={false} containerStyle={{ zIndex: 99999 }} />
//     </div>
//   );
// };

// export default App;


// import { useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import SignIn from "@/views/dashboard/SignIn";
// import "./index.css";

// const App = () => {
//   return (
//     <Router>
//       <MainApp />
//     </Router>
//   );
// };

// const MainApp = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!localStorage.getItem("user-token")) {
//       navigate("/SignIn");
//     }
//   }, []);

//   return (
//     <div className="w-full">
//       <Routes>
//         <Route path="/" element={<Navigate to="/SignIn" />} />
//         <Route path="/SignIn" element={<SignIn />} />
//       </Routes>
//       <Toaster position="top-center" reverseOrder={false} containerStyle={{ zIndex: 99999 }} />
//     </div>
//   );
// };

// export default App;


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
>>>>>>> 58b2cc1 (Initial commit)
    </div>
  );
};

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 58b2cc1 (Initial commit)
