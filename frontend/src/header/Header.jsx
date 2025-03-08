import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosHome } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaUserDoctor } from "react-icons/fa6";
import { TiMessages } from "react-icons/ti";
import { GrFormSchedule } from "react-icons/gr";
import { MdOutlineLogout } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import { GrSchedules } from "react-icons/gr";
function Header() {
  //const [isMenuOpen, setIsMenuOpen] = useState(false);
  //const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: '/', active: true, icon:<IoIosHome /> },
    { name: 'Profile', slug: '/Profile', icon:<CgProfile /> },
    { name: 'Appointments', slug: '/Appointments' ,icon:<FaTasks /> },
    { name: 'Schedule', slug: '/Schedule', icon: <GrSchedules/> },
    { name: 'Patients', slug: '/patients', icon:<FaUserDoctor />  },
    
    { name: 'Messagebox', slug: '/messagebox',icon:<TiMessages />  },
    { name: 'Logout', slug: '/logout',icon:<MdOutlineLogout />  },
  ];

  return (
    <header className="bg-green-200 shadow">
      <>
        <nav className="flex items-center justify-between py-3">
          <Link to="/">
            <MdHealthAndSafety className="text-3xl text-white ml-6" />
          </Link>
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              {/* Hamburger Icon */}
              
            </button>
          </div>
          <ul className="hidden lg:flex space-x-4">
            {navItems.map(
              (item) =>
               (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-6 py-2 rounded-full duration-200 hover:bg-green-400"
                    >
                      
                      {item.icon} {item.name}
                    </button>
                  </li>
                )
            )}
            
          </ul>
        </nav>
        {/* Mobile Menu */}
         
      </>
    </header>
  );
}

export default Header;
