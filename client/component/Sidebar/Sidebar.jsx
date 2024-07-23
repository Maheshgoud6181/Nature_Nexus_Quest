import React from 'react';
import './SidebarStyles.css';

const Sidebar = ({ isOpen, onClose, onRulesClick }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="closebtn" onClick={onClose}>
        &times;
      </button>
      <button className="rulesbtn" onClick={onRulesClick}>
        Rules
      </button>
    </div>
  );
};

export default Sidebar;
