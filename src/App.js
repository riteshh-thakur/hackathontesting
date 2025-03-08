import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MainPage from './components/MainPage';
import Profile from './components/Profile';
import Doctors from './components/Doctors';
import Appointment from "./components/Appointment";
import Doco from "./components/Doco";
import './components/styles.css';



const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Sidebar />
          <div className="page-content">
            <Routes>
              {/* Redirect root path ("/") to "/main" (Dashboard) */}
              <Route path="/" element={<Navigate to="/main" />} />

              {/* Define routes for other pages */}
              <Route path="/main" element={<MainPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/appointment/:id" element={<Appointment />} />
              <Route path="/messages" element={<Doco />} />
            </Routes>
            
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;