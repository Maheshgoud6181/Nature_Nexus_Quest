import React, { useState } from 'react';
import Clock from '../Clock/Clock';
import Sidebar from '../Sidebar/Sidebar';
import RulesPopup from '../popup/RulesPopup';
import './NavbarStyles.css';

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isRulesPopupOpen, setRulesPopupOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const toggleRulesPopup = () => setRulesPopupOpen(!isRulesPopupOpen);

  return (
    <div>
      <div className="navbar">
        <div className="hamburger" onClick={toggleSidebar}>
          &#9776;
        </div>
        <div className="title">Nature Nexus Quest</div>
        <div className="clock">
          <Clock />
        </div>
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} onRulesClick={toggleRulesPopup} />
      {isRulesPopupOpen && <RulesPopup onClose={toggleRulesPopup} />}
    </div>
  );
};

export default Navbar;
