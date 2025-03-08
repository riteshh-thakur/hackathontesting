import React from 'react';
import { NavLink } from 'react-router-dom';  // Use NavLink for active link styling
import { FaTachometerAlt, FaUser, FaClipboardList, FaComments, FaUserMd, FaHistory, FaSignOutAlt } from "react-icons/fa";
import './styles.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Navigation</h3>
      <ul>
        <li>
          <NavLink to="/main" className="sidebar-link" activeClassName="active-link">
            <FaTachometerAlt className="icon" /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className="sidebar-link" activeClassName="active-link">
            <FaUser className="icon" /> Profile
          </NavLink>
        </li>
        
        <li>
          <NavLink to="/messages" className="sidebar-link" activeClassName="active-link">
            <FaComments className="icon" /> Messages
          </NavLink>
        </li>
        <li>
          <NavLink to="/doctors" className="sidebar-link" activeClassName="active-link">
            <FaUserMd className="icon" /> Doctors
          </NavLink>
        </li>
        <li>
          <NavLink to="/history" className="sidebar-link" activeClassName="active-link">
            <FaHistory className="icon" /> History
          </NavLink>
        </li>
        <li>
          <NavLink to="/logout" className="sidebar-link" activeClassName="active-link">
            <FaSignOutAlt className="icon" /> Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;