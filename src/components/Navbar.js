import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import './styles.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" className="topi-logo" />
        <span className="brand-name">E-Health</span>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="user-section">
        <NavLink to="/profile" className="user-link">
          <FaUser className="user-icon" />
          <span className="user-text">User</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
